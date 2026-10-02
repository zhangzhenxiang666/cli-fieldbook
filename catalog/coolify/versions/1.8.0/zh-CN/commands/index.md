---
title: coolify
command: []
---
## 简介

Coolify 官方命令行客户端，通过 Coolify API 管理应用、数据库、服务、服务器与项目等资源。本手册固定上游 1.8.0。

## 选项

### `--context`

按名称指定本次调用使用的上下文。

### `--debug`

调试模式。

### `--format`

输出格式：`table`（默认，表格）、`json`（紧凑 JSON，适合脚本）、`pretty`（缩进 JSON）。

### `--help`

打印该命令的帮助。

### `--show-sensitive`

显示敏感信息。

### `--token`

认证令牌（覆盖上下文中的令牌）。

## 使用提醒

#### 行为与限制

认证基于上下文（context）：先用 [context add](cli:command:context/add) 登记实例 URL 与 API 令牌，之后所有命令默认使用默认上下文。配置保存在 `~/.config/coolify/config.json`（macOS/Linux，XDG 规范）。
下述五个旗标为持久旗标，对所有子命令生效；表格式输出适用于人工查看，`--format json` 输出紧凑 JSON，适合脚本与 CI 消费。参见[输出格式与自动化](../concepts/output-formats.md)。

源码：[S69](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/root.go)
