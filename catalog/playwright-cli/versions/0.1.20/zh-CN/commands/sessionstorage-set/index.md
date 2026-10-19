---
title: playwright-cli sessionstorage-set
command:
  - sessionstorage-set
---

设置 sessionStorage 项。

## 简介

`sessionstorage-set` 把当前页面 sessionStorage 中给定键设为给定值。

## 参数

### `key`

必需，写作 `<key>`。要设置的键。

### `value`

必需，写作 `<value>`。要设置的值。

## 示例

```sh
playwright-cli sessionstorage-set step 3
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
