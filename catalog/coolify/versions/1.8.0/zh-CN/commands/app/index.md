---
title: coolify app
command:
  - app
---
## 简介

管理 Coolify 应用：列表、详情、创建、删除、启停与日志等生命周期操作。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

收录主干子命令与 [create](cli:command:app/create)、[env](cli:command:app/env)、[rollback](cli:command:app/rollback) 三个子组；`clone`、`move`、`update`、`deployments`、`previews`、`storage`、`tag`、`task` 等未收录，见[来源与范围](../../reference/sources.md)。

源码：[S05](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/application.go)
