---
title: cargo bench
command:
  - bench
---

cargo bench 编译并执行包的基准测试：与测试同构的构建流程，但以基准模式运行。无内置别名。

## 简介

基准由 `rustc --test` 构建成链接 libtest 的特殊可执行文件，自动运行所有标注 `#[bench]` 的函数；cargo 向测试 harness 传 `--bench` 旗标，使其只运行基准，无论 harness 是 libtest 还是自定义实现。清单目标设置 `harness = false` 时需自带 `main`。

未给出目标选择选项时，构建并运行基准的：库目标（供二进制与基准链接）、二进制目标（仅当同时构建基准目标且所需特性可用）、库与二进制的基准形式，以及基准目标。该默认可由清单的 `bench` 标志改变；按名选择目标的选项忽略 `bench` 标志，始终以指定目标运行。

默认使用 `bench` profile（继承 `release` 的设置：启用优化、关闭调试信息）；需要调试基准时可改用 `--profile=dev`，再在调试器中运行。

`#[bench]` 特性目前不稳定，仅在 nightly 渠道可用；稳定渠道可改用 crates.io 上的第三方基准包（如 Criterion）。

过滤与透传：位置参数 `BENCHNAME` 与 `--` 之后的所有参数都传给基准二进制（即 libtest）。`BENCHNAME` 做"名称包含该字符串"的过滤；`cargo bench -- foo --exact` 只运行名为 `foo` 的基准、跳过 `foobar` 等相似名称。

工作目录：每个基准的工作目录为所属包的根目录，与 [`cargo test`](cli:command:test) 一致。

## 参数

### `BENCHNAME`

可选，写作 `BENCHNAME`。若给出，只运行名称中包含该字符串的基准。

### `args`

可选，写作 `ARGS`。传给基准二进制（libtest 或自定义 harness）的参数，应写在 `--` 之后。

## 选项

编译族共享选项（包选择、特性、profile、目标等）见 [cargo build](cli:command:build)。全局选项见 [cargo](cli:command:)。本命令的本地选项如下。

### `--no-run`

格式：`--no-run`。只编译基准，不运行。

### `--no-fail-fast`

格式：`--no-fail-fast`。无论失败与否运行全部基准，不在第一个失败后停止。

## 使用提醒

- 本命令不提供 `-r/--release`：默认已是 `bench` profile（继承 `release`），切换 profile 用 `--profile`。
- 本命令不提供 `--keep-going`：要尽量多跑基准用 `--no-fail-fast`；要尽量多编译基准目标，先 `cargo build --benches --release --keep-going` 再 `cargo bench --no-fail-fast`。
- `--jobs` 只影响基准可执行文件的构建并行度；libtest 以单线程串行运行基准。

## 示例

```sh
# 构建并执行当前包的全部基准
cargo bench

# 在指定基准目标内运行某个模块的具体基准
cargo bench --bench bench_name -- modname::some_benchmark

# 只运行名为 foo 的基准（精确匹配）
cargo bench -- foo --exact
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [src/bin/cargo/commands/bench.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/bench.rs)。
- man 手册见 [src/doc/man/cargo-bench.md](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/doc/man/cargo-bench.md)。
