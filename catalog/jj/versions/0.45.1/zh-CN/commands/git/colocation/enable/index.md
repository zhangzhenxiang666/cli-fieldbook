---
title: jj git colocation enable
command:
  - git
  - colocation
  - enable
---

## 简介

启用并置，使 Git 工具能够在当前工作区识别 .git。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../../concepts/global-options.md)。

**注意：** v0.45.1 仅支持主工作区；额外 workspace 不支持 Git colocation。

源码：[cli/src/commands/git/colocation.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/colocation.rs)。
