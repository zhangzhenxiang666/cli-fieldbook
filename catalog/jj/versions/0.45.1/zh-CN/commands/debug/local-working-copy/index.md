---
title: jj debug local-working-copy
command:
  - debug
  - local-working-copy
---

## 简介

显示本地磁盘工作副本的操作、树及逐文件缓存状态。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 开发者诊断接口，输出不保证稳定，不建议作为生产脚本协议。要求标准 local-disk working copy；加载 helper 时可能快照。

源码：[cli/src/commands/debug/local_working_copy.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/local_working_copy.rs)。
