---
title: jj debug watchman query-changed-files
command:
  - debug
  - watchman
  - query-changed-files
---

## 简介

查询 Watchman 报告的变化文件。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../../concepts/global-options.md)。

**注意：** 开发者诊断接口，输出不保证稳定，不建议作为生产脚本协议。命令枚举仍存在，但二进制未编译 watchman 特性时执行会报错；reset-clock 会修改工作副本状态。

源码：[cli/src/commands/debug/watchman.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/watchman.rs)。
