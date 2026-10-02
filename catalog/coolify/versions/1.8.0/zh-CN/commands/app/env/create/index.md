---
title: coolify app env create
command:
  - app
  - env
  - create
---
## 简介

为应用创建一个环境变量，用 `--key` 与 `--value` 指定键值。

## 参数

### `app_uuid`

应用 UUID。

## 选项

### `--build-time`

构建期可用；默认开启。

### `--comment`

环境变量的备注。

### `--help`

打印该命令的帮助。

### `--is-literal`

将值视为字面量（不做变量插值）。

### `--is-multiline`

值为多行文本。

### `--key`

环境变量键名（必需）。

### `--preview`

在预览部署中可用。

### `--runtime`

运行期可用；默认开启。

### `--value`

环境变量的值（必需）。
