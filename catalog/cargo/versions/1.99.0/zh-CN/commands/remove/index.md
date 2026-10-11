---
title: cargo remove
command:
  - remove
---

从 `Cargo.toml` 清单中移除依赖。内置别名 `rm`。

## 简介

`cargo remove` 直接修改清单文件：从对应表中删除给定的依赖项，然后清理工作区并重新解析依赖（更新 `Cargo.lock`）。默认从 `dependencies` 表移除；`--dev`、`--build` 分别选择开发依赖与构建依赖表，`--target <TARGET>` 选择平台特定的依赖表。

工作区清理：移除后，cargo 会清理根清单中不再被引用的 `workspace.dependencies` 条目、profile 中不再匹配任何依赖的 `package.<spec>` 覆盖、`replace` 条目，以及不再使用的 `patch` 条目，随后重新解析工作区。

`-n`/`--dry-run` 不实际写入清单，同时跳过上述清理与重新解析。全局选项（`--offline`、`--locked` 等）见 [cargo](cli:command:)。

## 参数

### `dependencies`

必填（可多个），写作 `<DEP_ID>`。要移除的依赖名。

## 选项

### `--dev`

格式：`--dev`。从 `dev-dependencies` 表移除。与 `--build` 互斥。

### `--build`

格式：`--build`。从 `build-dependencies` 表移除。与 `--dev` 互斥。

### `--target`

格式：`--target <TARGET>`。从给定目标平台的依赖表移除。为避免 shell 展开，建议给值加引号，如 `--target 'cfg(unix)'`。

## 使用提醒

- `-p`/`--package` 指定从哪个包移除（共享选项，SPEC 格式见 [cargo build](cli:command:build)）；工作区中无法唯一确定时必须给出，传入不带值的 `-p` 会列出可用包。
- `-n`/`--dry-run` 干跑：不写清单，也不做后续清理。
- 添加依赖用 [cargo add](cli:command:add)。

## 示例

```sh
# 移除 regex 依赖
cargo remove regex

# 从开发依赖中移除 trybuild
cargo remove --dev trybuild

# 从 wasm32-unknown-unknown 平台依赖表中移除 nom
cargo remove --target wasm32-unknown-unknown nom
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与移除后的工作区清理（`workspace.dependencies`、profile、`replace`、未用 `patch` 的回收）见 [src/bin/cargo/commands/remove.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/remove.rs)。
- 依赖项删除逻辑见 [src/cargo/ops/cargo_remove.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_remove.rs)。
