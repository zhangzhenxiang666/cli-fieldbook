---
title: jj workspace update-stale
command:
  - workspace
  - update-stale
---

## 简介

刷新因其他工作区 / 操作变化而过时的当前工作副本。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 多工作区共享仓库，但工作区磁盘文件不是即时同步；先确认没有需要另行保留的编辑内容。

源码：[cli/src/commands/workspace/update_stale.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/workspace/update_stale.rs)。
