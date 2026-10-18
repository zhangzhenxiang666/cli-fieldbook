---
title: playwright-cli keyup
command:
  - keyup
---

释放按下的键盘键。

## 简介

`keyup` 释放此前用 [keydown](cli:command:keydown) 按住的键。

## 参数

### `key`

必需，写作 `<key>`。要释放的键名或字符。

## 示例

```sh
playwright-cli keyup Shift
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
