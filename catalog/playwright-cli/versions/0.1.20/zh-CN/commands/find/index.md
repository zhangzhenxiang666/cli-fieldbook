---
title: playwright-cli find
command:
  - find
---

在页面快照中检索文本或正则。

## 简介

`find` 在当前页面快照中按纯文本（大小写不敏感的子串匹配）或正则表达式检索，返回命中节点及其上下文（类似搜索片段，各命中前后带数行上下文）。适合在大快照中定位元素而不整页输出。

## 参数

### `text`

可选，写作 `[text]`。要检索的纯文本。

## 选项

### `--regex`

格式：`--regex <VALUE>`。要检索的正则表达式；与位置参数文本二选一。正则包在斜线中可带标志，如 `/pattern/i`。

## 使用提醒

文本参数与 `--regex` 不可同时给出。

## 示例

```sh
playwright-cli find "Sign in"
playwright-cli find --regex "Sign (in|up)"
playwright-cli find --regex "/sign (in|up)/i"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
