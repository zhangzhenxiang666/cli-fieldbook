---
title: jj bookmark delete
command:
  - bookmark
  - delete
---

## 简介

删除本地书签，并记录待推送到所跟踪远端的删除。

## 参数

### `NAMES`

要删除的书签名称模式，默认 glob。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 不会同时放弃提交。远端删除要到之后选中该书签的 push 才发生；只想本地忘记请用 bookmark forget。

源码：[cli/src/commands/bookmark/delete.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/delete.rs)。
