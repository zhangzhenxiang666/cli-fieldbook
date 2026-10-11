---
title: cargo run
command:
  - run
---

cargo run 构建并运行本地包的一个二进制目标或示例目标：先按编译规则构建，再在当前工作目录下执行该程序。内置别名 `r`。

## 简介

未给出目标选择选项时，`cargo run` 运行二进制目标；存在多个二进制目标时必须用 `--bin` 或 `--example` 选定一个，或在 `Cargo.toml` 的 `[package]` 段用 `default-run` 字段指定默认运行的二进制名。`-p` 在本命令为单值且不接受 glob 模式（给出会报错），因为一次只运行一个目标。

`--` 之后的所有参数原样传给被运行的程序；`--` 之前的参数归 cargo 解析。与 [`cargo test`](cli:command:test)、[`cargo bench`](cli:command:bench) 不同，被运行程序的工作目录就是执行 `cargo run` 时的当前工作目录，与在 shell 中直接运行一致。

退出码传播：程序以非零状态退出时，该退出码原样作为 `cargo run` 的退出码；进程从未启动时用 `101`。传 `-q` 时 cargo 不再重复打印失败原因，认为程序自身已输出足够信息。详见[退出代码](../../reference/exit-codes.md)。

包选择（`-p`）、`--bin`/`--example`、特性选择与编译选项（`-F`、`-r`、`--profile`、`-j`、`--target` 等）均为编译族共享选项，释义见 [`cargo build`](cli:command:build)。

## 参数

### `args`

可选，写作 `ARGS`。传给被运行二进制或示例的参数，应写在 `--` 之后。

## 选项

编译族共享选项（包选择、特性、profile、目标等）见 [cargo build](cli:command:build)。全局选项见 [cargo](cli:command:)。本命令没有本地声明的选项。

## 使用提醒

- 要把 `--help` 传给被运行的程序，用 `cargo run -- --help`；直接写 `cargo run --help` 显示的是 cargo run 自身的帮助。
- 传给 `RUSTFLAGS` 的旗标只影响编译阶段，不会传给被运行的程序。

## 示例

```sh
# 构建当前包并运行其主二进制目标（假设只有一个）
cargo run

# 运行一个示例并向它传参
cargo run --example exname -- --exoption exarg1 exarg2
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与退出码处理见 [src/bin/cargo/commands/run.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/run.rs)。
- man 手册见 [src/doc/man/cargo-run.md](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/doc/man/cargo-run.md)。
