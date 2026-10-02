---
title: herdr terminal attach
command:
  - terminal
  - attach
---

## 简介

直接附着到底层终端。

## 参数

### `TERMINAL_ID`

底层终端 ID；不要把 workspace/tab ID 填到这里。

## 选项

### `--takeover`

显式接管现有写入控制权。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

交互式命令；退出附着为 Ctrl+B 然后 q。退出附着不等于终止终端进程。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S03](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli.rs)
