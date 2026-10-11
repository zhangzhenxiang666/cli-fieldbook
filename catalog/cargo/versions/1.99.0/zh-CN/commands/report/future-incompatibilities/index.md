---
title: cargo report future-incompatibilities
command:
  - report
  - future-incompatibilities
---

显示先前构建保存的 future-incompat（未来不兼容）警告报告。内置别名 `future-incompat`。

## 简介

`cargo report future-incompatibilities` 显示先前构建过程中产生的未来不兼容警告报告：这些警告指向的变更可能在未来的 rustc 版本中变成硬错误，导致依赖停止编译。构建（如 [cargo build](cli:command:build)）结束时若发现此类警告，会打印一条提示，指引重新构建时加 `--future-incompat-report`，或运行本命令查看完整报告。

本命令读取的正是这些由先前 Cargo 命令调用保存下来的报告：不带 `--id` 时显示最近一份；`--id` 指定某次调用生成的报告编号。可用 `-p/--package` 只显示某个包的报告（包选择选项在 [cargo build](cli:command:build) 释义）。

报告通知的显示频率可通过配置 `[future-incompat-report]` 的 `frequency`（取值 `always`、`never`）调整。该子命令为稳定功能，无需 nightly 或 `-Z` 旗标。

## 选项

### `--id`

格式：`--id <id>`。显示指定 Cargo 生成编号的报告；未指定时显示最近一份。

## 环境变量

- `CARGO_FUTURE_INCOMPAT_REPORT_FREQUENCY`：控制 future-incompat 报告通知的频率，对应配置 `future-incompat-report.frequency`。

完整清单见[环境变量](../../../reference/environment.md)。

## 示例

```sh
# 显示最近一份 future-incompat 报告
cargo report future-incompat

# 只显示某个包的报告
cargo report future-incompat --package my-dep@0.0.1

# 按编号显示历史报告
cargo report future-incompat --id 1
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 子命令定义与报告加载（`OnDiskReports`、缺省取最近编号）见 [src/bin/cargo/commands/report.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/report.rs)。
- 概念与工作流见上游参考 [src/doc/src/reference/future-incompat-report.md](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/doc/src/reference/future-incompat-report.md)。
