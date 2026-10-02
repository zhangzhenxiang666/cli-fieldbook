---
title: jj operation diff
command:
  - operation
  - diff
---

## 简介

比较两次仓库操作的状态差异。

## 选项

### `--operation`

比较该操作与其父操作；别名 --op。

### `--from`

起点操作。

### `--to`

终点操作。

### `--no-graph`

不画操作差异中的提交图。

### `--patch`

显示经父修订对齐后的提交补丁差异。

### `--show-changes-in`

只显示这些修订的 change 差异；默认 revsets.op-diff-changes-in。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 比较的是操作前后仓库视图，不是 jj diff 的两个提交树。

源码：[cli/src/commands/operation/diff.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/operation/diff.rs)。
