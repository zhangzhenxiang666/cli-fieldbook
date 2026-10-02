---
title: coolify app delete
command:
  - app
  - delete
---
## 简介

删除应用。此操作不可撤销。

## 参数

### `uuid`

目标 UUID。

## 选项

### `--force`

跳过确认提示。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

默认有确认提示，`-f` 跳过确认；`--delete-configurations`、`--delete-volumes`、`--delete-connected-networks` 控制关联资源的清理范围。

源码：[S12](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/delete.go)
