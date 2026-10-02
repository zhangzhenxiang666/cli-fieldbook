---
title: jj file search
command:
  - file
  - search
---

## 简介

在指定修订的文件中按行搜索内容。

## 参数

### `FILESETS`

只搜索匹配文件，省略时搜索全部。

## 选项

### `--revision`

被搜索修订；默认 @。

### `--pattern`

必填。字符串模式 kind:pattern；省略 kind 默认 regex。glob 要匹配整行，包含 foo 可写 glob:*foo*。

### `--name-only`

只输出包含匹配项的文件路径。

### `--line-number`

为匹配行增加从 1 开始的行号。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 这是版本内容搜索，不会自动搜索历史中的每一个修订。

源码：[cli/src/commands/file/search.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/file/search.rs)。
