---
title: playwright-cli route
command:
  - route
---

按 URL 模式拦截并伪造网络响应。

## 简介

`route` 为匹配给定 URL 模式的请求注册模拟响应：命中模式的请求不再发往网络，直接返回这里指定的状态码、响应体与响应头。用于 mock 后端接口与测试失败分支。

## 参数

### `pattern`

必需，写作 `<pattern>`。要匹配的 URL 模式（如 `**/api/users`）。

## 选项

### `--status`

格式：`--status <VALUE>`。HTTP 状态码，缺省 200。

### `--body`

格式：`--body <VALUE>`。响应体（文本或 JSON 字符串）。

### `--content-type`

格式：`--content-type <VALUE>`。Content-Type 响应头。

### `--header`

格式：`--header <VALUE>`。要添加的响应头，格式 `Name: Value`，可重复给出。

### `--remove-header`

格式：`--remove-header <VALUE>`。要移除的响应头名称，逗号分隔。

## 使用提醒

路由在会话内持续生效，直到 [unroute](cli:command:unroute) 移除或会话关闭。

## 示例

```sh
playwright-cli route "**/*.jpg" --status=404
playwright-cli route "https://api.example.com/**" --body='{"mock": true}'
playwright-cli route "**/api/user" --status=500 --content-type=application/json
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
