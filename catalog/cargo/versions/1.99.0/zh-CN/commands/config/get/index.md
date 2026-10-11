---
title: cargo config get
command:
  - config
  - get
---

不稳定命令：显示 cargo 实际加载的配置值（单个键或全部配置），需 nightly 与 `-Z unstable-options`。

## 简介

不稳定命令：`cargo config get` 属于 [cargo config](cli:command:config) 命令组，在稳定版 cargo 上会直接报错，需 nightly 工具链并给出 `-Z unstable-options`（跟踪 issue #9301）。

`cargo config get` 显示配置值。给出 `key` 时只显示该键（如 `build.rustflags`），不给 `key` 时显示全部配置值。

默认（`--merged yes`）显示合并后的最终值：即命令行 `--config` 覆盖、环境变量与各层配置文件按优先级合成后的结果。查询的键未设置时报错 `config value … is not set`。当查询的是表（table）类键时，输出后还会附注可能影响这些加载值的环境变量清单。

`--merged no` 改为逐层显示来源：命令行参数、相关环境变量、再依次是各配置文件中的未合并原始值，每段前标注定义位置。逐层模式只支持 `toml` 格式。

三种输出格式的差异：`toml` 以 `键 = 值` 形式输出（配合 `--show-origin` 时在行尾以注释标注来源）；`json` 输出嵌套到该键的 JSON 对象；`json-value` 只输出该键值的 JSON 本身。

## 参数

### `key`

可选，写作 `<key>`。要显示的配置键（如 `build.rustflags`、`registry`）；省略时显示全部配置值。

## 选项

以下仅列出 `cargo config get` 自有的选项；全局选项（`-v`、`-q`、`--color`、`--locked`、`--offline`、`--frozen`、`--config`、`-Z`）见 [cargo](cli:command:)。

### `--format`

格式：`--format <FORMAT>`。显示格式，取值 `toml`、`json`、`json-value`；默认 `toml`。

### `--show-origin`

格式：`--show-origin`。显示每个配置值定义于何处。只支持 `toml` 格式，其他格式下报错。

### `--merged`

格式：`--merged <MERGED>`。是否合并各配置来源后的值，取值 `yes`、`no`；默认 `yes`。`no`（逐层显示）只支持 `toml` 格式，其他格式下报错。

## 使用提醒

- 需要 nightly 与 `-Z unstable-options`，例如 `cargo +nightly -Zunstable-options config get build.rustflags`。
- `--show-origin` 与 `--merged no` 都只支持 `toml` 格式；与 `json`、`json-value` 同用时命令报错并提示改用 `toml`。
- 命令行 `--config` 给出的覆盖也参与显示：合并模式计入最终值，逐层模式单列一段。

## 示例

```sh
# 查看 build.rustflags 的最终值（需 nightly 与 -Z unstable-options）
cargo +nightly -Zunstable-options config get build.rustflags

# 不给 key，显示全部配置值
cargo +nightly -Zunstable-options config get

# 只输出该键值的 JSON 本身
cargo +nightly -Zunstable-options config get build.rustflags --format json-value

# 标注每个值来自哪个配置文件
cargo +nightly -Zunstable-options config get build.rustflags --show-origin

# 逐层显示各来源的原始值，而非合并结果
cargo +nightly -Zunstable-options config get --merged no
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义（选项、默认值与不稳定门控）见 [src/bin/cargo/commands/config.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/config.rs)；合并、逐层与三种格式的输出实现见 [src/cargo/ops/cargo_config.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_config.rs)。
