---
title: playwright-cli webmcp-list
command:
  - webmcp-list
---

列出页面注册的 WebMCP 工具。

## 简介

`webmcp-list` 列出当前页面通过实验性 WebMCP API 注册的工具（名称与所属 frame）。页面注册了工具时，导航结果的状态区会提示可用工具数量。

## 使用提醒

WebMCP 仅在 Chromium 与 Firefox 且开启浏览器旗标时可用；旗标配置在 `.playwright/cli.config.json` 的 `browser.launchOptions.args`（如 `--enable-features=WebMCP`），改后需重新打开会话。

## 示例

```sh
playwright-cli webmcp-list
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
