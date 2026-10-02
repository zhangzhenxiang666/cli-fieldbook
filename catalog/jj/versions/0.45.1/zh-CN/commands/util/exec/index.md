---
title: jj util exec
command:
  - util
  - exec
---

## 简介

在 jj 上下文中执行外部程序。

## 参数

### `COMMAND`

外部可执行程序。

### `ARGS`

外部参数；建议用 -- 隔开。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 提供 JJ_WORKSPACE_ROOT，常用于自定义 alias；不是安全沙箱，任意脚本可能产生 jj undo 无法恢复的副作用。

源码：[cli/src/commands/util/exec.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/util/exec.rs)。
