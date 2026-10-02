---
title: coolify service delete
command:
  - service
  - delete
---
## 简介

删除服务，可选清理关联的配置、卷与网络。

## 参数

### `uuid`

目标 UUID。

## 选项

### `--delete-configurations`

同时删除关联配置。

### `--delete-connected-networks`

同时删除已连接的网络。

### `--delete-volumes`

同时删除卷。

### `--docker-cleanup`

同时执行 Docker 清理。

### `--force`

跳过确认提示。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

默认有确认提示；清理范围旗标与 database delete 一致。

源码：[S77](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/service/delete.go)
