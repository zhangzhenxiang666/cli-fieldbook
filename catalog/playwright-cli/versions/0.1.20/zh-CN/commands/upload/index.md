---
title: playwright-cli upload
command:
  - upload
---

上传一个或多个文件。

## 简介

`upload` 向页面当前弹出的文件选择框提供文件，配合对上传控件的操作使用（如点击"选择文件"触发文件对话框后执行本命令）。

## 参数

### `files`

必需（可多个），写作 `<files...>`。要上传文件的绝对路径。

## 示例

```sh
playwright-cli upload /abs/path/document.pdf
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
