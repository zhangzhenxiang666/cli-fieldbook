---
title: cargo build
command:
  - build
---

cargo build 编译本地包及其全部依赖，是编译族命令（check、run、test、bench、doc、rustc、rustdoc）的基础形式。内置别名 `b`。

## 简介

未给出目标选择选项时，`cargo build` 构建所选包的全部二进制目标与库目标；声明了 `required-features` 而所需特性未启用的二进制目标会被跳过。包选择（`-p`/`--workspace`）、目标选择、特性选择与编译输出选项是编译族共享选项，统一在下方"选项"一节释义。

产物默认使用 `dev` profile 放在工作区根目录下的 `target` 中；`-r/--release` 等价于 `--profile release`，两者互斥。`--target` 可重复给出，一次为多个目标三元组构建。

并行度由 `-j/--jobs` 控制，默认为逻辑 CPU 数。构建结束时可用 `--timings` 输出耗时报告，用 `--future-incompat-report` 输出未来不兼容报告。

只分析不产出目标文件的更快的检查方式见 [`cargo check`](cli:command:check)。

## 选项

以下条目是编译族共享选项：统一解析到声明点 `src/cargo/util/command_prelude.rs`，在 `commands.json` 中登记于本节点，本页是它们的唯一释义处，供 build 与 check、run、test、bench、doc、rustc、rustdoc、fix 共用；各命令的本地选项与默认 profile 差异见各自页面。全局选项（冗长、安静、颜色、锁定、离线、冻结、配置覆盖、不稳定旗标与 `--help`）见 [cargo](cli:command:)。带"可重复"的选项可多次给出。

### `--future-incompat-report`

格式：`--future-incompat-report`。构建结束时输出一份未来不兼容报告，列出依赖图中未来 Rust 版本将无法编译的 crate 及受影响的警告。

### `--message-format`

格式：`--message-format <FMT>`，可重复、逗号分隔、大小写不敏感。取值 `human`、`short`、`json`、`json-diagnostic-short`、`json-diagnostic-rendered-ansi`、`json-render-diagnostics`。控制诊断消息的输出格式，未指定时为 `human`；JSON 系取值供 IDE 等工具消费，语义详见[输出与消息格式](../../reference/formatting.md)。

### `--package`

短旗标 `-p`。格式：`--package <SPEC>`，可重复。只构建指定的包。`SPEC` 按"包 ID 规约"书写：可以是包名（`regex`）、带版本的名称（`regex@1.4.3`），在依赖图存在歧义时需加限定符；语法与示例见 [`cargo pkgid`](cli:command:pkgid)。

### `--workspace`

格式：`--workspace`。构建工作区中的全部成员包。未用包选择选项时，cargo 默认操作当前目录所在的包；位于工作区根时改用 `default-members` 指定的成员，未指定则根包优先、虚拟工作区用全部成员。

### `--exclude`

格式：`--exclude <SPEC>`，可重复。从本次构建中排除指定的包。

### `--all`

格式：`--all`。`--workspace` 的已弃用别名。

### `--lib`

格式：`--lib`。只构建本包的库目标。

### `--bins`

格式：`--bins`。构建全部二进制目标。

### `--bin`

格式：`--bin <NAME>`，可重复。只构建指定名称的二进制目标。

### `--examples`

格式：`--examples`。构建全部示例目标。

### `--example`

格式：`--example <NAME>`，可重复。只构建指定名称的示例目标。

### `--tests`

格式：`--tests`。构建清单中设了 `test = true` 的全部目标。

### `--test`

格式：`--test <NAME>`，可重复。只构建指定名称的集成测试目标。

### `--benches`

格式：`--benches`。构建清单中设了 `bench = true` 的全部目标。

### `--bench`

格式：`--bench <NAME>`，可重复。只构建指定名称的基准目标。

### `--all-targets`

格式：`--all-targets`。构建全部目标。注意在 [`cargo test`](cli:command:test) 中该选项不含文档测试。

### `--features`

短旗标 `-F`。格式：`--features <FEATURES>`，可重复。激活指定的特性，多个特性用逗号或空格分隔（空格分隔时整体加引号）；在工作区中可用 `package-name/feature-name` 为特定成员启用特性。

### `--all-features`

格式：`--all-features`。激活命令行所选全部包的所有可用特性。

### `--no-default-features`

格式：`--no-default-features`。不激活 `default` 特性。

### `--release`

短旗标 `-r`。格式：`--release`。以 release 模式（启用优化）构建产物，等价于 `--profile release`，与 `--profile` 互斥。

