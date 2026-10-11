---
title: cargo report timings
command:
  - report
  - timings
---

不稳定命令：由先前构建会话保存的日志生成 HTML 耗时报告，无需重新构建。需 nightly cargo 并启用 `-Z build-analysis`。

## 简介

`cargo report timings` 为不稳定命令，在稳定工具链上直接报错；需 nightly cargo 并启用 `-Z build-analysis`（跟踪 issue [rust-lang/cargo#15844](https://github.com/rust-lang/cargo/issues/15844)），也可按不稳定特性文档在配置中设置 `[unstable] build-analysis = true` 与 `[build.analysis] enabled = true`。

启用该特性后，cargo 会以 JSONL 格式把构建日志写入 `$CARGO_HOME/log/`，每次调用生成一个以唯一会话 ID 命名的日志文件。本命令读取其中一个会话的日志，生成 HTML 耗时报告，效果类似 `cargo build --timings`（见 [cargo build](cli:command:build)）但不再触发构建。在工作区内运行时，报告写入 target 目录下 `cargo-timings/cargo-timing-<会话 ID>.html`；不在工作区内时写入临时目录。

没有可用日志时命令报错并提示先用 `-Z build-analysis` 运行构建命令；`--id` 指定的会话不存在时报错并提示运行 [cargo report sessions](cli:command:report/sessions) 列出可用会话。清单路径可用继承的 `-m/--manifest-path` 指定（选项释义见 [cargo build](cli:command:build)）。

## 选项

### `--open`

格式：`--open`。报告生成后在浏览器中打开。

### `--id`

格式：`--id <ID>`。要报告的会话 ID；未指定时使用最近一次会话。

## 示例

```sh
# 由最近一次会话生成耗时报告并在浏览器中打开
cargo report timings --open
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 子命令定义与 `-Z` 门控见 [src/bin/cargo/commands/report.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/report.rs)；报告生成与输出位置见 [src/cargo/ops/cargo_report/timings.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_report/timings.rs)。
- 特性说明（日志位置、启用方式）见上游 [src/doc/src/reference/unstable.md](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/doc/src/reference/unstable.md) 的 build-analysis 一节。
