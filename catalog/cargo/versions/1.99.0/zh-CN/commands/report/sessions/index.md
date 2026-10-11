---
title: cargo report sessions
command:
  - report
  - sessions
---

不稳定命令：按从新到旧列出先前构建会话的会话 ID，供其他 report 子命令引用。需 nightly cargo 并启用 `-Z build-analysis`。

## 简介

`cargo report sessions` 为不稳定命令，在稳定工具链上直接报错；需 nightly cargo 并启用 `-Z build-analysis`（跟踪 issue [rust-lang/cargo#15844](https://github.com/rust-lang/cargo/issues/15844)），也可按不稳定特性文档在配置中设置 `[unstable] build-analysis = true` 与 `[build.analysis] enabled = true`。

启用该特性后，cargo 会以 JSONL 格式把构建日志写入 `$CARGO_HOME/log/`，每次调用生成一个以唯一会话 ID 命名的日志文件。本命令扫描这些日志，按从新到旧列出会话 ID（列表打印到标准错误）；在工作区内运行时只列出与该工作区关联的会话。列出的 ID 可供 [cargo report timings](cli:command:report/timings) 与 [cargo report rebuilds](cli:command:report/rebuilds) 的 `--id` 使用。

没有可用日志时命令报错，并提示先用 `-Z build-analysis` 运行构建命令生成日志。清单路径可用继承的 `-m/--manifest-path` 指定（选项释义见 [cargo build](cli:command:build)）。

## 选项

### `--limit`

格式：`--limit <N>`。列出的会话数量上限。默认 `10`。源码要求 `N` 为不小于 1 的整数；还有更多会话未显示时，输出会提示用 `--limit N` 查看更多。

## 示例

```sh
# 列出最近 20 个构建会话的 ID
cargo report sessions --limit 20
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 子命令定义与 `-Z` 门控见 [src/bin/cargo/commands/report.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/report.rs)；列出逻辑见 [src/cargo/ops/cargo_report/sessions.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_report/sessions.rs)。
- 特性说明（日志位置、启用方式）见上游 [src/doc/src/reference/unstable.md](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/doc/src/reference/unstable.md) 的 build-analysis 一节。
