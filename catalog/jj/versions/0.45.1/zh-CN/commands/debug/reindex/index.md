---
title: jj debug reindex
command:
  - debug
  - reindex
---

## 简介

重建提交索引。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 开发者诊断接口，输出不保证稳定，不建议作为生产脚本协议。会重新初始化并写入索引；遇到疑似损坏时先备份，不要当作常规整理命令。

源码：[cli/src/commands/debug/reindex.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/reindex.rs)。
