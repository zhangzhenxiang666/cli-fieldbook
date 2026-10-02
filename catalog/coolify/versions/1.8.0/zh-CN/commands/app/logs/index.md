---
title: coolify app logs
command:
  - app
  - logs
---
## 简介

查看应用日志；`--follow` 持续跟踪新输出。

## 参数

### `uuid`

目标 UUID。

## 选项

### `--follow`

跟随日志输出（类似 `tail -f`）。

### `--help`

打印该命令的帮助。

### `--lines`

获取的日志行数。

### `--service`

Docker Compose 服务名（在多服务应用中选择单个容器）。

### `--show-timestamps`

在日志输出中显示时间戳。

## 使用提醒

#### 行为与限制

多服务（Docker Compose）应用可用 `--service` 选择单个容器的日志。

源码：[S22](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/logs.go)
