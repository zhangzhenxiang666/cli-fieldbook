---
title: jj operation integrate
command:
  - operation
  - integrate
---

## 简介

把先前未整合的操作并入当前操作头。

## 参数

### `OPERATION`

待整合操作 ID；已整合时无需重复动作。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 常与 --no-integrate-operation 搭配；相当于把操作产生的仓库变化并回当前状态，不是 push。

源码：[cli/src/commands/operation/integrate.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/operation/integrate.rs)。
