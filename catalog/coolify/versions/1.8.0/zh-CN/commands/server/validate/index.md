---
title: coolify server validate
command:
  - server
  - validate
---
## 简介

校验服务器连接与 Docker 环境是否可用。

## 参数

### `uuid`

目标 UUID。

## 选项

### `--help`

打印该命令的帮助。

### `--install`

安装缺失的前置依赖与 Docker（可能重启 Docker）。

## 使用提醒

#### 行为与限制

`--install` 会在缺少前置依赖时尝试安装（可能重启 Docker）。

源码：[S75](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/server/validate.go)
