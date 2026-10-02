---
title: coolify context get
command:
  - context
  - get
---
## 简介

查看指定上下文的配置详情。

## 参数

### `context_name`

上下文名称。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

v1.8.0 起 `context list` 的结构化输出不再包含令牌字段；本命令同样不以明文回显令牌。

源码：[S29](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/context/get.go)
