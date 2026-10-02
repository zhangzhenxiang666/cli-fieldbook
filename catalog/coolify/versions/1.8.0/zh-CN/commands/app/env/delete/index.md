---
title: coolify app env delete
command:
  - app
  - env
  - delete
---
## 简介

删除应用的一个环境变量。第一个 UUID 是应用，第二个是要删除的环境变量。

## 参数

### `app_uuid`

应用 UUID。

### `env_uuid`

环境变量 UUID。

## 选项

### `--force`

跳过确认提示。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

默认有确认提示，`--force` 跳过。

源码：[S14](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/env/delete.go)
