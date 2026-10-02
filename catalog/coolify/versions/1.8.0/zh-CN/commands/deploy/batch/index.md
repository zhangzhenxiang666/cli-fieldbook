---
title: coolify deploy batch
command:
  - deploy
  - batch
---
## 简介

批量部署多个资源。资源名称以逗号分隔传入，逐个解析后依次触发部署。

## 参数

### `name1,name2,...`

逗号分隔的多个资源名称。

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

空名称会被跳过；全部为空时报错。`--docker-tag` 要求服务端不低于 `4.0.0-beta.471`。

## 示例

```sh
coolify deploy batch app1,app2,app3
```

源码：[S57](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/deployment/batch.go) [S59](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/deployment/deployment.go)
