---
title: jj undo
command:
  - undo
---

## 简介

撤销最近一次操作；连续运行可继续向更早的状态回退。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 与 redo 配对。v0.45.1 的 undo 不接受一个操作 ID 作为位置参数；指定操作用 op restore / op revert。

源码：[cli/src/commands/undo.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/undo.rs)。
