---
title: 配置层与 CARGO_HOME
uses:
  - command:config/get
  - command:locate-project
---

cargo 的行为由 TOML 配置文件、环境变量与命令行 `--config` 三层控制；`CARGO_HOME` 目录则集中保存全局配置、凭据、注册表缓存与安装的二进制。本文为 cargo 书《Configuration》章与《Cargo Home》指南的译文整理（上游文档译文）；命令细节为源码补充。

## 配置文件分层

cargo 从当前目录向上逐级探测 `.cargo/config.toml`，最后读 `$CARGO_HOME/config.toml`（默认 `~/.cargo`）。例如在 `/projects/foo/bar/baz` 运行时，依次合并：

```text
/projects/foo/bar/baz/.cargo/config.toml
/projects/foo/bar/.cargo/config.toml
/projects/foo/.cargo/config.toml
/projects/.cargo/config.toml
/.cargo/config.toml
$CARGO_HOME/config.toml          # 优先级最低
```

同一键出现在多层时按深度合并：标量取更深层（更深目录胜出，主目录最低）；数组拼接，高优先级的项排在合并数组后面。这使逐项目配置可以提交进版本控制、个人默认放在主目录。两点边界：从工作区根调用时不读取工作区成员 crate 内的配置文件；不带 `.toml` 扩展名的 `.cargo/config` 仍被读取，两文件并存时无扩展名者优先。顶层 `include` 键可引入其他配置文件（仅接受 `.toml` 路径，可标 `optional`），被包含文件先加载、本文件自身值最后覆盖。

## 环境变量与 `--config` 覆盖

多数配置键有对应环境变量：键 `foo.bar` 映射为 `CARGO_FOO_BAR`——转大写、点与横线转下划线，例如 `target.x86_64-unknown-linux-gnu.runner` 对应 `CARGO_TARGET_X86_64_UNKNOWN_LINUX_GNU_RUNNER`。环境变量优先于配置文件，但只支持整数、布尔、字符串与部分数组值。

全局选项 `--config` 再压过环境变量：参数为 `KEY=VALUE`（TOML 语法）或一个配置文件路径，可重复给出、从左到右合并。最终优先级为 `--config` > 环境变量 > 配置文件分层。此外 cargo 还识别一组不成体系的行为变量（`CARGO_HOME`、`CARGO_TARGET_DIR` 等），完整清单见[环境变量](../reference/environment.md)。

```sh
# 键值形式（多数 shell 需转义或加引号）
cargo --config net.git-fetch-with-cli=true fetch
cargo --config 'build.rustdocflags = ["--html-in-header", "header.html"]' doc
# 也可以指向一份额外配置文件
cargo --config ./path/to/extra-config.toml fetch
```

配置值里的相对路径按"值定义在哪里"解析：配置文件中的路径相对该文件所在 `.cargo` 的上级目录，环境变量与 `--config KEY=VALUE` 给出的路径则相对当前工作目录；不带路径分隔符的可执行名按 `PATH` 查找。

## 配置键与凭据文件

配置文件按表组织，常用的有：`[alias]`（命令别名，见[cargo 总览与命令模型](overview.md)）、`[build]`（jobs、rustc、target-dir、rustflags 等）、`[env]`（向 cargo 启动的进程注入环境变量，可加 `force`/`relative` 修饰）、`[net]`/`[http]`（网络行为与代理）、`[registries]`/`[registry]`（注册表，见[注册表与发布](registries-publishing.md)）、`[source]`（来源替换与 vendored 源）、`[target]`（平台相关设置，见[目标平台与交叉编译](targets-platforms.md)）、`[term]`（终端输出）、`[install]`（安装根目录）、`[cargo-new]`（新建包的 VCS 选择）、`[future-incompat-report]`（未来不兼容报告的展示频率）、`[profile]`（经配置覆盖 profile 设置，见[特性与 profile](features-profiles.md)）。敏感信息不进这些文件，而是单独存放在 `$CARGO_HOME/credentials.toml`，由 [cargo login](cli:command:login) 与 [cargo logout](cli:command:logout) 维护（使用 `cargo:token` provider 时）；它与配置文件同构，令牌同样可用 `CARGO_REGISTRY_TOKEN`、`CARGO_REGISTRIES_<名>_TOKEN` 环境变量提供。

## `CARGO_HOME` 的布局

`CARGO_HOME` 兼作下载与源码缓存，默认 `$HOME/.cargo`（Windows 为 `%USERPROFILE%\.cargo`），内部结构不属于稳定接口：

```text
$CARGO_HOME/
├── config.toml        # 全局配置（分层中的最低层）
├── credentials.toml   # 注册表凭据
├── .crates.toml       # cargo install 的安装记录（勿手改）
├── .crates2.json
├── bin/               # cargo install 与 rustup 安装的可执行文件
├── git/
│   ├── db/            # git 依赖的裸仓库克隆
│   └── checkouts/     # 按提交检出的工作副本（同一仓库可有多个检出）
└── registry/
    ├── index/         # 注册表索引
    ├── cache/         # 下载的 .crate 压缩包缓存
    └── src/           # 解包后供 rustc 使用的源码
```

`bin/` 需要加入 `$PATH` 才能直接调用其中的可执行文件；外部子命令检索时该目录被优先加入搜索路径（见[cargo 总览与命令模型](overview.md)）。缓存内容不受 [cargo clean](cli:command:clean) 移除（clean 只清 target 目录）；理论上删掉任何缓存部分，cargo 都会在需要时重新下载或解包。指南建议 CI 只缓存 `.crates.toml`、`.crates2.json`、`bin/`、`registry/index/`、`registry/cache/` 与 `git/db/`，避免把 `registry/src` 的解包副本也算进缓存——整目录缓存会让同一份源码存两遍。

## 查看：`config get` 与 `locate-project`

查看生效配置的不稳定命令是 [cargo config get](cli:command:config/get)：它（连同父命令 `cargo config`）需在 nightly 以 `-Z unstable-options` 启用；`--format` 选择显示格式（默认 `toml`），`--show-origin` 标注每个值来自哪一层定义，`--merged no` 可看未合并的原始分层值（源码补充）。与配置无关但同样用于"定位"的还有 [cargo locate-project](cli:command:locate-project)：输出当前生效的 `Cargo.toml` 位置，`--workspace` 改为输出工作区根，`--message-format` 选 `json`（默认）或 `plain`。
