---
title: 包、crate 与编译目标
uses:
  - command:build
  - command:run
---

Cargo 的包（package）由若干编译目标（target）组成，每个目标对应一组可编译为 crate 的源文件。本文说明目标种类、源码布局约定与自动发现规则，以及各命令如何按目标筛选。本文为 cargo 书《Cargo Targets》与《Package Layout》两章的译文整理（上游文档译文），命令关联为源码补充。

## 包、crate 与目标

crate 是 Rust 的编译单元：一个库或一个可执行程序。包是 cargo 的管理单元——一个包携带一份 `Cargo.toml` 清单、一组依赖声明和一组目标；构建时每个目标编译为一个 crate（集成测试等每个文件各是一个 crate）。一个包最多一个库目标，但可以有任意多个二进制、示例、测试与基准目标。

## 五类清单目标

- 库目标（lib target）：默认源文件 `src/lib.rs`，名称默认为包名并把 `-` 替换为 `_`。一个包只能有一个库，用 `[lib]` 表配置。其他库和可执行程序通过它的公共 API 复用本包。
- 二进制目标（bin target）：可执行程序，源文件为 `src/main.rs` 与 `src/bin/` 下的文件或子目录；`src/main.rs` 的默认名就是包名（不替换 `-`）。用 `[[bin]]` 表配置，可链接本包库目标的公共 API 与 `[dependencies]`，运行用 [cargo run](cli:command:run) 的 `--bin <名>`，复制到公共位置用 [cargo install](cli:command:install)。
- 示例目标（example）：放在 `examples/` 下，演示库的用法；默认编译为可执行程序（默认 crate-type 为 `"bin"`），也可用 `crate-type` 改为库。可用 `[dev-dependencies]`。编译产物位于 `target/debug/examples`。
- 测试目标（test）：分两类——单元测试是库或二进制内带 `#[test]` 的函数，可访问所在目标的私有 API；集成测试是 `tests/` 下的文件，每个文件编译为独立的可执行 crate，链接库目标并只能使用其公共 API。默认使用 libtest harness（`harness = false` 时自写 `main`），测试函数并行执行。存在集成测试时 cargo 会自动构建二进制目标，并设置 `CARGO_BIN_EXE_<name>` 环境变量供测试定位可执行文件。多个集成测试会串行执行；测试很多时，书中建议合并为单个集成测试再用模块拆分，交给 harness 并行。多个集成测试之间共享代码的惯例是放进 `tests/common/mod.rs` 这样的独立模块，再由各测试 `mod common;` 引入。
- 基准目标（benchmark）：放在 `benches/` 下，结构与测试相同，函数带 `#[bench]` 属性。该属性目前不稳定，仅 nightly 可用；稳定渠道通常改用第三方基准库。
- 文档测试：由 rustdoc 处理，执行模型与上述测试不同，经 [cargo test](cli:command:test) 一并运行；库目标可用 `doctest = false` 关闭。

此外，包还可以有一个构建脚本（build script）：由 `[package]` 的 `build` 字段声明，默认加载包根的 `build.rs`，设为 `false` 可禁用。它在构建期编译并运行，不属于上述五类清单目标表。

## 源码布局约定

```text
.
├── Cargo.toml      # 清单，位于包根
├── Cargo.lock
├── src/
│   ├── lib.rs      # 默认库目标
│   ├── main.rs     # 默认二进制目标
│   └── bin/        # 其他二进制目标
├── benches/        # 基准目标
├── examples/       # 示例目标
└── tests/          # 集成测试目标
```

`src/bin`、`benches`、`examples`、`tests` 下的目标可以是单个 `.rs` 文件，也可以是含 `main.rs` 的子目录——此时目标名取目录名。按惯例这些目标名遵循 kebab-case，目标内部的模块遵循 Rust 标准的 snake_case。

## 目标配置字段

`[lib]`、`[[bin]]`、`[[example]]`、`[[test]]`、`[[bench]]` 共用一组字段。`name` 是目标名，也是产物文件名（对库而言即依赖引用的 crate 名），除 `[lib]` 外必填；`path` 指明源文件位置，缺省按目标名与目录布局推断。四个布尔开关决定命令的默认范围：`test`（`cargo test` 是否默认测试；示例目标默认只**编译**不测试，防止示例随代码演进失效）、`doctest`（文档测试，仅对库有意义）、`bench`、`doc`（与库同名的二进制会被 `cargo doc` 跳过）。其余：`proc-macro` 声明过程宏库（仅 `[lib]` 有效）；`harness = false` 时不传 `--test` 给 rustc，需自写 `main`；`crate-type` 仅库与示例可设，取值 `bin`/`lib`/`rlib`/`dylib`/`cdylib`/`staticlib`/`proc-macro`（默认：普通库 `"lib"`、过程宏库 `"proc-macro"`、示例 `"bin"`）；`required-features` 列出构建该目标所需的特性，任一未启用即跳过（对 `[lib]` 无效）；`edition` 缺省继承 `[package]`，该字段已弃用。

```toml
# 目标配置示例（摘自上游文档）
[lib]
crate-type = ["cdylib"]
bench = false

[[bin]]
name = "my-pg-tool"
required-features = ["postgres", "tools"]
```

## 自动发现与关闭

默认情况下 cargo 按上述目录布局自动推断目标，清单里的目标表则用来补充不符合布局的目标。把 `[package]` 下的 `autolib`、`autobins`、`autoexamples`、`autotests`、`autobenches` 设为 `false` 可分别关闭对应类型的自动发现，只构建手工声明的目标——通常只在特殊布局下需要，例如库中恰好有个名为 `bin` 的模块。2015 edition 的包若手工定义过目标，自动发现默认关闭；2018 edition 起默认始终开启。

## 与命令的关系

多数构建类命令接受目标筛选旗标（编译族共享，见 [cargo build](cli:command:build) 页）：`--lib`、`--bin <名>`、`--bins`、`--example <名>`、`--examples`、`--test <名>`、`--tests`、`--bench <名>`、`--benches`、`--all-targets`。[cargo run](cli:command:run) 用 `--bin`/`--example` 选择要运行的目标（多个二进制时可用清单的 `default-run` 字段设默认值），[cargo test](cli:command:test) 按 `test`/`doctest` 字段选择要测试的目标，[cargo bench](cli:command:bench) 按 `bench` 字段选择基准目标，[cargo install](cli:command:install) 可把二进制或可执行示例复制到公共位置。
