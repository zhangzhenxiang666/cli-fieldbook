---
title: coolify context add
command:
  - context
  - add
---
## 简介

新增一个上下文，登记实例 URL 与 API 令牌。

## 参数

### `context_name`

上下文名称。

### `url`

Coolify 实例 URL，例如 `https://coolify.example.com`。

### `token`

API 令牌；可在 Coolify 控制台「Security → API Tokens」中创建。

## 选项

### `--default`

将新上下文设为默认。

### `--force`

上下文已存在时强制覆盖。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

加 `-d` 时同时将其设为默认上下文；目标名称已存在时报错，除非加 `--force` 覆盖。令牌写入本机配置文件，不在输出中回显。

## 示例

```sh
coolify context add -d myserver https://coolify.example.com your-api-token
```

源码：[S26](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/context/add.go)
