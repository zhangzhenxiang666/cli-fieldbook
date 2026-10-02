---
title: jj file annotate
command:
  - file
  - annotate
---

## 简介

逐行显示目标文件内容来自哪个 change。

## 参数

### `PATH`

单个文件路径。

## 选项

### `--revision`

追踪起点修订；省略时使用工作副本。

### `--template`

逐行输出模板，类型 AnnotationLine；默认 templates.file_annotate。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

源码：[cli/src/commands/file/annotate.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/file/annotate.rs)。
