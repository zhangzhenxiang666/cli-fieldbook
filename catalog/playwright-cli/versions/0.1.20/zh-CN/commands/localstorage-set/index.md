---
title: playwright-cli localstorage-set
command:
  - localstorage-set
---

设置 localStorage 项。

## 简介

`localstorage-set` 把当前页面 localStorage 中给定键设为给定值。

## 参数

### `key`

必需，写作 `<key>`。要设置的键。

### `value`

必需，写作 `<value>`。要设置的值。

## 示例

```sh
playwright-cli localstorage-set theme dark
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
