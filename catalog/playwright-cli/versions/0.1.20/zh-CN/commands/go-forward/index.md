---
title: playwright-cli go-forward
command:
  - go-forward
---

前进到下一页。

## 简介

`go-forward` 让当前页面在历史中前进一步，等价浏览器前进按钮。命令完成后返回新页面的状态快照。

## 示例

```sh
playwright-cli go-forward
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
