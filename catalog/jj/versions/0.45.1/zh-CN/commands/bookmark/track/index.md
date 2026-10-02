---
title: jj bookmark track
command:
  - bookmark
  - track
---

## 简介

开始跟踪远端书签。

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

**注意：** 跟踪后，远端书签会导入为同名本地书签，后续 fetch 可更新它。

源码：[cli/src/commands/bookmark/track.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/track.rs)。
