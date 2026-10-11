---
title: cargo 总览与命令模型
uses:
  - command:help
  - command:build
---

cargo 是 Rust 的包管理器，负责声明依赖、获取并构建它们、以正确的参数调用 `rustc`，从而提供可重复的构建。本文说明 cargo 在 Rust 工具链中的位置、本版的版本口径，以及一条 `cargo <命令>` 是如何被解析的。本文主体整理自 cargo 书《Why Cargo Exists》一章（上游文档译文）；命令解析部分为源码补充，依据固定提交的 `src/bin/cargo/main.rs` 与 `src/bin/cargo/cli.rs`。

## rustc、rustup 与 cargo 的分工

三者各管一层：

- `rustc` 是编译器，把一个 crate（库或可执行程序）编译成产物。直接使用它需要显式给出源文件名，一旦涉及编译器旗标或外部依赖，命令行就会变得具体而复杂。
- cargo 在 crate 之上引入 *package*（包）抽象：用 `Cargo.toml` 与 `Cargo.lock` 两个元数据文件描述包及其依赖，从注册表自动获取依赖，再把"该以什么参数调 `rustc`"这件事接管过来——同样的 [cargo build](cli:command:build) 可以构建任何 Cargo 项目，不必关心每个包的具体编译命令。
- rustup 是工具链管理器，安装并切换多个 Rust 工具链；rustup 分发的 `cargo` 实际是它的代理二进制。`+toolchain` 前缀（见下文）就是 rustup 的行为，不属于 cargo 自身。

## 版本口径：0.99.0 与 1.99.0

cargo 仓库以 crate 版本 `0.NN.0` 打 tag，与随 Rust `1.NN.0` 发布的 cargo 二进制一一对应、同一提交。本版固定 tag `0.99.0`，对应的二进制随 Rust 1.99.0 发布。`cargo --version`（或 `-V`）自称 `cargo 1.99.0`——报告的是工具链版本而非仓库 tag；加 `-v` 时还会输出 release、commit-hash、host 等细节（源码补充）。子命令 [cargo version](cli:command:version) 输出同一版本信息。

## 命令的解析顺序

用法行为 `cargo [+toolchain] [OPTIONS] [COMMAND]`。对一个子命令名，cargo 按以下顺序解析（源码补充，`cli.rs` 的 `Exec::infer` 注释）：

1. 内置命令：编译在二进制内的 46 个静态节点之一。
2. 别名：先查用户在 `[alias]` 配置表定义的别名，再查内置别名（见下节）。用户别名与内置命令同名时被遮蔽，cargo 打印警告并按内置命令执行。
3. 外部子命令：在检索路径上寻找名为 `cargo-<命令>` 的可执行文件。检索路径为 `$PATH` 的各目录，外加 `$CARGO_HOME/bin`（若它尚不在 `$PATH` 中，则插到最前面以保持历史优先级）。

三步都落空时报 `no such command`，退出码 101（见[退出代码](../reference/exit-codes.md)），并建议用 `cargo --list` 查看已安装命令、用 `cargo search cargo-<命令>` 寻找可安装的子命令。

## 内置别名与用户别名

cargo 内置六个别名（源码 `BUILTIN_ALIASES` 表）：`b`→`build`、`c`→`check`、`d`→`doc`、`r`→`run`、`t`→`test`、`rm`→`remove`。它们记在对应命令名下，不另立命令节点。

用户别名在 `config.toml` 的 `[alias]` 表中定义，值可以是字符串（按空白拆分为多个参数）或字符串数组，例如 `rr = "run --release"`。别名展开后必须落到某个子命令上，否则报错；别名可以链式展开，但环状定义（如 `a` 展开回 `a`）会被检测并报错。用户别名遮蔽一个已安装的外部子命令时 cargo 会警告。`cargo --list` 把内置命令、两类别名与外部子命令一并列出，其中生态常见的外部命令 `clippy` 与 `fmt` 附带固定描述。

