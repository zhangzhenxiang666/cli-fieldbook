---
title: playwright-cli tray
command:
  - tray
---

运行托盘程序（隐藏命令）。

## 简介

`tray` 启动系统托盘集成。本命令在源码中标记为 hidden，不出现在帮助输出中，不做稳定性承诺。

## 示例

```sh
playwright-cli tray
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
