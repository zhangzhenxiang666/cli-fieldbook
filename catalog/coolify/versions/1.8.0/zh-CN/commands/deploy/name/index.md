---
title: coolify deploy name
command:
  - deploy
  - name
---
## 简介

按资源名称部署：先在全部资源中按名称匹配，再对匹配到的 UUID 触发部署。

## 参数

### `resource_name`

资源名称；CLI 先按名称查找资源，再对匹配项触发部署。

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

名称不唯一或不存在时报错；`--docker-tag` 同样要求服务端不低于 `4.0.0-beta.471`。

源码：[S62](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/deployment/name.go) [S59](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/deployment/deployment.go)
