---
title: coolify database backup delete-execution
command:
  - database
  - backup
  - delete-execution
---
## 简介

删除一条备份执行记录，可选同时删除 S3 上的文件。

## 参数

### `database_uuid`

数据库 UUID。

### `backup_uuid`

备份配置 UUID。

### `execution_uuid`

备份执行记录 UUID。

## 选项

### `--delete-s3`

同时删除 S3 中的备份文件。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

第一个 UUID 是数据库，第二个是备份配置，第三个是执行记录。

源码：[S36](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/backup/delete-execution.go)
