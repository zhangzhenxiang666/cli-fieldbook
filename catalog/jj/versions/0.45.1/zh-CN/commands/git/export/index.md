---
title: jj git export
command:
  - git
  - export
---

## 简介

把 jj 的引用状态导出到 Git 后端。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 并置仓库通常会自动导出；这是同步本地 Git 引用，不是推送到服务器。配合 --ignore-working-copy 可显式控制自动互操作。

源码：[cli/src/commands/git/export.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/export.rs)。
