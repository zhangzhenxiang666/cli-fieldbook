---
title: playwright-cli reload
command:
  - reload
---

重新加载当前页面。

## 简介

`reload` 重新加载当前页面，等价浏览器刷新按钮。命令完成后返回页面的状态快照。

## 示例

```sh
playwright-cli reload
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
