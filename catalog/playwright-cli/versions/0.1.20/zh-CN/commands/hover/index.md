---
title: playwright-cli hover
command:
  - hover
---

悬停在页面元素上。

## 简介

`hover` 把鼠标指针移动到目标元素上并悬停，触发 hover 样式与相关事件。

## 参数

### `target`

必需，写作 `<target>`。快照中的元素引用（如 `e15`）或能唯一定位元素的 CSS 选择器 / Playwright 定位器。
## 示例

```sh
playwright-cli hover e4
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
