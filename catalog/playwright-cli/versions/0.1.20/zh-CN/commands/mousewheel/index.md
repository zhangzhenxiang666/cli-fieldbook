---
title: playwright-cli mousewheel
command:
  - mousewheel
---

滚动鼠标滚轮。

## 简介

`mousewheel` 在当前鼠标位置滚动滚轮，按给定的横向与纵向增量。

## 参数

### `dx`

必需，写作 `<dx>`。横向滚动增量。

### `dy`

必需，写作 `<dy>`。纵向滚动增量。

## 示例

```sh
playwright-cli mousewheel 0 100
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
