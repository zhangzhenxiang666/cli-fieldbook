---
title: coolify app env
command:
  - app
  - env
---
## 简介

管理应用的环境变量。所有子命令的第一个参数都是应用 UUID。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

收录子命令：[create](cli:command:app/env/create)、[delete](cli:command:app/env/delete)、[get](cli:command:app/env/get)、[list](cli:command:app/env/list)、[sync](cli:command:app/env/sync)、[update](cli:command:app/env/update)。环境变量语义参见[环境变量体系](../../../concepts/environment-variables.md)。

源码：[S05](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/application.go)
