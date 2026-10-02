---
title: jj sparse set
command:
  - sparse
  - set
---

## 简介

增删当前工作副本的稀疏路径模式。

## 选项

### `--add`

加入路径模式；可重复。

### `--remove`

移除路径模式；可重复。

### `--clear`

先清空模式；常与 --add 组合。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 例如 jj sparse set --clear --add README.md --add lib。不要与 .gitignore 或 snapshot.auto-track 混淆。

源码：[cli/src/commands/sparse/set.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/sparse/set.rs)。
