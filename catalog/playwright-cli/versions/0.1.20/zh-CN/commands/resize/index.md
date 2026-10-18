---
title: playwright-cli resize
command:
  - resize
---

调整浏览器窗口大小。

## 简介

`resize` 把会话的浏览器窗口（视口）调整为给定宽高。

## 参数

### `w`

必需，写作 `<w>`。窗口宽度。

### `h`

必需，写作 `<h>`。窗口高度。

## 示例

```sh
playwright-cli resize 1920 1080
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
