---
title: playwright-cli video-chapter
command:
  - video-chapter
---

为视频添加章节标记。

## 简介

`video-chapter` 在录制中的视频里插入章节标记（标题卡片），标记关键节点。

## 参数

### `title`

必需，写作 `<title>`。章节标题。

## 选项

### `--description`

格式：`--description <VALUE>`。章节描述。

### `--duration`

格式：`--duration <VALUE>`。章节卡片展示时长（毫秒）。

## 示例

```sh
playwright-cli video-chapter "Chapter Title" --description="Details" --duration=2000
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
