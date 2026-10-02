---
title: coolify server add
command:
  - server
  - add
---
## 简介

添加一个已有 Docker 环境的服务器：名称、IP 与已登记的私钥 UUID。

## 参数

### `server_name`

服务器名称。

### `ip_address`

服务器 IP 地址。

### `private_key_uuid`

已在 Coolify 中登记的私钥 UUID。

## 选项

### `--help`

打印该命令的帮助。

### `--port`

端口。

### `--user`

用户。

### `--validate`

校验该服务器。

## 使用提醒

#### 行为与限制

私钥需先在 Coolify 控制台或经 `private-key` 命令组登记（该命令组未收录本手册）。

源码：[S70](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/server/add.go)
