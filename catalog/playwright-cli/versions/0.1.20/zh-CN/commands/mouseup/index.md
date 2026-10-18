---
title: playwright-cli mouseup
command:
  - mouseup
---

释放按下的鼠标键。

## 简介

`mouseup` 释放此前用 [mousedown](cli:command:mousedown) 按住的鼠标键。

## 参数

### `button`

可选，写作 `[button]`。要按下的鼠标键，缺省 `left`。

## 示例

```sh
playwright-cli mouseup
playwright-cli mouseup right
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
