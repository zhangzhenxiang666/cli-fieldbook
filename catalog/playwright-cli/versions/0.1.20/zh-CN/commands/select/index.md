---
title: playwright-cli select
command:
  - select
---

在下拉框中选择选项。

## 简介

`select` 在目标 `<select>` 下拉框中按值选中一个选项。

## 参数

### `target`

必需，写作 `<target>`。快照中的元素引用（如 `e15`）或能唯一定位元素的 CSS 选择器 / Playwright 定位器。

### `val`

必需，写作 `<val>`。要选中的选项值。

## 使用提醒

本命令一次只选一个值（多选下拉需 [run-code](cli:command:run-code) 调用 Playwright API）。

## 示例

```sh
playwright-cli select e9 "option-value"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
