---
title: playwright-cli eval
command:
  - eval
---

在页面或元素上求值 JavaScript 表达式。

## 简介

`eval` 在当前页面上下文求值给定函数：不指定目标时形如 `() => { /* code */ }`，指定目标时形如 `(element) => { /* code */ }` 且元素为定位结果。常用于读取快照中看不到的属性（`id`、`data-testid` 等）或提取数据。

## 参数

### `func`

必需，写作 `<func>`。要执行的函数：`() => { /* code */ }`，或提供目标时的 `(element) => { /* code */ }`。

### `target`

可选，写作 `[target]`。快照中的元素引用（如 `e15`）或能唯一定位元素的 CSS 选择器 / Playwright 定位器。

## 选项

### `--filename`

格式：`--filename <VALUE>`。把求值结果保存到文件，而不是在响应中返回。

## 示例

```sh
playwright-cli eval "document.title"
playwright-cli eval "el => el.textContent" e5
playwright-cli eval "el => el.getAttribute('data-testid')" e5
playwright-cli --raw eval "JSON.stringify(performance.timing)"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
