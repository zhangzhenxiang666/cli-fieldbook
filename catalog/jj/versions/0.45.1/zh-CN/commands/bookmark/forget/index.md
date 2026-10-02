---
title: jj bookmark forget
command:
  - bookmark
  - forget
---

## 简介

忘记书签，不把本地删除传播到远端。

## 参数

### `NAMES`

要忘记的书签名称模式，默认 glob。

## 选项

### `--include-remotes`

同时忘记对应远端书签的本地记录；包括 Git-tracking 记录。远端真实存在时，下次 fetch 可重新出现。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 忘记本地书签会取消相应远端跟踪关系；此命令本身不删除远端分支。

源码：[cli/src/commands/bookmark/forget.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/forget.rs)。
