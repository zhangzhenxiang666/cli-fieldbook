---
title: coolify database delete
command:
  - database
  - delete
---
## 简介

删除数据库，可选清理关联的配置、卷与网络。

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

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

默认有确认提示；`--delete-configurations`、`--delete-volumes`、`--delete-connected-networks` 控制清理范围。

源码：[S44](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/delete.go)
