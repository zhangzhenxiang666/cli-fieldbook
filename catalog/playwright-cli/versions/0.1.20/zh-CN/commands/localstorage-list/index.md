---
title: playwright-cli localstorage-list
command:
  - localstorage-list
---

列出全部 localStorage 键值对。

## 简介

`localstorage-list` 列出当前页面 localStorage 的全部键值对。本命令以 raw 模式输出。

## 示例

```sh
playwright-cli localstorage-list
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
