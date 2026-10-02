---
title: jj bookmark move
command:
  - bookmark
  - move
---

## 简介

移动已有书签，不创建新书签。

## 参数

### `NAMES`

要移动的书签名称模式；与 --from 同用时，进一步过滤该范围内的书签。

## 选项

### `--from`

选择目前指向这些修订的书签，可重复。

### `--to`

目标修订；默认 @。

### `--allow-backwards`

允许向后或横向移动，不局限于后代方向。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

源码：[cli/src/commands/bookmark/move.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/move.rs)。
