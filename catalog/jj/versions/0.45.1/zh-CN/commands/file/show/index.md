---
title: jj file show
command:
  - file
  - show
---

## 简介

输出修订中文件的内容。

## 参数

### `FILESETS`

要输出的路径，目录会递归遍历。

## 选项

### `--revision`

内容来源修订；默认 @。

### `--template`

文件元数据模板，类型 TreeEntry；默认 templates.file_show。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

源码：[cli/src/commands/file/show.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/file/show.rs)。
