---
title: playwright-cli generate-locator
command:
  - generate-locator
---

为元素生成 Playwright 定位器。

## 简介

`generate-locator` 针对给定目标元素生成推荐的 Playwright 定位器代码，用于把快照引用沉淀为可复用的定位器。

## 参数

### `target`

必需，写作 `<target>`。快照中的元素引用（如 `e15`）或能唯一定位元素的 CSS 选择器 / Playwright 定位器。
## 示例

```sh
playwright-cli generate-locator e5 --raw
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
