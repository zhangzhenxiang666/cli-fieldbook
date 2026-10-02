---
title: jj workspace forget
command:
  - workspace
  - forget
---

## 简介

不再跟踪指定工作区的工作 change。

## 参数

### `WORKSPACES`

工作区名称；省略时忘记当前工作区。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 不会删除磁盘目录；目录删除是另一个动作。

源码：[cli/src/commands/workspace/forget.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/workspace/forget.rs)。
