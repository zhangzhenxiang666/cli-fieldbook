---
title: coolify database env delete
command:
  - database
  - env
  - delete
---
## 简介

删除数据库的一个环境变量。第一个 UUID 是数据库，第二个是环境变量。

## 参数

### `database_uuid`

数据库 UUID。

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

源码：[S46](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/env/delete.go)
