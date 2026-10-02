---
title: jj interdiff
command:
  - interdiff
---

## 简介

比较两个修订各自引入的修改，而非简单比较最终文件树。

## 参数

### `FILESETS`

只比较匹配文件。

## 选项

### `--from`

旧版本；若只指定 --to，此项默认 @。

### `--to`

新版本；若只指定 --from，此项默认 @。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 至少指定一个端点。会先对齐父修订再比较补丁，适合审查 rebase 前后的改动是否变化。

源码：[cli/src/commands/interdiff.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/interdiff.rs)。
