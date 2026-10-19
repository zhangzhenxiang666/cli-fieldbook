---
title: playwright-cli sessionstorage-delete
command:
  - sessionstorage-delete
---

删除 sessionStorage 项。

## 简介

`sessionstorage-delete` 删除当前页面 sessionStorage 中给定键。

## 参数

### `key`

必需，写作 `<key>`。要删除的键。

## 示例

```sh
playwright-cli sessionstorage-delete step
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
