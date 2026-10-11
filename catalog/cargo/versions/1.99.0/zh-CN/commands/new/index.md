---
title: cargo new
command:
  - new
---

在给定路径创建一个新的 cargo 包。

## 简介

`cargo new <PATH>` 在指定目录创建新包，模板包含 `Cargo.toml` 清单、示例源文件与版本控制忽略文件。目标目录已存在时报错，并提示改用 [cargo init](cli:command:init)。

模板类型：默认使用二进制（应用）模板，生成 `src/main.rs`；`--lib` 改用库模板，生成 `src/lib.rs`（与 `--bin` 互斥）。

包名默认取目录名，`--name <NAME>` 可覆盖。包名会经过校验：Rust 关键字、与 cargo 构建目录名冲突的名称、`test` 这类名称会被拒绝，Windows 保留名、非 ASCII 名称、非 snake_case/kebab-case 名称等会给出警告或按平台报错。

VCS：未用 `--vcs` 指定时，若目标位置不在任何已有 VCS 仓库内，默认初始化一个 git 仓库；已位于某个 VCS 仓库内则不再新建，只写忽略文件。忽略文件把 `/target` 写入 `.gitignore`（或对应 VCS 的等价文件）。`--vcs` 取值 `git`、`hg`、`pijul`、`fossil`、`none`，覆盖 `[cargo-new] vcs` 全局配置。

`--edition <YEAR>` 设置生成 crate 的 edition；未指定时，清单中的 `edition` 写为 cargo 当前最新的稳定 edition（源码取 `Edition::LATEST_STABLE`，具体年份随 cargo 版本变化，上游未在本命令文档中给出）。`--registry <REGISTRY>` 把该注册表写入清单的 `package.publish` 字段。

若目标路径位于某个工作区内，且不被 `workspace.exclude` 排除，新包会尝试继承根清单 `workspace.package` 中定义的键（未显式指定 `--edition`/`--registry` 的项），写入 `lints.workspace = true`，并把自己加入根清单的 `workspace.members`。

## 参数

### `path`

必填，写作 `<PATH>`。新包目录的路径；包名默认取自该目录名。

## 选项

`cargo new` 没有命令专属选项。共享选项（在命令预置参数中定义）语义如下：

- `--vcs <VCS>`：初始化给定的版本控制系统，覆盖全局配置。取值 `git`、`hg`、`pijul`、`fossil`、`none`。
- `--bin`：使用二进制（应用）模板（默认）。
- `--lib`：使用库模板。
- `--edition <YEAR>`：为生成的 crate 设置 edition。
- `--name <NAME>`：设置包名；默认取目录名。
- `--registry <REGISTRY>`：设置要使用的注册表（写入 `publish` 字段）。

全局选项（`-v`/`--verbose`、`-q`/`--quiet`、`--color`、`--locked`、`--offline`、`--frozen`、`--config`、`-Z`/`--unstable-features`、`--help`）见 [cargo](cli:command:)。

## 使用提醒

- `--bin` 与 `--lib` 同时给出会报错（源码报错信息：不能同时指定库与二进制输出）。
- 目标目录已存在时报错；在现有目录中生成清单应使用 [cargo init](cli:command:init)。
- 未指定 `--name` 且路径无法得出包名（如以 `..` 结尾）时报错，需改用 `--name`。

## 示例

```sh
# 在 foo 目录创建一个二进制包
cargo new foo

# 创建库包
cargo new --lib mylib

# 创建包但不初始化版本控制
cargo new --vcs none foo
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [src/bin/cargo/commands/new.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/new.rs)。
- 模板生成、VCS 初始化与探测、包名校验、edition 默认值与工作区键继承见 [src/cargo/ops/cargo_new.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_new.rs)。
