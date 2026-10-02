---
title: jj debug object operation
command:
  - debug
  - object
  - operation
---

## 简介

打印操作对象内部结构。

## 参数

### `ID`

完整十六进制对象 ID；不是普通 revset 或可任意缩写的 change ID。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../../concepts/global-options.md)。

**注意：** 开发者诊断接口，输出不保证稳定，不建议作为生产脚本协议。

源码：[cli/src/commands/debug/object.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/object.rs)。
