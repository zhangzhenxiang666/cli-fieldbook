---
title: cargo verify-project
command:
  - verify-project
---

隐藏命令，向标准输出打印 JSON `{"success":"true"}`，供编辑器等工具检查清单是否可加载。

## 简介

`cargo verify-project` 是隐藏命令（`--hide`，不出现在常规帮助中），面向 IDE／编辑器集成：按普通规则尝试加载工作区，成功时输出 `{"success":"true"}` 并正常退出。

清单无法加载时不输出 `success`，而是打印 `{"invalid":"<错误信息>"}` 并直接以退出码 `1` 退出（见[退出代码](../../reference/exit-codes.md)）。调用方只需解析这行 JSON 即可区分两种结果。

命令源码的 `about` 同时将其标注为 `DEPRECATED: Check correctness of crate manifest.` 并指向 [rust-lang/cargo#14679](https://github.com/rust-lang/cargo/issues/14679)；本快照没有该命令的 man 手册，以上行为依据命令源码归纳（见源码补充）。

清单路径可用继承的 `-m/--manifest-path` 指定（选项释义见 [cargo build](cli:command:build)）；其余均为全局选项，见 [cargo](cli:command:)。

## 源码补充

- 命令定义、成功／失败两条 JSON 输出路径见 [src/bin/cargo/commands/verify_project.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/verify_project.rs)。本快照未收录对应 man 手册，本页由该源码综合而成。
