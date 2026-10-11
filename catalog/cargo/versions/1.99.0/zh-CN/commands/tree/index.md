---
title: cargo tree
command:
  - tree
---

以树状图的形式显示一个包的依赖图。

## 简介

`cargo tree` 将当前包（或通过包选择选项选中的包）作为树根，逐层打印其依赖。重复出现的包默认会被去重（de-duplicate）：同一包的依赖只在第一次出现时展开，后续出现处以 `(*)` 标记，表示其依赖已在别处展示过；用 `--no-dedupe` 可以改为完整重复展开。

`-e`/`--edges` 选择要显示的依赖种类；`features` 种类会把输出切换为特性视图，展示每个依赖启用了哪些特性，此时配合 `-i`/`--invert` 反转图，可以追踪某个包的特性是从哪里流入的。默认显示 `normal,build,dev` 三类依赖（man 手册说明）。

本命令显示的是接近 cargo 实际构建所用、经过特性统一（feature unification）的图，而不是 `Cargo.toml` 中罗列的依赖：同一依赖在 `[dependencies]` 与 `[dev-dependencies]` 中声明了不同特性时，图中可能合并全部特性并用 `(*)` 标记重复项。按 man 手册的说法，`cargo tree -e normal,build` 大致对应 `cargo build` 的视角，默认输出大致对应 `cargo test` 的视角，但不保证与实际构建完全一致。

包选择（`-p`、`--workspace`、`--exclude`）、特性选择（`-F`/`--features` 等）与 `-m`/`--manifest-path`、`--target` 为共享选项，释义见 [cargo build](cli:command:build)。本命令的 `--target` 用于过滤依赖（默认宿主平台，值 `all` 表示包含所有目标），与构建语义不同。

## 选项

除下列本命令专属选项外，包选择、特性选择与 `-m`/`--manifest-path`、`--target` 为共享选项，释义见 [cargo build](cli:command:build)；全局选项见 [cargo](cli:command:)。

### `--all`

短旗标 `-a`。已弃用且隐藏。等效于 `--no-dedupe`；若目的是显示全部工作区成员，应改用 `--workspace`。使用时会输出弃用警告。

### `--no-dev-dependencies`

已弃用且隐藏。改用 `-e=no-dev`。使用时会输出弃用警告。

### `--edges`

短旗标 `-e`。格式：`--edges <KINDS>`。要显示的依赖种类，接受逗号分隔的列表，也可重复给出。取值 `all`、`normal`、`build`、`dev`、`features`、`public`、`no-normal`、`no-build`、`no-dev`、`no-proc-macro`：

- `all`：显示全部边的种类；
- `normal`/`build`/`dev`：分别显示普通依赖、构建依赖、开发依赖；
- `features`：显示每个依赖启用的特性；若这是唯一给出的种类，会自动并入其余依赖种类；
- `no-normal`/`no-build`/`no-dev`：从默认集合中排除对应种类；
- `no-proc-macro`：不显示过程宏依赖；
- `public`：只显示公开依赖，需要 `-Z unstable-options`（依据源码）。

`normal`、`build`、`dev`、`all` 不能与 `no-normal`、`no-build`、`no-dev` 混用。默认为 `normal,build,dev`（man 手册说明）。`-e features` 不能与 `--duplicates` 同用。

### `--invert`

短旗标 `-i`。格式：`--invert <SPEC>`。反转树的方向，聚焦给定包：显示哪些包依赖了它。可重复给出。在工作区中默认只显示当前目录成员子树内的反向依赖；`--workspace` 可扩展到整个工作区，`-p` 可把范围限定在给定包的子树内。

### `--prune`

格式：`--prune <SPEC>`。将给定包从依赖树的显示中剪除。可重复给出。

### `--depth`

格式：`--depth <DEPTH>`。依赖树的最大显示深度；深度为 `1` 表示只显示直接依赖。值为 `workspace` 时改为只显示作为当前工作区成员的依赖。

### `--no-indent`

已弃用且隐藏。改用 `--prefix=none`。使用时会输出弃用警告。

### `--prefix-depth`

已弃用且隐藏。改用 `--prefix=depth`。使用时会输出弃用警告。

### `--prefix`

格式：`--prefix <PREFIX>`。每行的前缀显示方式。取值 `depth`、`indent`、`none`。默认 `indent`。

### `--no-dedupe`

不去重：对已在他处展示过依赖的重复包，照常重复展开，而不是以 `(*)` 标记。

### `--duplicates`

短旗标 `-d`，别名 `--duplicate`。只显示出现了多个版本的依赖（隐含 `--invert`）；与 `-p` 同用时只显示给定包子树内的重复。可用于定位导致同一包被编译多次的版本分叉。不能与 `-e features` 同用。

### `--charset`

格式：`--charset <CHARSET>`。树形符号使用的字符集。取值 `utf8`、`ascii`。未指定时由 cargo 自动选择。

### `--format`

短旗标 `-f`。格式：`--format <FORMAT>`。打印每个包所用的格式字符串。默认 `{p}`。以下占位符会被替换为对应值：

- `{p}`、`{package}`：包名；
- `{l}`、`{license}`：包的许可证；
- `{r}`、`{repository}`：包的仓库 URL；
- `{f}`、`{features}`：已启用的包特性，逗号分隔；
- `{lib}`：包的库在 `use` 语句中使用的名字。

### `--version`

短旗标 `-V`。隐藏旗标，为兼容旧版独立的 `cargo-tree` 工具保留：打印版本信息并退出。

### `--all-targets`

已弃用且隐藏。改用 `--target=all`。使用时会输出弃用警告。

## 使用提醒

- `-a`、`--no-dev-dependencies`、`--no-indent`、`--prefix-depth`、`--all-targets`、`-V` 均为隐藏或弃用旗标，不建议在新脚本中使用。
- `--edges public` 为不稳定功能，需要 nightly cargo 并配合 `-Z unstable-options`，在稳定版会报错。

## 示例

```sh
# 显示当前目录包的依赖树
cargo tree

# 显示哪些包依赖了 syn（反向依赖）
cargo tree -i syn

# 显示每个包启用的特性
cargo tree --format "{p} {f}"

# 只显示存在多个版本的依赖（被重复编译的包）
cargo tree -d

# 追踪 syn 的各特性是从哪里启用的
cargo tree -e features -i syn
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、`--edges` 取值与解析见 [src/bin/cargo/commands/tree.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/tree.rs)。
- 图构建与输出去重见 [src/cargo/ops/tree/mod.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/tree/mod.rs) 与 [src/cargo/ops/tree/graph.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/tree/graph.rs)。
