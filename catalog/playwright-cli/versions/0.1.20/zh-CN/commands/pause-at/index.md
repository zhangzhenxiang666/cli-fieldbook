---
title: playwright-cli pause-at
command:
  - pause-at
---

运行测试到指定位置并暂停。

## 简介

`pause-at` 让正在运行的 Playwright 测试执行到给定位置后暂停，进入调试等待（配合 [resume](cli:command:resume)/[step-over](cli:command:step-over) 使用）。

## 参数

### `location`

必需，写作 `<location>`。要暂停的位置，格式 `<file>:<line>`，如 `"example.spec.ts:42"`。

## 示例

```sh
playwright-cli pause-at "example.spec.ts:42"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
