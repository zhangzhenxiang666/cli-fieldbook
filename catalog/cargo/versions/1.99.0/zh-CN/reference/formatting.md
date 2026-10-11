---
title: 输出与消息格式
---

cargo 的彩色输出、冗长程度与机器可读消息分别由全局选项、`[term]` 配置和 `--message-format` 控制。本页整理自固定提交（cargo 仓库 tag `0.99.0`，对应 Rust 1.99.0 工具链中的 cargo）：cargo 书《External tools》一章（上游路径 `src/doc/src/reference/external-tools.md`）与《Configuration》的 `[term]` 一节为上游文档译文；旗标解析语义为源码补充，依据 `src/cargo/util/command_prelude.rs` 与 `src/bin/cargo/cli.rs`。来源与核对范围见 [sources](sources.md)。

## 颜色

- `--color <WHEN>`：全局选项，取值 `auto`、`always`、`never`，大小写不敏感（依据源码 `src/bin/cargo/cli.rs` 的值解析器）。
- 对应配置键 `term.color`，默认 `auto`（自动检测终端是否支持颜色）；命令行选项可覆盖配置（依据 `config.md`）。

## 冗长与安静

- `-v` / `--verbose`：全局选项，可重复；帮助文本注明 `-vv` 为 very verbose，并输出 build.rs 的内容。
- `-q` / `--quiet`：全局选项，不打印 cargo 日志消息。
- 对应配置 `term.verbose` 与 `term.quiet`。覆盖关系（依据 `config.md`）：`--quiet` 强制安静并压过 `term.verbose`；`--verbose` 强制冗长并压过 `term.quiet`。

## `--message-format`

编译类命令（如 `cargo build`、`cargo test`）接受 `--message-format`，值以逗号分隔可给多个，大小写不敏感。取值分两类（依据源码 `src/cargo/util/command_prelude.rs` 的解析循环）：

- 基础格式 `human`、`short`、`json`：三者互斥，给出两种即报错 ``cannot specify two kinds of `message-format` arguments``；未指定时默认 `human`。
- JSON 修饰符 `json-render-diagnostics`、`json-diagnostic-short`、`json-diagnostic-rendered-ansi`：只对 JSON 生效，可单独给出（隐含 `json`）或与 `json` 组合，分别打开 JSON 输出的 `render_diagnostics`、`short`、`ansi` 三个开关；与 `human`/`short` 组合会报上述互斥错误。三个开关对诊断渲染的具体影响记载于命令手册的 `options-message-format` 模板，该文件不在本快照内，此处上游未说明。

### JSON 消息

`--message-format=json` 时，cargo 在构建过程中把以下信息以每行一个 JSON 对象的形式写入标准输出（依据《External tools》）：

- 内容包括编译器的错误与警告、生成的产物、构建脚本的结果。
- 每条消息的 `reason` 字段区分种类：`compiler-message`、`compiler-artifact`、`build-script-executed`、`build-finished`（含 `success` 布尔值）。
- `package_id` 字段是包的唯一标识，可像 `--package` 参数那样使用；MSRV 1.77 起采用 Package ID Specification 语法。
- `build-finished` 表示 cargo 不会再输出 JSON 消息，但 `cargo run`、`cargo test` 之后仍可能有被运行程序的普通输出。

注意 `--message-format=json` 只控制 cargo 与 rustc 自身的输出，不能控制被运行程序或过程宏的任意输出；书建议的变通是只把以 `{` 开头的行当作 JSON 解析。

## cargo metadata 的 JSON 输出

- `cargo metadata` 以 JSON 输出包结构与依赖信息，格式有版本管理；调用时应显式传 `--format-version` 以避免前向不兼容。
- `--format-version` 当前唯一取值为 `1`（依据 `cargo metadata` 手册与源码 `src/bin/cargo/commands/metadata.rs` 的值解析器）；省略时 cargo 打印警告并按版本 1 输出。
- 书推荐用 cargo_metadata crate 解析 metadata 输出与构建消息。

## 其他机器可读输出

- `--unit-graph`：可传给任意构建命令，把 cargo 内部 unit 图以 JSON 输出到标准输出，不实际构建；属不稳定特性，需 nightly 与 `-Z unstable-options`（依据源码 `fail_if_stable_opt("--unit-graph", 8002)` 与书《Unstable》一章）。
- `--timings`：输出构建计时信息。书《Unstable》注明该选项自 1.60 起由 `-Ztimings` 稳定为 `--timings`；它把 HTML 报告写入 `target/cargo-timings/cargo-timing.html`（并留一份带时间戳的副本），不是标准输出上的机器可读格式。
- `cargo locate-project --message-format <FMT>`：另一套独立取值，`json`（默认，输出含 `root` 键的 JSON 对象）与 `plain`（仅路径），依据其手册页。

## 输出流向

- JSON 消息写入标准输出，书《External tools》明确说明。
- 人类可读状态行与进度条写入哪个流，本快照的书未系统说明，上游未说明；源码中 `CARGO_LOG` 调试日志写入标准错误（依据 `src/bin/cargo/main.rs` 的 `setup_logger`）。

## 使用提醒

- 终端类配置也可用 `CARGO_TERM_*` 环境变量设置，见[环境变量](environment.md)。
- 解析构建消息时，以 `build-finished` 判定 cargo 侧 JSON 流结束，再处理后续普通输出；被运行程序的输出不遵循该格式。
