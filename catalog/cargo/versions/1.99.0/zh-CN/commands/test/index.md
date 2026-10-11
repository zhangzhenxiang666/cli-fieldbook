---
title: cargo test
command:
  - test
---

cargo test 编译并执行包的单元测试、集成测试与文档测试。内置别名 `t`。

## 简介

测试由 `rustc --test` 构建成特殊的可执行文件：链接 libtest（rustc 内置的单元测试与微基准框架），自动运行所有标注 `#[test]` 的函数；`#[bench]` 函数也会以一次迭代运行以验证可用。包内有多个测试目标时逐个串行执行。清单目标设置 `harness = false` 可禁用 libtest，此时需自带 `main`。

未给出目标选择选项时，构建并测试：库目标（供二进制、示例、集成测试与文档测试链接）、二进制目标（仅当同时构建集成测试且所需特性可用）、示例目标（验证可编译）、库与二进制的单元测试形式、集成测试目标，以及库目标的文档测试。该默认可由清单的 `test` 标志改变；按名选择目标的选项（如 `--test`、`--example`）忽略 `test` 标志，始终测试指定目标；`doctest = false` 可关闭库的文档测试。

文档测试由 `rustdoc` 处理：从库目标文档注释中提取代码块，逐块编译成 doctest 可执行文件并行运行。doctest 的编译由 libtest 控制，`--jobs` 等选项对其可能不生效；该执行模型上游声明不保证稳定。

过滤与透传：位置参数 `TESTNAME` 与 `--` 之后的所有参数都传给测试二进制（即 libtest）。`TESTNAME` 做"名称包含该字符串"的过滤，精确匹配需把 `--exact` 传给测试二进制；libtest 的完整参数见 `cargo test -- --help`。

工作目录：每个单元/集成测试的工作目录为所属包的根目录（保证相对路径可靠）；文档测试调用 `rustdoc` 时为工作区根目录，运行每个文档测试时为所属包根目录。

默认 profile 为 `test`（继承 `dev` 的设置）。包选择、目标选择、特性与编译选项均为编译族共享选项，释义见 [`cargo build`](cli:command:build)。

## 参数

### `TESTNAME`

可选，写作 `TESTNAME`。若给出，只运行名称中包含该字符串的测试；同时未使用目标选择选项时，cargo 按"全部测试目标"过滤，跳过示例等不必编译的目标以加快启动。

### `args`

可选，写作 `ARGS`。传给测试二进制（libtest 或自定义 harness）的参数，应写在 `--` 之后。

## 选项

编译族共享选项（包选择、特性、profile、目标等）见 [cargo build](cli:command:build)。全局选项见 [cargo](cli:command:)。本命令的本地选项如下。

### `--no-run`

格式：`--no-run`。只编译测试，不运行。

### `--no-fail-fast`

格式：`--no-fail-fast`。无论失败与否运行全部测试，不在第一个失败后停止。

### `--quiet`

短旗标 `-q`。格式：`--quiet`。以每个测试一个字符（替代每行一条）的方式显示测试结果；同时使 cargo 安静，并把 `--quiet` 转发给带 libtest harness 的测试二进制。

### `--doc`

格式：`--doc`。只测试库目标的文档，不能与其他目标选择选项或 `--no-run` 混用。

## 使用提醒

- `--jobs` 只影响测试可执行文件的构建并行度，不影响运行测试的线程数；控制运行线程用 `cargo test -j 2 -- --test-threads=2`。
- 本命令不提供 `--keep-going`：要尽量多跑测试用 `--no-fail-fast`；要尽量多编译测试目标，先 `cargo build --tests --keep-going` 再 `cargo test --tests --no-fail-fast`。
- 测试输出默认被 harness 捕获，调试时用 `cargo test -- --no-capture` 恢复显示。

## 示例

```sh
# 运行当前包的全部单元测试与集成测试
cargo test

# 只运行名称匹配过滤串的测试
cargo test name_filter

# 在指定集成测试目标内运行某个模块的具体测试
cargo test --test int_test_name -- modname::test_name

# 名称含 foo 的测试用 3 个线程并行运行
cargo test foo -- --test-threads 3
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与 `--doc` 互斥逻辑见 [src/bin/cargo/commands/test.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/test.rs)。
- 测试运行与安静模式转发见 [src/cargo/ops/cargo_test.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_test.rs)。
- man 手册见 [src/doc/man/cargo-test.md](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/doc/man/cargo-test.md)。
