---
title: cargo report rebuilds
command:
  - report
  - rebuilds
---

不稳定命令：报告先前构建会话中各目标被重新构建的原因，用于诊断意外的重复编译。需 nightly cargo 并启用 `-Z build-analysis`。

## 简介

`cargo report rebuilds` 为不稳定命令，在稳定工具链上直接报错；需 nightly cargo 并启用 `-Z build-analysis`（跟踪 issue [rust-lang/cargo#15844](https://github.com/rust-lang/cargo/issues/15844)），也可按不稳定特性文档在配置中设置 `[unstable] build-analysis = true` 与 `[build.analysis] enabled = true`。

本命令读取启用该特性后由构建命令写入 `$CARGO_HOME/log/` 的会话日志（JSONL，每次调用一个以会话 ID 命名的文件），分析其中记录的指纹状态，汇总该会话里哪些目标被重新构建以及原因（如依赖变更、文件改动等触发重新编译的指纹项），帮助定位“为什么又编译了一遍”这类问题。

没有可用日志时命令报错，并提示先用 `-Z build-analysis` 运行构建命令；`--id` 指定的会话不存在时报错并提示运行 [cargo report sessions](cli:command:report/sessions) 列出可用会话。清单路径可用继承的 `-m/--manifest-path` 指定（选项释义见 [cargo build](cli:command:build)）。

## 选项

### `--id`

格式：`--id <ID>`。要报告的会话 ID；未指定时使用最近一次会话。

## 示例

```sh
# 分析最近一次会话的重新构建原因
cargo report rebuilds
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 子命令定义与 `-Z` 门控见 [src/bin/cargo/commands/report.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/report.rs)；分析与展示逻辑见 [src/cargo/ops/cargo_report/rebuilds.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_report/rebuilds.rs)。
- 特性说明（日志位置、启用方式）见上游 [src/doc/src/reference/unstable.md](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/doc/src/reference/unstable.md) 的 build-analysis 一节。
