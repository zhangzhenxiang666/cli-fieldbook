---
title: cargo metadata
command:
  - metadata
---

以机器可读的 JSON 输出工作区成员与解析后的依赖信息，主要供 IDE 与外部工具消费。

## 简介

`cargo metadata` 向标准输出打印 JSON，内容为当前工作区的成员包与解析后的依赖图（含实际选定的版本与覆盖）。输出格式有版本管理；应显式给出 `--format-version` 以避免前向不兼容问题（见 [输出与消息格式](../../reference/formatting.md)）。Rust 侧可借助社区维护的 `cargo_metadata` crate 解析输出。

在同一格式版本内保持兼容，但以下变化不视为破坏：新增字段、枚举类字段新增取值、以及"不透明表示"（如 Source ID 这类标识符的内部格式）的变化；消费者不应依赖未明确承诺稳定的内部表示。

输出（格式版本 `1`）的顶层结构要点：

- `packages`：全部相关包的数组，含每个包的名称、版本、Package ID、依赖声明、构建目标、特性、清单路径与各类元数据字段；未用 `--no-deps` 时也包含特性启用后引入的依赖。
- `workspace_members`、`workspace_default_members`：工作区成员与默认成员的 Package ID 数组。
- `resolve`：整个工作区解析后的依赖图（`nodes` 每项含包 ID、依赖与启用的特性，`root` 为当前包，虚拟工作区时为 `null`）；给出 `--no-deps` 时为 `null`。
- `target_directory`：target 目录的绝对路径。
- `version`：本元数据结构的模式版本。
- `workspace_root`：工作区根的绝对路径。
- `metadata`：工作区级的自定义元数据，未指定时为 `null`。

包内 `dependencies` 各项记录依赖的名称、来源、版本要求（`req`）、种类（正常依赖为 `null`，或 `dev`、`build`）、`rename`、`optional`、特性相关字段、`target` 平台条件与 path 依赖的本地路径等；`id` 字段的语法即 Package ID Specification（见 [cargo pkgid](cli:command:pkgid)）。

特性选项（`-F/--features`、`--all-features`、`--no-default-features`）会影响解析结果，其含义见 [cargo build](cli:command:build)。

## 选项

以下仅列出 `cargo metadata` 自有的选项；清单选项 `-m/--manifest-path` 与全局选项（`-v`、`-q`、`--color`、`--locked`、`--offline`、`--frozen`、`--config`、`-Z`）见 [cargo](cli:command:)，特性选项见 [cargo build](cli:command:build)。

### `--filter-platform`

格式：`--filter-platform <TRIPLE>`。只把与给定目标三元组匹配的解析依赖纳入 `resolve` 输出；可重复给出。字面量 `host-tuple` 会被替换为主机的目标三元组。不加此选项时 `resolve` 覆盖全部目标平台。注意 `packages` 数组仍列出全部依赖——每个包定义都是 `Cargo.toml` 内容的如实再现，不做平台过滤。

### `--no-deps`

格式：`--no-deps`。只输出工作区成员的信息，且不获取依赖；此时 `resolve` 为 `null`。

### `--format-version`

格式：`--format-version <VERSION>`。指定输出格式版本，取值 `1`（当前唯一取值）。省略时 cargo 打印警告（要求显式给出以免兼容性问题）并按版本 `1` 输出。

## 使用提醒

- 省略 `--format-version` 会有兼容性警告；脚本与工具应固定显式给出该选项。
- `--filter-platform` 只影响 `resolve`，`packages` 仍是完整清单，需要过滤时自行在消费侧处理。
- 本版没有 `--deps-output-format` 之类的输出控制；输出即上述 JSON（上游未提供其他输出形态）。

## 示例

```sh
# 以格式版本 1 输出当前包的 JSON 元数据
cargo metadata --format-version=1

# 只看工作区成员，不解析依赖
cargo metadata --format-version=1 --no-deps

# 只解析 Windows 目标平台的依赖图
cargo metadata --format-version=1 --filter-platform x86_64-pc-windows-msvc
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义（含省略 `--format-version` 时的警告）见 [src/bin/cargo/commands/metadata.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/metadata.rs)；输出的组装见 [src/cargo/ops/cargo_output_metadata.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_output_metadata.rs)。
- JSON 字段含义与兼容性策略译自 man 手册（上游路径 `src/doc/man/cargo-metadata.md`）。
