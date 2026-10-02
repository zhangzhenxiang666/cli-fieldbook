---
title: herdr terminal
command:
  - terminal
---

## 简介

附着或观察底层终端流。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

terminal 是 pane 承载的终端实例；不是外层终端模拟器窗口。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S03](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli.rs)
