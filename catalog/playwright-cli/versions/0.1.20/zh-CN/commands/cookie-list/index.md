---
title: playwright-cli cookie-list
command:
  - cookie-list
---

列出全部 cookie。

## 简介

`cookie-list` 列出会话的全部 cookie，可按域与路径过滤。本命令以 raw 模式输出（列表本身即结果）。

## 选项

### `--domain`

格式：`--domain <VALUE>`。按域过滤 cookie。

### `--path`

格式：`--path <VALUE>`。按路径过滤 cookie。

## 示例

```sh
playwright-cli cookie-list
playwright-cli cookie-list --domain=example.com
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
