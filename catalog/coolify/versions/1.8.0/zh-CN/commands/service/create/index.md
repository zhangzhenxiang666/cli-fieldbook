---
title: coolify service create
command:
  - service
  - create
---
## 简介

创建指定类型的一键服务。

## 参数

### `type`

服务类型；可用 `--list-types` 查看全部可选值。

## 选项

### `--description`

服务描述。

### `--destination-uuid`

服务器存在多个网络目标时指定目标 UUID。

### `--docker-compose`

自定义 Docker Compose 内容（用于高级定制）。

### `--environment-name`

环境名称。

### `--environment-uuid`

环境 UUID。

### `--help`

打印该命令的帮助。

### `--instant-deploy`

创建后立即部署。

### `--list-types`

列出全部可用的服务类型。

### `--name`

服务名称。

### `--project-uuid`

项目 UUID（必需）。

### `--server-uuid`

服务器 UUID（必需）。

### `--tag`

要添加的标签，可重复传入。

### `--tags`

要添加的标签，逗号分隔。

## 使用提醒

#### 行为与限制

`--server-uuid`、`--project-uuid` 为必需；`--type` 可先用 `--list-types` 查看全部可选值；`--sub-service-name` 用于包含多个子应用的模板（如 wordpress-with-mysql）。

## 示例

```sh
coolify service create n8n --server-uuid=<uuid> --project-uuid=<uuid> --environment-name=production --instant-deploy
```

源码：[S76](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/service/create.go)
