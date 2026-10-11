---
title: cargo report
command:
  - report
---

`cargo report` 命令族入口：显示保存在本地的各类构建报告。

## 简介

用法形如 `cargo report <type>`，必须携带一个子命令（`subcommand_required`）；不带子命令运行时直接显示帮助。命令的 `after_help` 提示运行 `cargo help report` 查看更多信息。命令组自身没有专有选项，可用的均为全局选项（见 [cargo](cli:command:)）。

子命令一览：

- [cargo report future-incompatibilities](cli:command:report/future-incompatibilities)：显示先前构建保存的 future-incompat 报告，内置别名 `future-incompat`。
- [cargo report timings](cli:command:report/timings)：由先前构建会话的日志生成 HTML 耗时报告（不稳定）。
- [cargo report sessions](cli:command:report/sessions)：列出先前构建会话的会话 ID（不稳定）。
- [cargo report rebuilds](cli:command:report/rebuilds)：报告先前会话中触发重新构建的原因（不稳定）。

man 手册的 DESCRIPTION 只提到目前支持 `future-incompat`；其余三个子命令存在于源码中，但受 `-Z build-analysis` 门控，详见各子命令页。

## 示例

```sh
# 查看可用的报告类型
cargo report --help

# 显示最近一份 future-incompat 报告
cargo report future-incompat
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令组定义（子命令注册与分发）见 [src/bin/cargo/commands/report.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/report.rs)。
