---
title: 资源模型与寻址
---

Coolify 的资源按「团队（team）→ 项目（project）→ 环境（environment）→ 资源」的层级组织。应用（application）、数据库（database）与一键服务（service）都挂在某个项目的某个环境之下；服务器（server）与网络目标（destination）是环境之外的基础设施对象，资源创建时需要引用它们。

## UUID 与名称

CLI 的绝大多数操作以 **UUID** 寻址：`app get <uuid>`、`database start <uuid>` 等。UUID 可从对应的 `list` 命令获得：

```sh
coolify app list --format json | jq -r '.[] | select(.name=="myapp") | .uuid'
```

部署类命令额外支持按**名称**寻址：[deploy name](../commands/deploy/name/index.md) 与 [deploy batch](../commands/deploy/batch/index.md) 会先拉取全部资源、按名称精确匹配出 UUID，再触发部署。名称不存在或不唯一时会报错，不会模糊匹配。

## 创建资源时的公共参数

创建应用、数据库或服务时，`--server-uuid` 与 `--project-uuid` 是公共的必需参数；目标环境用 `--environment-name`（按名称）或 `--environment-uuid`（按 UUID）指定。服务器有多个网络目标时还需 `--destination-uuid`。

## 环境变量与生命周期的归属

每组资源都有独立的 `env` 子命令组（[app env](../commands/app/env/index.md)、[database env](../commands/database/env/index.md)、[service env](../commands/service/env/index.md)），第一个参数总是资源 UUID；启停类命令（start/stop/restart）作用在资源整体上，服务会同时操作其全部容器。

源码：[S62](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/deployment/name.go) [S57](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/deployment/batch.go)