### `--profile`

格式：`--profile <PROFILE-NAME>`。以指定 profile 构建产物。除内置的 `dev`、`release`、`test`、`bench` 外，可用清单 `[profile]` 中声明了 `inherits` 的自定义 profile。各命令的默认值不同：build 与 run 默认 `dev`，test 默认 `test`，bench 默认 `bench`。

### `--jobs`

短旗标 `-j`。格式：`--jobs <N>`。并行编译任务数，默认为逻辑 CPU 数；可给负值，表示"逻辑 CPU 数加上该值"；不应为 `0`。对应配置 `build.jobs`。

### `--keep-going`

格式：`--keep-going`。构建出错后不立即中止，尽量继续完成其余单元（尽力而为，不保证构建成功）。

### `--target`

格式：`--target <TRIPLE>`，可重复。为指定目标三元组编译，可重复以同时构建多个目标。取值可为 `rustc --print target-list` 中的三元组、`host-tuple`（替换为宿主目标）或自定义目标规格文件路径；默认取宿主平台。对应配置 `build.target`。

### `--target-dir`

格式：`--target-dir <DIRECTORY>`。全部生成产物的存放目录，默认为工作区根目录下的 `target`。对应配置 `build.target-dir` 与环境变量 `CARGO_TARGET_DIR`。

### `--artifact-dir`

格式：`--artifact-dir <PATH>`。把最终产物复制到指定目录，便于脚本取用（原件仍在 target 目录）。不稳定：仅 nightly 渠道且需 `-Z unstable-options`。也可经配置 `build.artifact-dir` 指定。

### `--unit-graph`

格式：`--unit-graph`。向标准输出发出 cargo 内部构建单元图（unit graph）的 JSON 表示，不实际构建并立即返回。不稳定：需 nightly 与 `-Z unstable-options`。

### `--timings`

格式：`--timings`。构建结束时输出耗时报告：HTML 报告写入 `target/cargo-timings/cargo-timing.html`，同目录另留一份带时间戳的副本供对比历史运行。

### `--compile-time-deps`

格式：`--compile-time-deps`。隐藏选项：只构建 proc-macro 与 build script（及其所需依赖）并运行 build script，供 rust-analyzer 一类工具使用；被上游标记为永不稳定（permanently-unstable），需 nightly 与 `-Z unstable-options`。

### `--manifest-path`

短旗标 `-m`。格式：`--manifest-path <PATH>`。所操作包的 `Cargo.toml` 路径；未提供时从当前工作目录出发自动定位根清单。

### `--ignore-rust-version`

格式：`--ignore-rust-version`。忽略包声明的 `rust-version`（MSRV），在工具链版本低于声明时也继续构建。

## 环境变量

- `CARGO_TARGET_DIR`：等同 `--target-dir`。
- `CARGO_BUILD_TARGET`：等同 `--target`（单值或列表）。
- `CARGO_BUILD_JOBS`：等同 `--jobs`。
- `RUSTFLAGS`/`CARGO_ENCODED_RUSTFLAGS`：传给全部 `rustc` 调用的额外旗标，优先于 `build.rustflags` 配置。

完整清单见[环境变量](../../reference/environment.md)。

## 使用提醒

- `--release` 与 `--profile` 互斥；`cargo build --release` 即等价写法。
- `--all` 已弃用，新脚本应写 `--workspace`。
- `--artifact-dir`、`--unit-graph`、`--compile-time-deps` 均需 nightly 与 `-Z unstable-options`，稳定渠道报错。
- 不被接受的拼写会得到改用建议而非静默失败：`--out-dir` 与 `-O` 提示改用 `--artifact-dir`，`-s`/`--silent` 提示改用 `-q`，本命令的 `--debug` 提示改用 `--release`。
- 以多目标（重复 `--target`）构建时，各目标的产物按三元组分目录存放。

## 示例

```sh
# 构建当前包及其全部依赖
cargo build

# 以优化模式构建
cargo build --release

# 只构建一个依赖包的库目标并启用特性
cargo build -p regex -F unicode

# 为两个目标三元组构建并输出耗时报告
cargo build --target x86_64-unknown-linux-gnu --target i686-unknown-linux-gnu --timings
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与行为见 [src/bin/cargo/commands/build.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/build.rs)。
- 共享参数声明点见 [src/cargo/util/command_prelude.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/util/command_prelude.rs)。
- man 手册见 [src/doc/man/cargo-build.md](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/doc/man/cargo-build.md)。
