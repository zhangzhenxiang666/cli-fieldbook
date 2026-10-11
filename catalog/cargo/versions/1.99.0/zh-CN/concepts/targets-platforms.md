---
title: 目标平台与交叉编译
uses:
  - command:rustc
  - command:build
---

Rust 代码最终要编译到某个目标平台上。本文说明 host 与目标三元组的关系、`--target` 如何改变构建布局，以及 `[target]` 配置段中的 linker/runner 等平台相关设置。本文为 cargo 书《Configuration》的 `[target]` 一节、《Build Cache》章与《Continuous Integration》指南相关内容的译文整理（上游文档译文）；命令旗标细节为源码补充。

## host 与目标三元组

不指定 `--target` 时，cargo 以 host（执行 cargo 的机器架构）为目标构建，产物直接放在 target 目录根部（`target/debug/`、`target/release/` 等，按 profile 分目录）。指定 `--target <三元组>` 后，改为为给定目标三元组（target triple，如 `x86_64-unknown-linux-gnu`、`thumbv7m-none-eabi`）构建，产物移入以三元组命名的子目录：

```text
target/                        # 未用 --target：按 profile 直接分目录
├── debug/                     # dev 与 test profile（历史约定）
├── release/                   # release 与 bench profile（历史约定）
└── <自定义 profile 名>/

target/<三元组>/               # 用 --target：多一层三元组目录
├── debug/
└── release/
```

这一布局上的差别还有行为后果（依据《Build Cache》章）：host 模式下依赖与构建脚本、proc-macro 共享产物与 `RUSTFLAGS`；使用 `--target` 时构建脚本与 proc-macro 仍按 host 单独构建，不共享 `RUSTFLAGS`——交叉编译因此更干净，代价是多一份构建。

`--target` 是编译族共享选项，释义见 [cargo build](cli:command:build) 页（"Build for the target triple"）。它也可经 `build.target` 配置设为默认（`cargo install` 忽略该默认）。使用自定义 target spec JSON 文件时（`--target foo/bar.json`，稳定渠道不可用），`[target]` 配置与平台特定依赖都以不含扩展名的基本名（`bar`）匹配。

## `[target]` 配置段

`config.toml` 的 `[target]` 表按目标三元组或 `cfg()` 表达式组织，命中当前目标即生效：

```toml
[target.thumbv7m-none-eabi]
linker = "arm-none-eabi-gcc"
runner = "my-emulator"

[target.'cfg(all(target_arch = "arm", target_os = "none"))']
runner = "my-arm-wrapper"
```

- `linker`：传给 `rustc`（`-C linker`）的链接器，host 默认不覆盖。环境变量 `CARGO_TARGET_<三元组>_LINKER`。
- `runner`：运行类命令（[cargo run](cli:command:run)、[cargo test](cli:command:test)、[cargo bench](cli:command:bench)）执行该目标产物时，改为调用给定程序并把可执行文件作为参数传入（典型用途是模拟器——`thumbv7m` 这类目标无法在本机直接执行）。环境变量 `CARGO_TARGET_<三元组>_RUNNER`。
- `rustflags`/`rustdocflags`：仅对该目标追加的编译器/文档旗标。环境变量 `CARGO_TARGET_<三元组>_RUSTFLAGS`、`CARGO_TARGET_<三元组>_RUSTDOCFLAGS`。
- `target.<三元组>.<links>`：覆盖给定 `links` 库的构建脚本，直接提供 `rustc-link-lib`、`rustc-link-search`、`rustc-cfg` 等输出值而不运行脚本。

三元组表与 `cfg()` 表同名相遇时三元组优先；多个 `cfg()` 条目同时命中 `linker`/`runner` 是错误，而 `rustflags`/`rustdocflags` 的多条命中会拼接。这些值的路径相对所在配置文件解析；可执行程序支持"路径加参数"的写法（数组或空格分隔字符串）。

## cfg 表达式

`cfg()` 匹配的值来自编译器内建集合（`rustc --print=cfg` 可查看当前平台的全部 cfg）加上显式传给 `rustc` 的 `--cfg` 旗标（如经 `RUSTFLAGS`）。不能用它们匹配 `debug_assertions`、`test`、cargo 特性（`feature = "foo"`）或构建脚本设置的值——这些要么恒为默认值，要么不在匹配可见的范围内。要查看另一平台的可用 cfg，可运行 `rustc --print=cfg --target=<三元组>`。

平台特定依赖用同样的语法写在清单里：`[target.'cfg(windows)'.dependencies]`、`[target.x86_64-pc-windows-gnu.dependencies]`，支持 `not`/`any`/`all` 组合。注意解析器对平台特定依赖按"所有平台都启用"建图（保证 lockfile 完整），只在真正构建时按目标过滤（见[依赖解析与 Cargo.lock](dependencies.md)）；依赖构建脚本匹配的是 host 平台。

## 与交叉编译相关的命令

- [cargo build](cli:command:build)/[cargo check](cli:command:check)/[cargo test](cli:command:test) 等编译族命令接受 `--target <三元组>`；目标平台的标准库等组件需提前装进工具链——这是工具链侧（如 rustup）的操作，不属于 cargo 的命令面，上游书在本文依据范围内未展开。
- [cargo rustc](cli:command:rustc) 在 build 的基础上编译包及其全部依赖，但只向最终目标 crate 的那次 `rustc` 调用透传任意附加参数，适合针对特定目标传个别编译器旗标；[cargo rustdoc](cli:command:rustdoc) 对 rustdoc 同理。
- [cargo metadata](cli:command:metadata) 的 `--filter-platform <三元组>` 只输出匹配该目标的解析依赖，适合按平台检查依赖图。

CI 场景（《Continuous Integration》指南）通常在矩阵中固定工具链运行 `cargo build`/`cargo test`，再以单独作业验证最新依赖与 `rust-version`；跨平台项目应考虑为高风险的平台/版本组合增加矩阵项——多数项目则依赖平台特定依赖的包自行验证其平台行为。
