---
title: jj bench revset
command:
  - bench
  - revset
---

## 简介

测试 revset 遍历 / 求值性能。

## 参数

### `REVISIONS`

一个或多个 revset；与 --file 二选一，必须提供一个来源。

## 选项

### `--file`

逐行读取 revset；忽略空行及以 # 开头的行。

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

**注意：** 需要 bench 特性；测试数据会影响性能统计，请勿直接用结果比较不同配置的环境。

源码：[cli/src/commands/bench/revset.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bench/revset.rs)。
