---
title: jj file list
command:
  - file
  - list
---

## 简介

列出修订中的文件。

## 参数

### `FILESETS`

只列出匹配路径；省略时列出全部。

## 选项

### `--revision`

修订；默认 @。

### `--template`

文件条目模板，类型 TreeEntry；默认 templates.file_list。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

源码：[cli/src/commands/file/list.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/file/list.rs)。
