---
title: playwright-cli uncheck
command:
  - uncheck
---

取消勾选复选框或单选按钮。

## 简介

`uncheck` 取消勾选目标复选框或单选按钮；未勾选时不做任何操作。

## 参数

### `target`

必需，写作 `<target>`。快照中的元素引用（如 `e15`）或能唯一定位元素的 CSS 选择器 / Playwright 定位器。
## 示例

```sh
playwright-cli uncheck e12
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
