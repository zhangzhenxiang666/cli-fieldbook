---
title: jj bench common-ancestors
command:
  - bench
  - common-ancestors
---

## 简介

测试查找两个提交共同祖先的性能。

## 参数

### `REVISION1`

第一个修订。

### `REVISION2`

第二个修订。

## 选项

### `--save-baseline`

把结果保存到该基线名；默认 base；与 --baseline 互斥。

### `--baseline`

与已保存的基线比较；与 --save-baseline 互斥。

### `--sample-size`

采样次数；默认 100，最小 10。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 必须使用启用 bench 特性的构建；常规发布二进制不应假定提供此命令。

源码：[cli/src/commands/bench/common_ancestors.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bench/common_ancestors.rs)。
