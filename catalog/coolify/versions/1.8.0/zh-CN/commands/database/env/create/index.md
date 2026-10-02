---
title: coolify database env create
command:
  - database
  - env
  - create
---
## 简介

为数据库创建一个环境变量，用 `--key` 与 `--value` 指定键值。

## 参数

### `database_uuid`

数据库 UUID。

## 选项

### `--comment`

环境变量的备注。

### `--help`

打印该命令的帮助。

### `--is-literal`

将值视为字面量（不做变量插值）。

### `--is-multiline`

值为多行文本。

### `--is-shown-once`

仅在部署后显示一次值。

### `--key`

环境变量键名（必需）。

### `--value`

环境变量的值（必需）。
