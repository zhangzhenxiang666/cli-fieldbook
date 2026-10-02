---
title: coolify app env list
command:
  - app
  - env
  - list
---
## 简介

列出应用的全部环境变量；默认只显示非预览变量。

## 参数

### `app_uuid`

应用 UUID。

## 选项

### `--all`

显示全部环境变量（先列出非预览变量，再列出预览变量）。

### `--help`

打印该命令的帮助。

### `--preview`

显示预览环境变量而非常规变量。

## 使用提醒

#### 行为与限制

`--preview` 显示预览部署变量；`--all` 同时显示两组（先非预览，后预览）。

源码：[S16](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/env/list.go)
