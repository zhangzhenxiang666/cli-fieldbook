---
title: coolify context
command:
  - context
---
## 简介

管理 Coolify 上下文。一个上下文包含连接某个 Coolify 实例所需的配置（URL 与令牌），多实例场景可切换使用。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

收录子命令：[add](cli:command:context/add)、[delete](cli:command:context/delete)、[get](cli:command:context/get)、[list](cli:command:context/list)、[set-default](cli:command:context/set-default)、[set-token](cli:command:context/set-token)、[use](cli:command:context/use)、[verify](cli:command:context/verify)。`context update` 与 `context version` 未收录，见[来源与范围](../../reference/sources.md)。

源码：[S27](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/context/context.go)
