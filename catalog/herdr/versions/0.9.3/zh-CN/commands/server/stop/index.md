---
title: herdr server stop
command:
  - server
  - stop
---

## 简介

停止当前目标 server。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

破坏性操作：其托管的终端及进程会受影响；不要把它当成 detach。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S13](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/server.rs)
