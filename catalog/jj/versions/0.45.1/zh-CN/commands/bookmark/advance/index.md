---
title: jj bookmark advance
command:
  - bookmark
  - advance
---

## 简介

把离目标最近的书签向前推进。

## 参数

### `NAMES`

指定书签名称模式；指定后不使用默认 from revset 选择书签。

## 选项

### `--to`

目标修订；来自 revsets.bookmark-advance-to，内置默认 @。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 未指定名称时，候选来自 revsets.bookmark-advance-from，内置默认 heads(::to & bookmarks())；to 在该表达式中可用。

源码：[cli/src/commands/bookmark/advance.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/advance.rs)。
