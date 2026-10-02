---
title: coolify service env sync
command:
  - service
  - env
  - sync
---
## 简介

把 .env 文件同步为服务的环境变量：更新已有键、创建缺失键。

## 参数

### `service_uuid`

服务 UUID。

## 选项

### `--build-time`

使同步的全部变量在构建期可用；默认开启。

### `--file`

.env 文件路径（必需）。

### `--help`

打印该命令的帮助。

### `--is-literal`

将全部值视为字面量（不做变量插值）。

### `--runtime`

使同步的全部变量在运行期可用；默认开启。

## 使用提醒

#### 行为与限制

`--file` 为必需。

源码：[S83](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/service/env/sync.go)
