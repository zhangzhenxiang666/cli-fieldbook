---
title: playwright-cli cookie-delete
command:
  - cookie-delete
---

删除单个 cookie。

## 简介

`cookie-delete` 按名称删除当前上下文中的一个 cookie。

## 参数

### `name`

必需，写作 `<name>`。要删除的 cookie 名称。

## 示例

```sh
playwright-cli cookie-delete session_id
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
