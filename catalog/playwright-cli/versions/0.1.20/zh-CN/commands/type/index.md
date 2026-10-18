---
title: playwright-cli type
command:
  - type
---

在可编辑元素中逐字输入文本。

## 简介

`type` 将文本逐字符输入当前聚焦的可编辑元素（不指定目标，作用于焦点所在处），可选在完成后按 Enter 提交。与 [fill](cli:command:fill) 的区别：`type` 模拟逐键输入（触发每个按键事件），`fill` 一次性设置值。

## 参数

### `text`

必需，写作 `<text>`。要输入的文本。

## 选项

### `--submit`

格式：`--submit`。输入完成后按 Enter 提交。

## 示例

```sh
playwright-cli type "search query"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
