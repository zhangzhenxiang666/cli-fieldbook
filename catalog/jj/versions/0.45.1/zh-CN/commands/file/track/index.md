---
title: jj file track
command:
  - file
  - track
---

## 简介

让指定路径开始被当前工作副本跟踪。

## 参数

### `FILESETS`

要开始跟踪的路径。

## 选项

### `--include-ignored`

显式跟踪匹配路径，即使它们被 .gitignore 忽略或超过 snapshot.max-new-file-size。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** v0.45.1 源码的说明文字声称可省略路径，但实际 clap 声明 required=true。此手册按参数解析器要求写为必填；需要全部文件时使用 jj file track 'all()'。

源码：[cli/src/commands/file/track.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/file/track.rs)。
