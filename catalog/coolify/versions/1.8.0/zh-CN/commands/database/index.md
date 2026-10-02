---
title: coolify database
command:
  - database
---
## 简介

管理 Coolify 数据库（PostgreSQL、MySQL、MongoDB、Redis、MariaDB、KeyDB、Clickhouse、Dragonfly）。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

收录主干子命令与 [backup](cli:command:database/backup)、[env](cli:command:database/env) 两个子组；`clone`、`move`、`update`、`storage`、`tag` 未收录，见[来源与范围](../../reference/sources.md)。

源码：[S43](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/database.go)
