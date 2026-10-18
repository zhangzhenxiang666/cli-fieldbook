---
title: playwright-cli mousemove
command:
  - mousemove
---

把鼠标移动到指定位置。

## 简介

`mousemove` 把鼠标指针移动到页面给定坐标（视口相对 CSS 像素）。

## 参数

### `x`

必需，写作 `<x>`。X 坐标。

### `y`

必需，写作 `<y>`。Y 坐标。

## 示例

```sh
playwright-cli mousemove 150 300
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
