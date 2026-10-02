---
title: jj parallelize
command:
  - parallelize
---

## 简介

把指定修订整理为并行的兄弟变化。

## 参数

### `REVSETS`

要并行化的修订；也可用隐藏 -r。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 保留集合外所需的依赖关系；选择不连续修订时，可能无法移除中间依赖，结果可能无变化。

源码：[cli/src/commands/parallelize.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/parallelize.rs)。
