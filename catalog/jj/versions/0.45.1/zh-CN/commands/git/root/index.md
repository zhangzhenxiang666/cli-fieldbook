---
title: jj git root
command:
  - git
  - root
---

## 简介

输出 Git 后端目录路径。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 与 jj root / jj workspace root 不同：这里返回后端 Git 目录，而不是工作区根目录。

源码：[cli/src/commands/git/root.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/root.rs)。
