---
title: jj redo
command:
  - redo
---

## 简介

重做最近被 undo 撤销的操作。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 与连续 undo 配合，按撤销 / 重做历史前后移动；恢复指定操作仍使用 op restore。

源码：[cli/src/commands/redo.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/redo.rs)。
