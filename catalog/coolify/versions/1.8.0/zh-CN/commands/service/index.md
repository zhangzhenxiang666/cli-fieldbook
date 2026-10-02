---
title: coolify service
command:
  - service
---
## 简介

管理 Coolify 一键服务（数据库、Redis、PostgreSQL 等官方模板服务）。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

收录主干子命令与 [env](cli:command:service/env) 子组；`application`、`database`、`clone`、`move`、`storage`、`tag`、`task` 未收录，见[来源与范围](../../reference/sources.md)。

源码：[S89](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/service/service.go)
