---
title: jj next
command:
  - next
---

## 简介

沿 后继 方向移动工作位置。

## 参数

### `OFFSET`

移动层数，默认 1；遇到多个候选可能需要交互选择。

## 选项

### `--edit`

直接编辑目标修订。

### `--no-edit`

在目标修订上创建新的空 change。

### `--conflict`

沿后继方向寻找冲突修订。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 默认行为受 ui.movement.edit 控制，内置为 false：不是无条件 checkout 目标，而是创建新工作 change。需要确定性切换时用 jj edit `<revision>`。

源码：[cli/src/commands/next.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/next.rs)。
