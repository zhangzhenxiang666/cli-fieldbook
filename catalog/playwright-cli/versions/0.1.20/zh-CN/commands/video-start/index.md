---
title: playwright-cli video-start
command:
  - video-start
---

开始录制视频。

## 简介

`video-start` 开始录制页面视频；可指定保存文件名与画面尺寸，缺省尺寸适配 800x800。

## 参数

### `filename`

可选，写作 `[filename]`。保存视频的文件名。

## 选项

### `--size`

格式：`--size <VALUE>`。视频画面尺寸，如 `"800x600"`；未指定时录制画面适配 800x800。

## 示例

```sh
playwright-cli video-start
playwright-cli video-start video.webm --size=800x600
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
