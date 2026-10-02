---
title: jj debug fileset
command:
  - debug
  - fileset
---

## 简介

解析 fileset 并显示内部表达式与 matcher。

## 参数

### `PATH`

fileset 表达式，不只是字面路径；建议加引号。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 开发者诊断接口，输出不保证稳定，不建议作为生产脚本协议。

源码：[cli/src/commands/debug/fileset.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/fileset.rs)。
