---
title: jj util snapshot
command:
  - util
  - snapshot
---

## 简介

显式快照工作副本。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 绝大部分常规命令会自动快照，因此主要用于脚本中隔离“外部文件改动”和“后续 jj 操作”的操作记录；本命令不输出 operation ID。

源码：[cli/src/commands/util/snapshot.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/util/snapshot.rs)。
