---
title: coolify app create
command:
  - app
  - create
---
## 简介

从不同来源创建应用的命令组：公共仓库、GitHub App 私有仓库、SSH deploy key 私有仓库、Dockerfile 内容或现成镜像。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

收录子命令：[public](cli:command:app/create/public)、[github](cli:command:app/create/github)、[deploy-key](cli:command:app/create/deploy-key)、[dockerfile](cli:command:app/create/dockerfile)、[dockerimage](cli:command:app/create/dockerimage)。

源码：[S06](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/create/create.go)
