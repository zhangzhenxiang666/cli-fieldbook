---
title: playwright-cli close-all
command:
  - close-all
---

关闭全部浏览器会话。

## 简介

`close-all` 停止当前工作区注册的全部浏览器会话。

## 示例

```sh
playwright-cli close-all
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
- 客户端实现见 [program.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-client/program.ts)。
