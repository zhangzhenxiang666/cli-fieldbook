---
title: jj debug stacked-table
command:
  - debug
  - stacked-table
---

## 简介

显示堆叠表的分层统计。

## 参数

### `DIR`

table store 目录。

## 选项

### `--key-size`

键长度，单位字节；必填。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 开发者诊断接口，输出不保证稳定，不建议作为生产脚本协议。

源码：[cli/src/commands/debug/stacked_table.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/stacked_table.rs)。
