---
title: playwright-cli press
command:
  - press
---

按下一个键盘键。

## 简介

`press` 在页面上按下并释放给定键，用于单键输入（字符或命名键）。需要按住不放的组合操作用 [keydown](cli:command:keydown)/[keyup](cli:command:keyup)。

## 参数

### `key`

必需，写作 `<key>`。要按下的键名或要生成的字符，如 `ArrowLeft`、`a`、`Enter`。

## 示例

```sh
playwright-cli press Enter
playwright-cli press ArrowDown
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
