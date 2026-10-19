---
title: playwright-cli highlight
command:
  - highlight
---

为元素显示（或用 --hide 移除）高亮覆盖层。

## 简介

`highlight` 在页面上为目标元素显示持久高亮覆盖层，可自定义样式；`--hide` 移除该元素的高亮，不带目标时移除页面全部高亮。

## 参数

### `target`

可选，写作 `[target]`。快照中的元素引用（如 `e15`）或能唯一定位元素的 CSS 选择器 / Playwright 定位器。

## 选项

### `--hide`

格式：`--hide`。移除该元素此前添加的高亮；未给目标时移除页面全部高亮。

### `--style`

格式：`--style <VALUE>`。应用到高亮覆盖层的额外内联 CSS，如 `"outline: 2px dashed red"`。

## 示例

```sh
playwright-cli highlight e5
playwright-cli highlight e5 --style="outline: 3px dashed red"
playwright-cli highlight e5 --hide
playwright-cli highlight --hide
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
