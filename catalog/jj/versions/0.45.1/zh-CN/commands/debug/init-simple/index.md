---
title: jj debug init-simple
command:
  - debug
  - init-simple
---

## 简介

初始化概念验证用的 simple 后端仓库。

## 参数

### `DESTINATION`

目标目录，默认 .。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 开发者诊断接口，输出不保证稳定，不建议作为生产脚本协议。不支持 clone / fetch / push；不是日常 Git 项目的初始化方式。拒绝 --no-integrate-operation、--ignore-working-copy、--at-op。

源码：[cli/src/commands/debug/init_simple.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/init_simple.rs)。
