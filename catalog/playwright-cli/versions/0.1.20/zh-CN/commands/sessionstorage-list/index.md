---
title: playwright-cli sessionstorage-list
command:
  - sessionstorage-list
---

列出全部 sessionStorage 键值对。

## 简介

`sessionstorage-list` 列出当前页面 sessionStorage 的全部键值对。本命令以 raw 模式输出。

## 示例

```sh
playwright-cli sessionstorage-list
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
