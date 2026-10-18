---
title: playwright-cli recording-stop
command:
  - recording-stop
---

停止录制并输出 Playwright 代码。

## 简介

`recording-stop` 结束录制，把录制期间的操作打印为等价的 Playwright 代码。

## 示例

```sh
playwright-cli recording-start
playwright-cli recording-stop
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
