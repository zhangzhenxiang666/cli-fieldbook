---
title: coolify database backup delete
command:
  - database
  - backup
  - delete
---
## 简介

删除一条备份配置，可选同时删除其全部执行记录及 S3 上的备份文件。

## 参数

### `database_uuid`

数据库 UUID。

### `backup_uuid`

备份配置 UUID。

## 选项

### `--delete-s3`

同时删除 S3 中的备份文件。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

第一个 UUID 是数据库，第二个是备份配置。

源码：[S37](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/backup/delete.go)
