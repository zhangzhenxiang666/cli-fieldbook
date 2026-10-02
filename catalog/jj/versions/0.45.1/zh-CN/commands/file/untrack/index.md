---
title: jj file untrack
command:
  - file
  - untrack
---

## 简介

停止跟踪指定路径，但保留磁盘文件。

## 参数

### `FILESETS`

要停止跟踪的路径；必须已经被忽略，否则会被再次自动跟踪。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 先设置 .gitignore 等忽略规则，再执行。不要将其与删除历史中敏感数据混淆。

源码：[cli/src/commands/file/untrack.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/file/untrack.rs)。
