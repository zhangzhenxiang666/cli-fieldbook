---
title: coolify service env delete
command:
  - service
  - env
  - delete
---
## 简介

删除服务的一个环境变量。第一个 UUID 是服务，第二个是环境变量。

## 参数

### `service_uuid`

服务 UUID。

### `env_uuid`

环境变量 UUID。

## 选项

### `--force`

跳过确认提示。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

默认有确认提示，`--force` 跳过。

源码：[S79](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/service/env/delete.go)
