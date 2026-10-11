---
title: cargo git-checkout
command:
  - git-checkout
---

已移除的隐藏命令：保留命令名只为报错，运行即返回错误信息 "The `git-checkout` command has been removed."（源码原文）。

## 简介

`cargo git-checkout` 在该版本中已被移除，没有实际功能与专有选项。命令源码把帮助文本整体覆盖为上述移除说明，执行时直接以该消息报错退出。

## 源码补充

- 移除逻辑（`REMOVED` 常量、`override_help` 与报错退出）见 [src/bin/cargo/commands/git_checkout.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/git_checkout.rs)。
