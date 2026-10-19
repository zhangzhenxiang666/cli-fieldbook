---
title: playwright-cli drag
command:
  - drag
---

在两个元素之间拖放。

## 简介

`drag` 从源元素按下鼠标拖动到目标元素后释放，完成一次元素间拖放。

## 参数

### `startTarget`

必需，写作 `<startTarget>`。拖动起点元素：快照中的元素引用或唯一选择器。

### `endTarget`

必需，写作 `<endTarget>`。拖动终点元素：快照中的元素引用（如 `e15`）或能唯一定位元素的 CSS 选择器 / Playwright 定位器。
## 示例

```sh
playwright-cli drag e2 e8
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
