---
title: coolify app env update
command:
  - app
  - env
  - update
---
## 简介

更新应用的一个已有环境变量，按 UUID 或键名定位。

## 参数

### `app_uuid`

应用 UUID。

### `env_uuid_or_key`

环境变量的 UUID 或键名。

## 选项

### `--build-time`

构建期可用；默认开启。

### `--comment`

环境变量的备注。

### `--help`

打印该命令的帮助。

### `--is-literal`

将值视为字面量。

### `--is-multiline`

值为多行文本。

### `--key`

新的环境变量键名（用于重命名）。

### `--preview`

在预览部署中可用。

### `--runtime`

运行期可用；默认开启。

### `--value`

新的环境变量值（必需）。
