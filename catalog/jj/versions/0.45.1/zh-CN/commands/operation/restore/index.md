---
title: jj operation restore
command:
  - operation
  - restore
---

## 简介

把仓库视图恢复到某次操作后的状态。

## 参数

### `OPERATION`

目标操作 ID / 表达式。

## 选项

### `--what`

选择恢复部分，可重复：repo（仓库 / 本地引用）、remote-tracking（缓存的远端跟踪状态）；默认二者都恢复，属于实验性选项。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 会创建新的操作记录，不会替你撤回已执行的远端 push，也不会保证恢复任意外部文件。仅恢复 repo 可保留对远端当前状态的记忆。

源码：[cli/src/commands/operation/restore.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/operation/restore.rs)。
