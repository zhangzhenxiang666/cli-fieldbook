---
title: playwright-cli tab-select
command:
  - tab-select
---

切换到指定标签页。

## 简介

`tab-select` 把给定索引的标签页切换为当前页，后续命令作用于它。

## 参数

### `index`

必需，写作 `<index>`。要切换到的标签页索引（以 [tab-list](cli:command:tab-list) 的编号为准）。

## 示例

```sh
playwright-cli tab-list
playwright-cli tab-select 0
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
