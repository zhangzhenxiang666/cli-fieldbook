---
title: 特性与 profile
uses:
  - command:build
  - command:bench
---

特性（feature）在编译期按名开关代码与依赖；profile 控制传给 `rustc` 的优化与调试设置。两者都横贯编译族命令。本文为 cargo 书《Features》与《Profiles》两章的译文整理（上游文档译文）。

## 特性的声明与默认集

特性在 `Cargo.toml` 的 `[features]` 表中声明，每个特性列出它启用的其他特性或可选依赖：

```toml
[features]
default = ["ico", "webp"]
bmp = []
png = []
ico = ["bmp", "png"]   # 启用 ico 时一并启用 bmp 与 png
webp = []
```

代码里用 `cfg(feature = "webp")` 条件编译，cargo 通过 `rustc` 的 `--cfg` 旗标把启用的特性传下去。默认所有特性关闭，除非列入名为 `default` 的特性。命令行 `--no-default-features` 可关闭默认集，依赖声明里 `default-features = false` 同理——但在特性统一化（见下文）之下，图中任何一处未关闭，默认特性仍会被启用。

## 可选依赖与隐式特性

`[dependencies]` 中的依赖可标 `optional = true`：默认不编译，且隐式定义一个同名特性（等价于 `gif = ["dep:gif"]`），因此 `--features gif` 即可启用该依赖。若不想暴露同名特性（例如它是内部细节，或想把多个可选依赖编成一组），可在 `[features]` 里任意位置用 `dep:` 前缀引用它，这会禁用隐式特性，例如 `avif = ["dep:ravif", "dep:rgb"]`。

依赖自身的特性在依赖声明里用 `features = [...]` 启用；在本包 `[features]` 里可用 `"包名/特性名"` 语法联动启用，加 `?`（`"包名?/特性名"`）表示仅当该可选依赖被其他东西启用时才联动。

## 特性统一化

特性属于定义它的包：启用 A 包的 `foo` 不会启用 B 包的同名特性。当一个依赖被多个包使用时，cargo 以所有启用特性的并集构建它，保证图中只有一份该依赖。推论是特性应当可加——启用任何组合都不应关闭功能；要表达互斥，宁可拆包或在代码里 `compile_error!` 检测，也不要定义互斥特性。想查清某依赖的特性从何而来，用 `cargo tree -e features`（`-i <包>` 反向查看）。

## resolver 版本 2 的差异

`resolver = "2"`（edition 2021 起默认）在三种情形下避免统一化：非当前构建目标的平台特定依赖的特性被忽略；build-dependencies 与 proc-macro 不与普通依赖共享特性；dev-dependencies 只在构建测试或示例等目标时才并入。代价是同一依赖可能以不同特性集构建多份。此外 `--features`/`--no-default-features` 在版本 2 下可作用于命令行 `-p`/`--workspace` 选中的任何包，版本 1 下只作用于当前目录的包。

## 命令行特性旗标

编译族命令共享三个旗标（释义见 [cargo build](cli:command:build) 页）：`--features` 接受逗号或空格分隔的特性列表（多包构建时可用 `包名/特性名` 指向特定成员）；`--all-features` 启用所选包的全部特性；`--no-default-features` 不启用默认集。目标表的 `required-features` 字段让目标在特性缺失时被跳过。

## profile：内置与自定义

profile 按"哪个命令在跑"自动选择，可用 `--profile <名>` 或 `--release`（等价 `--profile=release`）切换：

| 命令 | 默认 profile |
| --- | --- |
| [cargo run](cli:command:run)、[cargo build](cli:command:build)、[cargo check](cli:command:check)、[cargo rustc](cli:command:rustc) | `dev` |
| [cargo test](cli:command:test) | `test`（继承 `dev`） |
| [cargo bench](cli:command:bench) | `bench`（继承 `release`） |
| [cargo install](cli:command:install) | `release` |

内置四个：`dev`（日常开发，`opt-level = 0`、`debug = true`、`debug-assertions = true`、`incremental = true`、`codegen-units = 256`）与 `release`（`opt-level = 3`、`debug = false`、关闭断言、`codegen-units = 16`），`test`/`bench` 分别继承两者。自定义 profile 必须用 `inherits` 指明继承对象，产物输出到 target 目录下与 profile 同名的子目录；因历史约定 `dev`/`test` 的产物在 `debug/` 下，`release`/`bench` 的在 `release/` 下。

## 常用设置项

`[profile.<名>]` 下可调：`opt-level`（`0`–`3`、`"s"`、`"z"`）、`debug`（`0`/`1`/`2` 或 `"line-tables-only"`/`"full"` 等）、`split-debuginfo`、`strip`（`"none"`/`"debuginfo"`/`"symbols"`）、`debug-assertions`、`overflow-checks`、`lto`（`false`/`true`（fat）/`"thin"`/`"off"`）、`panic`（`"unwind"`/`"abort"`；测试与构建脚本等忽略此项）、`incremental`、`codegen-units`、`rpath`。构建脚本与 proc-macro 默认不被优化（`build-override`）以加快构建。

## 覆盖与生效范围

profile 设置只在**工作区根**的 `Cargo.toml` 中生效，依赖里的 `[profile]` 被忽略。可按包覆盖：`[profile.dev.package.<名>]`（包名可用 Package ID 规格精确到版本）针对单个包，`[profile.dev.package."*"]` 针对全部非工作区成员，`[profile.dev.build-override]` 针对构建脚本与 proc-macro；覆盖不能设置 `panic`、`lto`、`rpath`。优先级为具名包 > `"*"` > `build-override` > `[profile.dev]` > cargo 内置默认。此外，配置文件与环境变量中的 `[profile]` 定义会覆盖清单设置（见[配置层与 CARGO_HOME](configuration.md)）。
