---
title: herdr status
command:
  - status
---

## 简介

查看客户端与运行中 server 的状态。

## 选项

### `--json`

输出 JSON，而不是默认的人类可读格式。具体结构以本命令为准，不假定都有 result 外层。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

本命令自身可执行；server/client 子命令可只查看一侧。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S16](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/status.rs)
