---
title: playwright-cli recording-start
command:
  - recording-start
---

开始录制用户操作。

## 简介

`recording-start` 开始录制会话中执行的用户操作（含手工在浏览器中的操作），供 [recording-stop](cli:command:recording-stop) 输出为 Playwright 代码。

## 示例

```sh
playwright-cli recording-start
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
