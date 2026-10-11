---
title: cargo init
command:
  - init
---

在现有目录中创建一个新的 cargo 包清单。

## 简介

`cargo init [PATH]` 在给定目录（默认当前目录）创建 `Cargo.toml` 清单与必要的源文件。目录中已有 `Cargo.toml` 时报错，并提示改用 [cargo new](cli:command:new) 在新子目录创建包；在 home 目录执行也会被拒绝。

已有源文件的复用：`cargo init` 会探测常见位置的 Rust 源文件（`src/main.rs`、`main.rs`、`src/<name>.rs`、`<name>.rs`、`src/lib.rs`、`lib.rs`，其中以包名命名的文件按内容是否含 `fn main` 判断类型）。探测到的文件直接作为包的目标使用；一个都没找到时创建示例 `src/main.rs`，或传 `--lib` 时创建 `src/lib.rs`。未显式指定 `--bin`/`--lib` 时按探测结果自动决定类型：找到源文件且其中没有二进制文件时视为库，否则视为二进制。

VCS：未用 `--vcs` 指定时，先探测目录本身已有的 VCS 元数据（`.git`、`.hg`、`.pijul`、`.fossil`；多于一个时报错，要求显式 `--vcs`）；没有探测到时，若不在任何已有 VCS 仓库内则默认初始化 git 仓库，已位于仓库内则不再新建，只写忽略文件。`--vcs` 取值 `git`、`hg`、`pijul`、`fossil`、`none`，覆盖 `[cargo-new] vcs` 全局配置。

包名默认取目录名（`--name` 覆盖）；`--edition <YEAR>` 与 `--registry <REGISTRY>` 的语义与 [cargo new](cli:command:new) 相同：未指定 edition 时写入 cargo 当前最新的稳定 edition，`--registry` 写入 `package.publish` 字段。若目录位于某个工作区内，同样会尝试继承 `workspace.package` 的键并把自己加入 `workspace.members`。

## 参数

### `path`

可选，写作 `<PATH>`。要在其中创建包的目录，默认 `.`；包名默认取自该目录名。

## 选项

`cargo init` 没有命令专属选项，共享选项与 [cargo new](cli:command:new) 完全一致：

- `--vcs <VCS>`：初始化给定的版本控制系统，覆盖全局配置。取值 `git`、`hg`、`pijul`、`fossil`、`none`。
- `--bin`：使用二进制（应用）模板。
- `--lib`：使用库模板。
- `--edition <YEAR>`：为生成的 crate 设置 edition。
- `--name <NAME>`：设置包名；默认取目录名。
- `--registry <REGISTRY>`：设置要使用的注册表（写入 `publish` 字段）。

全局选项（`-v`/`--verbose`、`-q`/`--quiet`、`--color`、`--locked`、`--offline`、`--frozen`、`--config`、`-Z`/`--unstable-features`、`--help`）见 [cargo](cli:command:)。

## 使用提醒

- 目录中已有 `Cargo.toml` 时报错；应改用 [cargo new](cli:command:new)。
- 探测到多个可能的二进制入口（如同时存在 `src/main.rs` 与 `src/<name>.rs`）时报错，需要先整理出唯一入口；探测到多个库文件同样报错。
- `--bin` 与 `--lib` 同时给出会报错。
- 与 `cargo new` 的区别：`new` 在新目录中创建包，`init` 在现有目录中生成清单并复用已有源文件。

## 示例

```sh
# 在当前目录创建二进制包
cargo init

# 在给定目录创建库包
cargo init --lib path/to/dir
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [src/bin/cargo/commands/init.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/init.rs)。
- 源文件探测与类型推断、VCS 探测、模板与工作区键继承见 [src/cargo/ops/cargo_new.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_new.rs)。
