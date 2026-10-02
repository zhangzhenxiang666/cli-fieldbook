---
title: coolify app start
command:
  - app
  - start
---
## 简介

启动应用；实现上是发起一次部署。

## 参数

### `uuid`

目标 UUID。

## 选项

### `--force`

强制重新构建。

### `--help`

打印该命令的帮助。

### `--instant-deploy`

立即部署（跳过排队）。

## 使用提醒

#### 行为与限制

`--force` 强制重新构建，`--instant-deploy` 跳过部署队列立即执行。

源码：[S24](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/start.go)
