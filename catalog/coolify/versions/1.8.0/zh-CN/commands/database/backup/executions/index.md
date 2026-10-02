---
title: coolify database backup executions
command:
  - database
  - backup
  - executions
---
## 简介

列出某条备份配置的全部执行记录。

## 参数

### `database_uuid`

数据库 UUID。

### `backup_uuid`

备份配置 UUID。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

第一个 UUID 是数据库，第二个是备份配置。

源码：[S38](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/backup/execution.go)
