---
title: playwright-cli tracing-start
command:
  - tracing-start
---

开始追踪记录。

## 简介

`tracing-start` 开始记录会话的 trace（操作序列、网络、控制台等），用于事后在 Playwright Trace Viewer 中回放分析。

## 示例

```sh
playwright-cli tracing-start
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
