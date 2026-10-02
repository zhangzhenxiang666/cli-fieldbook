---
title: herdr server
command:
  - server
---

## 简介

运行或控制无界面后台 server。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

直接运行启动 headless server。普通 TUI 客户端退出、detach 与 server stop 是不同操作。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S13](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/server.rs)
