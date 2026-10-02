---
title: jj util markdown-help
command:
  - util
  - markdown-help
---

## 简介

向标准输出生成全部公开子命令的 Markdown 帮助。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 它使用 clap-markdown，排版及收录范围不完全等于逐个 jj --help；隐藏命令仍需单独检查。

源码：[cli/src/commands/util/markdown_help.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/util/markdown_help.rs)。
