---
title: cargo install
command:
  - install
---

构建并安装一个 Rust 二进制 crate，把可执行文件放入安装根目录的 `bin` 目录。

## 简介

`cargo install` 管理 cargo 本地安装的二进制 crate 集合。只有含 `[[bin]]` 或 `[[example]]` 目标的包可以被安装；默认只安装二进制目标，不安装示例目标（示例需 `--example` 选择）。对一个没有任何二进制目标的包（例如纯库），本命令会直接报错并建议用 `cargo add` 把它加为依赖。

安装位置由安装根目录决定：二进制安装到 `<root>/bin`。根目录解析顺序（依据源码 `resolve_root`）为 `--root` 旗标 → `CARGO_INSTALL_ROOT` 环境变量 → `install.root` 配置 → `$CARGO_HOME`（默认 `~/.cargo`），因此默认装入 `$CARGO_HOME/bin`。卸载用 [cargo uninstall](cli:command:uninstall)。

安装来源默认为 crates.io，可用 `--git <URL>`（git 仓库）、`--path <PATH>`（本地路径）或 `--registry`/`--index`（其他注册表）改变。来源包含多个包时（如 crates.io 或多 crate 的 git 仓库），必须用 `crate` 位置参数指明要安装的包。版本可用 `--version <VERSION>`（或别名 `--vers`）或 `crate@<version>` 位置参数语法指定；从 git 安装时可用 `--branch`、`--tag`、`--rev` 选择检出点，默认为默认分支。

若包已安装，cargo 会在以下任一值变化时重新安装：包版本与来源、安装的二进制名集合、所选特性、`--profile`、`--target`（man 手册）。使用 `--path` 时总是重新构建安装（除非与其他包发生二进制名冲突）；`--force` 可强制无条件重装。已安装且无变化时，命令会以 `Ignored` 状态提示并跳过（依据源码）。

构建默认使用 `release` profile（`--debug` 切换为 `dev`，`--profile` 按名选择，两者互斥）。从 crates.io 或 git 等远程来源安装时，构建在临时 target 目录中进行，不使用当前工作区或被安装包的 `target` 目录；设置 `CARGO_TARGET_DIR` 环境变量（或 `build.target-dir` 配置）可改用固定目录，例如在 CI 上缓存产物。从 `--path` 本地路径安装时则使用该工作区自身的 target 目录（依据源码）。

### 与 Cargo.lock 的关系

默认情况下，包发布时附带的 `Cargo.lock` 会被忽略，cargo 重新计算要使用的依赖版本，可能选中发布之后新出现的版本。给出全局旗标 `--locked` 可强制使用包内附带的 `Cargo.lock`（若可用），以获得可复现的依赖集合；代价是不会获得依赖的任何修复与更新。注意 cargo 自 1.37 起才发布 `Cargo.lock`，更早版本发布的包没有 lockfile 可用（man 手册）。`--locked` 作为全局旗标的总述见 [cargo](cli:command:)。

### 配置发现

本命令工作在系统/用户层面而非项目层面：忽略通常的本地配置发现，改从 `$CARGO_HOME/config.toml` 开始发现配置。仅当以 `--path <PATH>` 安装本地包时，才使用该路径下的本地配置（从 `<PATH>/.cargo/config.toml` 开始，man 手册）。

## 参数

### `crate`

可选，可重复，写作 `crate[@<ver>]`。要从给定来源安装的包，可内联版本（如 `ripgrep@14.1.0`）。内联版本与 `--version` 不能同时给出（依据源码）。不带 crate 也不带 `--path`/`--git` 时，cargo 会尝试安装当前目录中的包：仅 edition 2015 的包保留兼容（输出弃用警告后继续），其余情况直接报错并建议改用 `cargo install --path .`（依据源码）。

## 选项

### `--version`

别名 `--vers`。格式：`--version <VERSION>`。要安装的版本，适用于从注册表来源安装（man 手册）。可写版本要求（如 `~1.2`），cargo 在要求范围内选最新版本；若不含要求操作符（如 `^`、`~`），必须写成 `MAJOR.MINOR.PATCH` 的完整形式并精确安装该版本——不像 `Cargo.toml` 依赖那样按 caret 要求解释。需与 `crate` 位置参数同用。

