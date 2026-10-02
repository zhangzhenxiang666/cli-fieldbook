---
title: jj status
command:
  - status
---

## 简介

显示工作修改、工作修订及其父、文件冲突与书签冲突。

## 参数

### `FILESETS`

限制文件状态展示范围。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 状态命令通常会先快照工作副本。没有 Git staging area，不存在配套的 jj add。

源码：[cli/src/commands/status.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/status.rs)。
