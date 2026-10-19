---
title: playwright-cli cookie-get
command:
  - cookie-get
---

按名称读取单个 cookie。

## 简介

`cookie-get` 返回给定名称的 cookie 内容（含值与属性）。本命令以 raw 模式输出。

## 参数

### `name`

必需，写作 `<name>`。cookie 名称。

## 示例

```sh
playwright-cli cookie-get session_id
TOKEN=$(playwright-cli --raw cookie-get session_id)
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
