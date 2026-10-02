---
title: jj git import
command:
  - git
  - import
---

## 简介

把 Git 后端的引用变化导入 jj。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 并置仓库通常自动导入；这不是网络 fetch。v0.45.1 中非并置仓库不会把 detached Git HEAD 自动当作工作副本导入。

源码：[cli/src/commands/git/import.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/import.rs)。
