---
title: coolify database env update
command:
  - database
  - env
  - update
---
## 简介

更新数据库的一个已有环境变量，按 UUID 或键名定位。

## 参数

### `database_uuid`

数据库 UUID。

### `env_uuid_or_key`

环境变量的 UUID 或键名。

## 选项

### `--comment`

环境变量的备注。

### `--help`

打印该命令的帮助。

### `--is-literal`

将值视为字面量。

### `--is-multiline`

值为多行文本。

### `--is-shown-once`

仅在部署后显示一次值。

### `--key`

新的环境变量键名（用于重命名）。

### `--value`

新的环境变量值（必需）。
