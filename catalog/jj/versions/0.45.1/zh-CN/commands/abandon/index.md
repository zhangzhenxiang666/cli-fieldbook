---
title: jj abandon
command:
  - abandon
---

## 简介

放弃一个或多个修订，并把其后代变基到它们的父提交。

## 参数

### `REVSETS`

要放弃的修订集合；默认 @。也接受 -r 形式。

## 选项

### `--retain-bookmarks`

不删除指向被放弃修订的书签，而是把它们移到父修订。

### `--restore-descendants`

保持子提交的最终文件内容，而不是通常的差异重放行为。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 若放弃了工作副本提交，会创建新的空工作副本提交。放弃不是永久擦除对象；但后续清理可能缩小恢复窗口。

源码：[cli/src/commands/abandon.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/abandon.rs)。
