---
title: playwright-cli fill
command:
  - fill
---

向可编辑元素一次性填入文本。

## 简介

`fill` 把目标输入框的值一次性设为给定文本（清空原值），不逐键触发事件；可选在完成后按 Enter 提交。需要模拟真实键入时改用 [type](cli:command:type)。

## 参数

### `target`

必需，写作 `<target>`。快照中的元素引用（如 `e15`）或能唯一定位元素的 CSS 选择器 / Playwright 定位器。

### `text`

必需，写作 `<text>`。要填入的文本。

## 选项

### `--submit`

格式：`--submit`。填入完成后按 Enter 提交。

## 示例

```sh
playwright-cli fill e5 "user@example.com"
playwright-cli fill e5 "search" --submit
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
