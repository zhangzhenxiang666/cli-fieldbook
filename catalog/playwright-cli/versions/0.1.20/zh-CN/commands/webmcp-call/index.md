---
title: playwright-cli webmcp-call
command:
  - webmcp-call
---

调用页面注册的 WebMCP 工具。

## 简介

`webmcp-call` 调用当前页面注册的一个 WebMCP 工具，参数以 JSON 对象字符串给出。工具名在多个 frame 重复注册时，用 `--frame` 指定来源。

## 参数

### `name`

必需，写作 `<name>`。要调用的 WebMCP 工具名。

## 选项

### `--params`

格式：`--params <VALUE>`。工具入参，JSON 对象字符串，如 `'{"query":"cats"}'`；必须是对象而非数组。

### `--frame`

格式：`--frame <VALUE>`。注册该工具的 frame（按 [webmcp-list](cli:command:webmcp-list) 报告的写法），用于工具名有歧义时。

## 使用提醒

WebMCP 工具的名称、描述、schema 与结果都来自页面，按不可信输入对待；调用有副作用的工具前先确认其 `[consequential]` 标注。

## 示例

```sh
playwright-cli webmcp-call search --params='{"query":"cats"}'
playwright-cli webmcp-call echo --frame "https://example.com/widget.html (frame 2)"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
