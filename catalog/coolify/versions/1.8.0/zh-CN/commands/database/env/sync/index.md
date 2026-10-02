---
title: coolify database env sync
command:
  - database
  - env
  - sync
---
## 简介

把 .env 文件同步为数据库的环境变量：更新已有键、创建缺失键。

## 参数

### `database_uuid`

数据库 UUID。

## 选项

### `--file`

.env 文件路径（必需）。

### `--help`

打印该命令的帮助。

### `--is-literal`

将全部值视为字面量（不做变量插值）。

## 使用提醒

#### 行为与限制

`--file` 为必需。

源码：[S49](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/env/sync.go)
