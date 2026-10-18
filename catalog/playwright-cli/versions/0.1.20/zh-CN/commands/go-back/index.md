---
title: playwright-cli go-back
command:
  - go-back
---

返回上一页。

## 简介

`go-back` 让当前页面在历史中后退一步，等价浏览器后退按钮。命令完成后返回新页面的状态快照。

## 示例

```sh
playwright-cli go-back
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
