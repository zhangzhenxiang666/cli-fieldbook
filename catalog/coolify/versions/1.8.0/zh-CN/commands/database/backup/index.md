---
title: coolify database backup
command:
  - database
  - backup
---
## 简介

管理数据库备份：创建、更新、删除备份配置，查看与触发执行记录。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

收录子命令：[create](cli:command:database/backup/create)、[list](cli:command:database/backup/list)、[delete](cli:command:database/backup/delete)、[update](cli:command:database/backup/update)、[trigger](cli:command:database/backup/trigger)、[executions](cli:command:database/backup/executions)、[delete-execution](cli:command:database/backup/delete-execution)。

源码：[S43](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/database.go)
