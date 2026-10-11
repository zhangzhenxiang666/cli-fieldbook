---
title: cargo rustc
command:
  - rustc
---

cargo rustc 编译当前包（或 `-p` 指定的包）的目标及其全部依赖，并把额外选项透传给最终的 `rustc` 调用。无内置别名。

## 简介

`--` 之后的参数只会加到最终目标 crate 那一次 `rustc` 调用上，不会传给依赖的编译；注意 `rustc` 仍会无条件收到 `-L`、`--extern`、`--crate-type` 等参数，透传的参数只是追加。要给 cargo 发起的全部 `rustc` 进程传旗标，用 `RUSTFLAGS` 环境变量或 `build.rustflags` 配置。

`--profile` 在本命令对三个命名 profile 有历史特殊行为：`check` 按 [`cargo check`](cli:command:check) 的方式以 `dev` profile 检查；`test` 按 [`cargo test`](cli:command:test) 的方式以测试模式构建（启用 `test` cfg）；`bench` 按 [`cargo bench`](cli:command:bench) 的方式构建。

包选择、目标选择、特性选择与编译选项（`-p`、`--lib`、`--bin`、`-F`、`-r`、`--target`、`--timings` 等）均为编译族共享选项，释义见 [`cargo build`](cli:command:build)。

## 参数

### `args`

可选，写作 `ARGS`。额外的 `rustc` 旗标，应写在 `--` 之后。

## 选项

编译族共享选项（包选择、特性、profile、目标等）见 [cargo build](cli:command:build)。全局选项见 [cargo](cli:command:)。本命令的本地选项如下。

### `--print`

格式：`--print <INFO>`。调用 `rustc --print <INFO>` 输出编译器信息（如目标列表），不执行编译。不稳定：需 nightly 与 `-Z unstable-options`。

### `--crate-type`

格式：`--crate-type <CRATE-TYPE>`，可重复，值内可用逗号分隔多个。覆盖清单中的 `crate-type` 字段，取值与清单字段相同（如 `lib`、`cdylib`）；仅在构建 `lib` 或 example 库目标时有效，命令行值优先于清单。

## 使用提醒

- `--print` 与 `--crate-type` 之外的行为差异：本命令一次只作用于一个包（`-p` 为单值）。
- 透传旗标只影响最终 crate；proc-macro、build script 等依赖的编译不受影响。
- nightly 专属的 `rustc` 旗标（如 `-Z print-type-sizes`）要求 cargo 也以 nightly 工具链运行。

## 示例

```sh
# 检查包自身（不含依赖）是否使用 unsafe 代码
cargo rustc --lib -- -D unsafe-code

# 在 nightly 编译器上试用实验旗标：打印每个类型的大小
cargo rustc --lib -- -Z print-type-sizes

# 用命令行覆盖 Cargo.toml 中的 crate-type 字段
cargo rustc --lib --crate-type lib,cdylib
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、`--print` 门控与 profile 特殊行为见 [src/bin/cargo/commands/rustc.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/rustc.rs)。
- man 手册见 [src/doc/man/cargo-rustc.md](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/doc/man/cargo-rustc.md)。