```toml
# .cargo/config.toml 中的用户别名（示例为说明性内容）
[alias]
rr = "run --release"
space_example = ["run", "--release", "--", "command list"]
```

生态里大量日常命令其实走的是外部子命令路径：`cargo clippy`、`cargo fmt` 并非内置节点，而是 `$PATH` 或 `$CARGO_HOME/bin` 上经 [cargo install](cli:command:install) 安装的 `cargo-clippy`、`cargo-fmt`。找不到这类命令时，cargo 的报错会按近似名给出建议（例如把 `rustfmt` 建议为 `fmt`）。

## `+toolchain` 前缀

`cargo +nightly build` 这类写法中的 `+nightly` 由 rustup 处理：经 rustup 代理启动时，rustup 先截获并消费该前缀，再转发给所选工具链的 cargo，用法行也会显示 `[+toolchain]`（源码补充：cargo 检测到自己经 rustup 启动时才这样展示）。不经 rustup 直接运行 cargo 时，`+<名字>` 会被当作子命令名走上面的解析顺序，最终报"没有这个命令"，错误信息会提示应通过 rustup 调用来处理 `+toolchain`。

## 命令概览

根命令帮助模板把高频命令排在最前面：[cargo build](cli:command:build)、[cargo check](cli:command:check)、[cargo clean](cli:command:clean)、[cargo doc](cli:command:doc)、[cargo new](cli:command:new)、[cargo init](cli:command:init)、[cargo add](cli:command:add)、[cargo remove](cli:command:remove)、[cargo run](cli:command:run)、[cargo test](cli:command:test)、[cargo bench](cli:command:bench)、[cargo update](cli:command:update)、[cargo search](cli:command:search)、[cargo publish](cli:command:publish)、[cargo install](cli:command:install)、[cargo uninstall](cli:command:uninstall)。其余命令按用途大致分为：

- 编译与检查：[cargo rustc](cli:command:rustc)、[cargo rustdoc](cli:command:rustdoc)、[cargo fix](cli:command:fix)、[cargo fetch](cli:command:fetch)。
- 依赖与图：[cargo tree](cli:command:tree)、[cargo vendor](cli:command:vendor)、[cargo generate-lockfile](cli:command:generate-lockfile)。
- 包与工作区信息：[cargo metadata](cli:command:metadata)、[cargo info](cli:command:info)、[cargo pkgid](cli:command:pkgid)、[cargo locate-project](cli:command:locate-project)，以及隐藏的 [cargo read-manifest](cli:command:read-manifest) 与 [cargo verify-project](cli:command:verify-project)。
- 注册表账号：[cargo login](cli:command:login)、[cargo logout](cli:command:logout)、[cargo owner](cli:command:owner)、[cargo yank](cli:command:yank)、[cargo package](cli:command:package)。
- 缓存与不稳定命令：[cargo clean](cli:command:clean)（含隐藏的 [cargo clean gc](cli:command:clean/gc)）；`config` 与 `report` 族需 nightly 旗标（见[阅读说明](index.md)）。

## 查看帮助

[cargo help](cli:command:help) 展示内置命令的手册页——man 手册随二进制打包分发，优先交给 `man`、`less` 或 `more` 显示，取不到对应手册页时回退到该命令的 `--help`；对外部子命令则直接调用其 `--help`。不带参数的 `cargo help` 等价于根命令帮助。不带任何子命令直接运行 `cargo` 时，cargo 打印内置的帮助模板并列出常用命令。

根命令另有几个不进入子命令解析的入口（源码补充，`cli.rs`）：`-V, --version` 输出版本；`--list` 列出已安装命令；`--explain <CODE>` 转发给 `rustc --explain` 解释错误码；`-Z help` 列出不稳定旗标（仅 nightly）；`-C <目录>` 先切换工作目录再执行（同为 nightly 门控）。
