---
title: cargo
command: []
---

cargo 是 Rust 官方包管理器与构建工具：解析 `Cargo.toml` 清单、管理依赖与 `Cargo.lock`、驱动 `rustc`/`rustdoc` 完成编译、测试、文档与发布。本页描述根命令与全部全局选项；具体行为见各子命令页。

## 简介

cargo 的用法行有两种形式：

```text
cargo [+toolchain] [OPTIONS] [COMMAND]
cargo [OPTIONS] -Zscript <MANIFEST_RS> [ARGS]...
```

- `+toolchain` 前缀（如 `cargo +nightly build`）由 rustup 代理处理，不是 cargo 自身参数；cargo 只是在 rustup 环境下把这一形式展示进用法行。
- 第二种形式面向单文件包（embedded manifest）：把一个内嵌清单的 `.rs` 文件当作包运行，属不稳定功能，需要 nightly 与 `-Z script`。

命令按以下顺序解析（依据 `src/bin/cargo/cli.rs` 的 `Exec::infer` 与别名展开逻辑）：

1. 内置子命令（46 个静态节点，见命令树）；
2. 别名：先查配置 `[alias]` 表中的用户别名，再落到内置别名；
3. 外部子命令：在 `PATH` 上查找名为 `cargo-<子命令>` 的可执行文件并转发参数。

内置别名为 `b`（build）、`c`（check）、`d`（doc）、`r`（run）、`t`（test）、`rm`（remove），定义于 `src/bin/cargo/main.rs` 的 `BUILTIN_ALIASES` 表。用户别名与内置子命令重名时被内置命令遮蔽并给出警告。

全局选项（`-v`、`-q`、`--color`、`--locked`、`--offline`、`--frozen`、`--config`、`-Z` 与 `--help`）是 clap 的全局参数：可以写在子命令之前或之后，多处给出的值会合并——`-v` 计数累加，`--config` 与 `-Z` 依序追加，旗标类任一处给出即生效。

不带任何子命令运行 `cargo` 时打印根帮助并正常退出。

## 选项

### `--version`

短旗标 `-V`。格式：`--version`。打印版本信息并退出；与 `--verbose` 同用时附带额外信息（release 版本、commit 哈希与日期、宿主三元组、libgit2/curl/SSL 版本、操作系统）。

### `--list`

格式：`--list`。列出已安装的全部子命令：内置命令、别名（含指向）与外部 `cargo-*` 子命令；与 `--verbose` 同用时显示外部子命令的路径。

### `--explain`

格式：`--explain <CODE>`。对指定错误码运行 `rustc --explain CODE`，输出该错误的详细解释（例如 `E0004`）。

### `-C`

格式：`-C <DIRECTORY>`。在做任何事之前切换到指定目录。不稳定：仅在 nightly 渠道且同时传 `-Z unstable-options` 时可用，否则报错退出。

### `--verbose`

短旗标 `-v`，可重复。使用冗长输出；重复两次（`-vv`）进入 very verbose，并输出 build.rs 的输出。

### `--quiet`

短旗标 `-q`。不打印 cargo 日志消息。

### `--color`

格式：`--color <WHEN>`。取值 `auto`、`always`、`never`（大小写不敏感）。控制彩色输出；未指定时由配置 `term.color` 决定，未配置则相当于 `auto`。

### `--locked`

格式：`--locked`。断言 `Cargo.lock` 保持不变：若命令执行需要改动锁定文件则报错，而不自动写入。

### `--offline`

格式：`--offline`。不访问网络运行；需要的 crate 必须已在本地缓存。

### `--frozen`

格式：`--frozen`。等价于同时指定 `--locked` 与 `--offline`。

### `--config`

格式：`--config <KEY=VALUE|PATH>`，可重复。以 `KEY=VALUE` 覆盖一个配置值，或给出 TOML 文件路径从该文件读取配置；命令行值优先于配置文件。

### `--unstable-features`

短旗标 `-Z`，可重复（追加）。格式：`--unstable-features <FLAG>`。启用 cargo 的不稳定旗标，仅 nightly 渠道可用；传 `-Z help` 列出全部旗标及说明。

### `--help`

格式：`--help`。显示根命令帮助。查看子命令帮助用 [`cargo help <命令>`](cli:command:help)，它会打开对应的 man 手册。

## 环境变量

- `CARGO_HOME`：cargo 主目录（注册表缓存、git 检出、已安装二进制等）。
- `CARGO_TARGET_DIR`：target 目录位置，对应配置 `build.target-dir`。
- `RUSTFLAGS`/`RUSTDOCFLAGS`（及 `CARGO_ENCODED_*` 形式）：传给全部 `rustc`/`rustdoc` 调用的额外旗标。
- `CARGO_BUILD_JOBS`：默认并行编译任务数，对应 `-j/--jobs`。

完整清单见[环境变量](../reference/environment.md)。

## 使用提醒

- `-C` 需要 nightly 与 `-Z unstable-options`，稳定渠道会直接报错。
- 小写 `-c`、`-z` 不被接受，cargo 会提示改用 `--config` 与 `-Z`；构建族命令的 `-s` 会提示改用 `-q`。
- 退出码约定与子进程退出码的传播规则见[退出代码](../reference/exit-codes.md)：cargo 自身执行失败几乎都是 `101`，参数解析错误为 `1`。
- `cargo <路径>.rs` 这类"清单命令"形态依赖 `-Z script`，稳定渠道会报错；细节见 [`cargo run`](cli:command:run)。

## 示例

```sh
# 构建当前包及其全部依赖
cargo build

# 以优化模式构建
cargo build --release

# 为交叉编译目标运行测试
cargo test --target i686-unknown-linux-gnu

# 新建一个可执行包
cargo new foobar

# 在当前目录初始化一个包
mkdir foo && cd foo
cargo init .

# 查看某个命令的用法与选项
cargo help clean
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 根命令定义与全局选项见 [src/bin/cargo/cli.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/cli.rs)。
- 内置别名表与外部子命令查找见 [src/bin/cargo/main.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/main.rs)。
- 子命令注册表见 [src/bin/cargo/commands/mod.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/mod.rs)。
- 根命令 man 手册见 [src/doc/man/cargo.md](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/doc/man/cargo.md)。
