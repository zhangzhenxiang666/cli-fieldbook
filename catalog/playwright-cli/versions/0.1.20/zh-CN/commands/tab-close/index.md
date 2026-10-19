---
title: playwright-cli tab-close
command:
  - tab-close
---

关闭标签页。

## 简介

`tab-close` 关闭给定索引的标签页；省略索引时关闭当前标签页。

## 参数

### `index`

可选，写作 `[index]`。要关闭的标签页索引；省略时关闭当前标签页。

## 示例

```sh
playwright-cli tab-close
playwright-cli tab-close 2
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
