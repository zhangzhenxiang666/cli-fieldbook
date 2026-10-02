---
title: coolify database env
command:
  - database
  - env
---
## 简介

管理数据库的环境变量。所有子命令的第一个参数都是数据库 UUID。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

收录子命令与 [app env](cli:command:app/env) 一致：create、delete、get、list、sync、update。

源码：[S43](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/database.go)
