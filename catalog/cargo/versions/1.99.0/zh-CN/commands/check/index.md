---
title: cargo check
command:
  - check
---

cargo check 检查本地包及其全部依赖的编译错误：执行除最终代码生成之外的编译过程，不产出目标文件，因而通常比 [`cargo build`](cli:command:build) 快。内置别名 `c`。

## 简介

`cargo check` 让 `rustc` 走到类型检查为止，并把元数据文件写入磁盘；源码未改动时后续运行会复用这些元数据。部分诊断与错误只在代码生成阶段产生，这类问题 `cargo check` 本质上不会报告——这是它与 build 的关键差异，最终仍需 build 验证。

未给出目标选择选项时，检查所选包的全部二进制目标与库目标；声明了 `required-features` 而所需特性未启用的二进制目标会被跳过。

`--profile test` 是本命令保留的历史行为：以测试模式检查（向 `rustc` 传 `--test`），等价效果也可用 `cargo check --all-targets --profile=test` 覆盖单元测试目标。默认 profile 为 `dev`。

包选择、目标选择、特性选择与编译选项（`-p`、`--workspace`、`--lib`、`--bin`、`-F`、`--target`、`--target-dir`、`--message-format`、`--timings` 等）均为编译族共享选项，释义见 [`cargo build`](cli:command:build)。

## 选项

编译族共享选项（包选择、特性、profile、目标等）见 [cargo build](cli:command:build)。全局选项见 [cargo](cli:command:)。本命令没有本地声明的选项。

## 使用提醒

- 检查产物（`.rmeta` 元数据）与 build 产物分开缓存，`cargo check` 不会替你产出可运行的二进制。
- `--keep-going` 在本命令可用：出错后尽量继续检查其余单元。
- 需要把诊断交给工具消费时用 `--message-format json`，格式细节见[输出与消息格式](../../reference/formatting.md)。

## 示例

```sh
# 检查当前包的编译错误
cargo check

# 检查全部目标，包括单元测试
cargo check --all-targets --profile=test
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [src/bin/cargo/commands/check.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/check.rs)。
- man 手册见 [src/doc/man/cargo-check.md](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/doc/man/cargo-check.md)。
