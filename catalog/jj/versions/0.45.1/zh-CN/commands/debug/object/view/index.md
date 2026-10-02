---
title: jj debug object view
command:
  - debug
  - object
  - view
---

## 简介

打印仓库 view 对象。

## 参数

### `ID`

完整十六进制 view ID；与 --op 二选一，必须提供其一。

## 选项

### `--op`

使用该操作引用的 view；这里接受操作表达式。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../../concepts/global-options.md)。

**注意：** 开发者诊断接口，输出不保证稳定，不建议作为生产脚本协议。

源码：[cli/src/commands/debug/object.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/object.rs)。
