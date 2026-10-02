---
title: coolify deploy cancel
command:
  - deploy
  - cancel
---
## 简介

取消一个进行中的部署：停止部署流程并清理临时资源。

## 参数

### `uuid`

要取消的部署 UUID。

## 选项

### `--force`

跳过确认提示。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

要求服务端版本不低于 `4.0.0-beta.436`；默认有确认提示，`--force` 跳过。

源码：[S58](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/deployment/cancel.go) [S59](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/deployment/deployment.go)
