---
title: playwright-cli route-list
command:
  - route-list
---

列出全部生效的网络路由。

## 简介

`route-list` 列出当前会话注册的全部模拟路由及其模式。本命令以 raw 模式输出。

## 示例

```sh
playwright-cli route-list
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
