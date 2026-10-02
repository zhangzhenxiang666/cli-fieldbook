---
title: jj edit
command:
  - edit
---

## 简介

直接把已有修订设为当前工作副本修订。

## 参数

### `REVSET`

要编辑的单个修订，必填；支持 -r。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 接下来写文件就是改写该 change；其后代通常跟随变基。增量修复常可用 new + squash，避免直接改历史。

源码：[cli/src/commands/edit.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/edit.rs)。
