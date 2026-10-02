---
title: jj arrange
command:
  - arrange
---

## 简介

交互式调整提交图。

## 参数

### `REVSETS`

要排列的修订；也接受 -r。默认使用 revsets.arrange。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 终端交互界面适合重排提交关系；改变依赖可能引入内容冲突。

源码：[cli/src/commands/arrange.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/arrange.rs)。
