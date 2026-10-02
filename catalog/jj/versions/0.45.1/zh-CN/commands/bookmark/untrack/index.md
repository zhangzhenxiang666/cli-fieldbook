---
title: jj bookmark untrack
command:
  - bookmark
  - untrack
---

## 简介

停止跟踪远端书签。

## 参数

### `BOOKMARK@REMOTE`

BOOKMARK 是名称模式（默认 glob）；BOOKMARK\@REMOTE 是精确的远端书签符号。

## 选项

### `--remote`

按远端名称模式过滤，可重复。省略时作用于所有名称匹配的远端书签。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 停止跟踪不会删除本地书签，也不会删除服务器上的分支。

源码：[cli/src/commands/bookmark/untrack.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/untrack.rs)。
