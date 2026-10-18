---
title: playwright-cli console
command:
  - console
---

列出控制台消息。

## 简介

`console` 列出页面累积的控制台消息；可用 `min-level` 只看指定级别及以上，用 `--clear` 清空列表。

## 参数

### `min-level`

可选，写作 `[min-level]`。要返回的最低消息级别；每个级别包含更严重级别的消息。缺省 `info`。

## 选项

### `--clear`

格式：`--clear`。清空控制台消息列表（不返回消息）。

## 示例

```sh
playwright-cli console
playwright-cli console warning
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
