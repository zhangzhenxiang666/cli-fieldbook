---
title: coolify deploy uuid
command:
  - deploy
  - uuid
---
## 简介

按 UUID 部署资源。

## 参数

### `uuid`

要部署的资源 UUID。

## 选项

### `--docker-tag`

覆盖本次部署使用的镜像标签。

### `--force`

强制部署。

### `--help`

打印该命令的帮助。

### `--pull-request-id`

预览部署的 Pull Request ID。

## 使用提醒

#### 行为与限制

`--docker-tag` 要求服务端版本不低于 `4.0.0-beta.471`，低于该版本时命令会在发起部署前报错。

源码：[S63](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/deployment/uuid.go) [S59](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/deployment/deployment.go)
