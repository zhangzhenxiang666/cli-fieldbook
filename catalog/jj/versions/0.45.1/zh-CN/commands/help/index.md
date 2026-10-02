---
title: jj help
command:
  - help
---

## 简介

显示指定命令路径的帮助，或打开关键字文档。

## 参数

### `COMMAND`

子命令路径，例如 git push；完整写法 jj help git push。

## 选项

### `--keyword`

文档主题：bookmarks、config、filesets、glossary、revsets、templates、tutorial。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** jj <命令> --help 是长帮助；-h 是短帮助。不要假定 jj git help push 也受支持。

源码：[cli/src/commands/help.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/help.rs)。
