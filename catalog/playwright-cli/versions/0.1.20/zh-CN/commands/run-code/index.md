---
title: playwright-cli run-code
command:
  - run-code
---

运行 Playwright 代码片段。

## 简介

`run-code` 在会话上执行一段 JavaScript 函数，函数以 `page`（当前页面的 Playwright Page 对象）为唯一参数，可使用任意 Playwright API。用于命令行未覆盖的细粒度操作（授予权限、多选下拉、复杂断言等）。代码较长时用 `--filename` 从文件加载。

## 参数

### `code`

可选，写作 `[code]`。要执行的函数，如 `async page => await page.context().grantPermissions(['geolocation'])`。

## 选项

### `--filename`

格式：`--filename <VALUE>`。从指定文件加载代码。

## 使用提醒

本命令直接执行任意 Playwright 代码，属高权限操作；片段内容应可审查。

## 示例

```sh
playwright-cli run-code "async page => await page.context().grantPermissions(['geolocation'])"
playwright-cli run-code --filename=script.js
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
