---
title: playwright-cli click
command:
  - click
---

点击页面元素。

## 简介

`click` 点击给定目标元素。目标默认取快照中的元素引用；也可用 CSS 选择器或 Playwright 定位器（如 `getByRole('button', { name: 'Submit' })`）。可指定鼠标键与修饰键。

## 参数

### `target`

必需，写作 `<target>`。快照中的元素引用（如 `e15`）或能唯一定位元素的 CSS 选择器 / Playwright 定位器。

### `button`

可选，写作 `[button]`。点击用的鼠标键，缺省 `left`。

## 选项

### `--modifiers`

格式：`--modifiers <VALUE>`。按住的修饰键，可重复给出。

## 示例

```sh
playwright-cli click e3
playwright-cli click "#main > button.submit"
playwright-cli click "getByRole('button', { name: 'Submit' })"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
