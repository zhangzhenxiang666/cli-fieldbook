---
title: jj bookmark set
command:
  - bookmark
  - set
---

## 简介

按名称创建或更新书签。

## 参数

### `NAMES`

需要设置的书签名称。

## 选项

### `--revision`

目标修订；默认 @；别名 --to。

### `--allow-backwards`

允许把已有书签向后或横向移动。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 需要严格保证不创建新名称时，用 bookmark move。

源码：[cli/src/commands/bookmark/set.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/set.rs)。
