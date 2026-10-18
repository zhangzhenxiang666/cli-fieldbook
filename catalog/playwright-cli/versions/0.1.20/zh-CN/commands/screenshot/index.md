---
title: playwright-cli screenshot
command:
  - screenshot
---

截取当前页面或元素的画面。

## 简介

`screenshot` 把当前视口保存为图片；给目标参数则只截该元素。缺省文件名按 `page-{时间戳}` 生成，格式缺省从文件扩展名推断、否则 png。

## 参数

### `target`

可选，写作 `[target]`。快照中的元素引用（如 `e15`）或能唯一定位元素的 CSS 选择器 / Playwright 定位器。

## 选项

### `--filename`

格式：`--filename <VALUE>`。保存截图的文件名；缺省 `page-{时间戳}.{png|jpeg|webp}`。

### `--type`

格式：`--type <VALUE>`。图片格式，取值 `png`、`jpeg`、`webp`；未指定时按文件扩展名推断，否则 png。

### `--full-page`

格式：`--full-page`。截取整个可滚动页面，而不是当前视口。

### `--hires`

格式：`--hires`。按设备像素高分辨率截图（计入设备像素比），而不是 CSS 像素。

## 示例

```sh
playwright-cli screenshot
playwright-cli screenshot e5
playwright-cli screenshot --filename=page.png
playwright-cli screenshot --full-page --hires
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
