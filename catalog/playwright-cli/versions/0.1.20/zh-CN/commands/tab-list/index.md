---
title: playwright-cli tab-list
command:
  - tab-list
---

列出全部标签页。

## 简介

`tab-list` 列出会话中全部标签页及其索引，索引用于 [tab-select](cli:command:tab-select) 与 [tab-close](cli:command:tab-close)。

## 示例

```sh
playwright-cli tab-list
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
