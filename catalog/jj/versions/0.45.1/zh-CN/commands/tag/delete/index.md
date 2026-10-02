---
title: jj tag delete
command:
  - tag
  - delete
---

## 简介

删除本地标签，不 abandon 标签指向的提交。

## 参数

### `NAMES`

标签名模式，默认 glob。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

源码：[cli/src/commands/tag/delete.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/tag/delete.rs)。
