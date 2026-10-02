---
title: jj tag set
command:
  - tag
  - set
---

## 简介

创建或移动标签。

## 参数

### `NAMES`

要设置的标签名称。

## 选项

### `--revision`

目标修订；默认 @；别名 --to。

### `--allow-move`

允许移动已经存在的标签。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 标签移动可能破坏使用者对发布版本的预期；默认不允许无提示移动。

源码：[cli/src/commands/tag/set.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/tag/set.rs)。
