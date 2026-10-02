---
title: 上下文与认证
---

coolify CLI 不使用 `login` 式交互登录，而是以「上下文（context）」为单位管理到各个 Coolify 实例的连接。一个上下文包含实例 URL 与 API 令牌，保存在本机配置文件中；多实例场景可以登记多个上下文并随时切换。

## 配置文件

配置保存在 `~/.config/coolify/config.json`（macOS/Linux，遵循 XDG 规范；Windows 为 `%APPDATA%\coolify\config.json`）。文件主体是 `instances` 数组，每个元素包含名称、URL、令牌与是否默认的标记。第一个登记的上下文会自动成为默认上下文。

直接手改该文件可行但不必：[context add](../commands/context/add/index.md)、[context set-default](../commands/context/set-default/index.md)、[context set-token](../commands/context/set-token/index.md) 等命令覆盖了全部常见操作。

## 令牌的获取与优先级

API 令牌在 Coolify 控制台「Security → API Tokens」中创建。实际请求使用的令牌按以下顺序决定：

1. `--token` 旗标（仅本次调用有效，不写回配置）；
2. `--context` 指定上下文中的令牌；
3. 默认上下文中的令牌。

`--token` 适合在 CI 等一次性环境中临时覆盖，避免为流水线单独维护上下文。

## 脱敏边界

v1.8.0 起对令牌输出做了收紧：[context list](../commands/context/list/index.md) 的结构化输出（`--format json`/`pretty`）不再包含 `token` 字段。日常查看不会泄露令牌；如需确认令牌内容，应回到 Coolify 控制台核对。

## 常见问题

- **401 或认证失败**：先用 [context verify](../commands/context/verify/index.md) 隔离问题——它同时验证连通性与令牌有效性，并输出服务端版本。
- **多实例串数据**：确认当前默认上下文是否符合预期（`context list`），或在命令上显式加 `--context`。
- **令牌轮换**：用 `context set-token` 更新对应上下文，再 `context verify` 确认。

源码：[S95](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/internal/config/config.go) [S69](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/root.go)
