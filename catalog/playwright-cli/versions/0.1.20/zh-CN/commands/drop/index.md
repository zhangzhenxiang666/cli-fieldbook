---
title: playwright-cli drop
command:
  - drop
---

把文件或数据拖放到元素上。

## 简介

`drop` 模拟从页面外部（如操作系统文件管理器）向元素拖放文件或数据，用于测试页面的拖放接收行为。文件用 `--path` 给绝对路径，数据用 `--data` 按 `mime/type=value` 格式给出，两者可重复、可并用。

## 参数

### `target`

必需，写作 `<target>`。快照中的元素引用（如 `e15`）或能唯一定位元素的 CSS 选择器 / Playwright 定位器。

## 选项

### `--path`

格式：`--path <VALUE>`。要拖放的文件绝对路径，可重复给出。

### `--data`

格式：`--data <VALUE>`。要拖放的数据，格式为 `mime/type=value`（如 `--data "text/plain=hello"`），可重复给出。

## 使用提醒

`--data` 每条必须含 `=`，否则报错。

## 示例

```sh
playwright-cli drop e4 --path=/abs/path/image.png
playwright-cli drop e4 --data="text/plain=hello world"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
