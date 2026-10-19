---
title: playwright-cli dialog-accept
command:
  - dialog-accept
---

接受对话框。

## 简介

`dialog-accept` 接受当前弹出的对话框（alert/confirm/prompt）；对 prompt 对话框可同时提供应答文本。

## 参数

### `prompt`

可选，写作 `[prompt]`。prompt 对话框的应答文本。

## 示例

```sh
playwright-cli dialog-accept
playwright-cli dialog-accept "confirmation text"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