### `--index`

格式：`--index <INDEX>`。从中安装的注册表索引 URL。与 `--git`、`--path`、`--registry` 互斥；需与 `crate` 位置参数同用。

### `--registry`

格式：`--registry <REGISTRY>`。使用的注册表（名称）。与 `--git`、`--path`、`--index` 互斥；需与 `crate` 位置参数同用。

### `--git`

格式：`--git <URL>`。从中安装指定 crate 的 git 仓库 URL。与 `--path`、`--index`、`--registry` 互斥。

### `--branch`

格式：`--branch <BRANCH>`。从 git 安装时使用的分支。必须与 `--git` 同用。

### `--tag`

格式：`--tag <TAG>`。从 git 安装时使用的标签。必须与 `--git` 同用。

### `--rev`

格式：`--rev <SHA>`。从 git 安装时使用的具体提交。必须与 `--git` 同用。

### `--path`

格式：`--path <PATH>`。要安装的本地 crate 的文件系统路径。与 `--git`、`--index`、`--registry` 互斥。以本地路径安装时会使用该路径工作区自身的 target 目录与本地配置发现。

### `--root`

格式：`--root <DIR>`。安装包使用的根目录，二进制装入 `<DIR>/bin`。优先级见简介中的根目录解析顺序。

### `--force`

短旗标 `-f`。强制覆盖已有的 crate 或二进制。用于包已安装且无变化时的强制重装，或其他包已安装同名二进制、系统环境变化（如新版 `rustc`）需要重建的场景。

### `--no-track`

默认 cargo 用安装根目录下的元数据文件跟踪已安装的包。本旗标表示不使用也不创建该文件；此时除非配合 `--force`，cargo 拒绝覆盖任何已有文件，同时也失去多个 cargo 并发安装时的保护。

### `--list`

列出全部已安装的包及其版本，不做安装。

### `--debug`

以 `dev` profile 构建，代替默认的 `release`。与 `--profile` 互斥。

## 环境变量

- `CARGO_INSTALL_ROOT`：覆盖安装根目录；优先于 `install.root` 配置，低于 `--root` 旗标。
- `CARGO_TARGET_DIR`：为远程来源的安装构建指定固定的 target 目录，代替临时目录。
- `CARGO_HOME`：默认安装根目录（二进制装入其 `bin` 子目录）。

完整清单见[环境变量](../../reference/environment.md)。

## 使用提醒

- 编译族共享选项（`--bin`、`--bins`、`--example`、`--examples`、`-F`/`--features`、`--profile`、`-j`/`--jobs`、`--target`、`--target-dir`、`--timings`、`--message-format` 等）的格式与释义见 [cargo build](cli:command:build)；注意本命令默认 profile 为 `release`，与 `cargo build` 默认的 `dev` 不同。
- `-n`/`--dry-run` 为不稳定功能：在不带 nightly 的 `-Z unstable-options` 时使用会报错（依据源码）。
- 二进制目标选择：默认安装全部 `[[bin]]`；`--bin`、`--bins`、`--example`、`--examples` 为共享选项（见 [cargo build](cli:command:build)），`--bins` 即默认行为，`--example`/`--examples` 转为安装示例目标。
- `crate@<ver>` 与 `--version` 同时给出会报错（依据源码）。
- 安装产生的同名二进制冲突、以及包重装判定，见简介与 `--force` 条目。

## 示例

```sh
# 从 crates.io 安装或升级一个包
cargo install ripgrep

# 安装指定版本
cargo install ripgrep --version 14.1.0

# 安装或重装当前目录的包
cargo install --path .

# 从 git 仓库的指定分支安装
cargo install --git https://github.com/BurntSushi/ripgrep --branch master

# 查看已安装的包列表
cargo install --list
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义（来源互斥、版本解析、profile 默认值）见 [src/bin/cargo/commands/install.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/install.rs)。
- 安装根目录解析、重装判定与临时 target 目录见 [src/cargo/ops/cargo_install.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_install.rs) 与 [src/cargo/ops/common_for_install_and_uninstall.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/common_for_install_and_uninstall.rs)。
