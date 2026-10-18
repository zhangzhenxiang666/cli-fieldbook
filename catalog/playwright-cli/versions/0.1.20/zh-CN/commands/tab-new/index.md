---
title: playwright-cli tab-new
command:
  - tab-new
---

新建标签页。

## 简介

`tab-new` 新建一个标签页并切换为当前页；可带 URL 直接导航，省略时为空白页。

## 参数

### `url`

可选，写作 `[url]`。新标签页要打开的 URL；省略时新标签页为空白。

## 示例

```sh
playwright-cli tab-new
playwright-cli tab-new https://example.com/page
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
