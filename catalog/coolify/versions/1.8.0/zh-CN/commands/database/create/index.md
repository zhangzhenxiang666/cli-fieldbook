---
title: coolify database create
command:
  - database
  - create
---
## 简介

创建指定类型的数据库。

## 参数

### `type`

数据库类型：`postgresql`、`mysql`、`mariadb`、`mongodb`、`redis`、`keydb`、`clickhouse`、`dragonfly`。

## 选项

### `--clickhouse-admin-password`

Clickhouse 管理员密码。

### `--clickhouse-admin-user`

Clickhouse 管理员用户名。

### `--description`

数据库描述。

### `--destination-uuid`

服务器存在多个网络目标时指定目标 UUID。

### `--dragonfly-password`

Dragonfly 密码。

### `--environment-name`

环境名称。

### `--environment-uuid`

环境 UUID。

### `--help`

打印该命令的帮助。

### `--image`

Docker 镜像。

### `--instant-deploy`

创建后立即部署。

### `--is-public`

使数据库可公开访问。

### `--keydb-password`

KeyDB 密码。

### `--limits-cpus`

CPU 限制，例如 `'0.5'`、`'2'`。

### `--limits-memory`

内存限制，例如 `'512m'`、`'2g'`。

### `--mariadb-database`

MariaDB 数据库名。

### `--mariadb-password`

MariaDB 密码。

### `--mariadb-root-password`

MariaDB root 密码。

### `--mariadb-user`

MariaDB 用户。

### `--mongo-database`

MongoDB 数据库名。

### `--mongo-root-password`

MongoDB root 密码。

### `--mongo-root-username`

MongoDB root 用户名。

### `--mysql-database`

MySQL 数据库名。

### `--mysql-password`

MySQL 密码。

### `--mysql-root-password`

MySQL root 密码。

### `--mysql-user`

MySQL 用户。

### `--name`

数据库名称。

### `--postgres-db`

PostgreSQL 数据库名。

### `--postgres-password`

PostgreSQL 密码。

### `--postgres-user`

PostgreSQL 用户。

### `--project-uuid`

项目 UUID（必需）。

### `--public-port`

公开访问端口。

### `--redis-password`

Redis 密码。

### `--server-uuid`

服务器 UUID（必需）。

### `--tag`

要添加的标签，可重复传入。

### `--tags`

要添加的标签，逗号分隔。

## 使用提醒

#### 行为与限制

类型决定可用旗标：例如 PostgreSQL 用 `--postgres-db`、`--postgres-user`、`--postgres-password`；MySQL/MariaDB/MongoDB/Redis/KeyDB/Clickhouse/Dragonfly 各有对应旗标。`--server-uuid`、`--project-uuid` 为必需，环境用 `--environment-name` 或 `--environment-uuid` 指定。

## 示例

```sh
coolify database create postgresql --server-uuid=<uuid> --project-uuid=<uuid> --environment-name=production
```

源码：[S42](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/create.go)
