---
title: jj debug copy-detection
command:
  - debug
  - copy-detection
---

## 简介

显示修订相对其父中检测出的文件复制记录。

## 参数

### `REVSET`

要检查的单个修订；默认 @。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 开发者诊断接口，输出不保证稳定，不建议作为生产脚本协议。

源码：[cli/src/commands/debug/copy_detection.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/copy_detection.rs)。
