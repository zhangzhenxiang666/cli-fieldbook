---
title: jj debug snapshot
command:
  - debug
  - snapshot
---

## 简介

【已弃用】显式触发工作副本快照。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 开发者诊断接口，输出不保证稳定，不建议作为生产脚本协议。v0.45.1 源码仍保留入口并发出弃用警告；替代命令为 jj util snapshot。

源码：[cli/src/commands/debug/snapshot.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/snapshot.rs)。
