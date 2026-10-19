---
title: playwright-cli keydown
command:
  - keydown
---

按下键盘键不放。

## 简介

`keydown` 按下给定键并保持（不释放），用于修饰键配合的复杂操作；与 [keyup](cli:command:keyup) 配对使用。

## 参数

### `key`

必需，写作 `<key>`。要按下的键名或字符，如 `Shift`、`ArrowLeft`。

## 使用提醒

按下的键必须用 [keyup](cli:command:keyup) 释放，否则会话中该键保持按下状态。

## 示例

```sh
playwright-cli keydown Shift
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
