---
title: playwright-cli cookie-set
command:
  - cookie-set
---

设置带可选属性的 cookie。

## 简介

`cookie-set` 在当前上下文写入一个 cookie，可同时指定域、路径、过期与安全属性。

## 参数

### `name`

必需，写作 `<name>`。cookie 名称。

### `value`

必需，写作 `<value>`。cookie 值。

## 选项

### `--domain`

格式：`--domain <VALUE>`。cookie 的域。

### `--path`

格式：`--path <VALUE>`。cookie 的路径。

### `--expires`

格式：`--expires <VALUE>`。cookie 过期时间（Unix 时间戳）。

### `--httpOnly`

格式：`--httpOnly`。标记为 HTTP only（页面脚本不可读）。

### `--secure`

格式：`--secure`。标记为 secure（仅经安全连接发送）。

### `--sameSite`

格式：`--sameSite <VALUE>`。SameSite 属性，取值 `Strict`、`Lax`、`None`。

## 示例

```sh
playwright-cli cookie-set session_id abc123
playwright-cli cookie-set session_id abc123 --domain=example.com --httpOnly --secure
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
