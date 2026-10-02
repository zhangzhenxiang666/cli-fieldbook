---
title: jj debug revset
command:
  - debug
  - revset
---

## 简介

解析、优化并求值 revset，显示各阶段以及完整 commit ID。

## 参数

### `REVISION`

revset 表达式。

## 选项

### `--no-resolve`

不解析符号、不求值；可只观察解析 / 优化结构。

### `--no-optimize`

不改写为优化后的表达式。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 开发者诊断接口，输出不保证稳定，不建议作为生产脚本协议。

源码：[cli/src/commands/debug/revset.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/revset.rs)。
