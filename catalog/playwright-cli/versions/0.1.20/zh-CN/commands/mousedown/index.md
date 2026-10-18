---
title: playwright-cli mousedown
command:
  - mousedown
---

按下鼠标键不放。

## 简介

`mousedown` 按下给定鼠标键并保持（不释放），与 [mouseup](cli:command:mouseup) 配对使用。

## 参数

### `button`

可选，写作 `[button]`。要按下的鼠标键，缺省 `left`。

## 示例

```sh
playwright-cli mousedown
playwright-cli mousedown right
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
