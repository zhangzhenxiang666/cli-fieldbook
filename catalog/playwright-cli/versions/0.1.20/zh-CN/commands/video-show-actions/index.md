---
title: playwright-cli video-show-actions
command:
  - video-show-actions
---

在页面上标注后续操作。

## 简介

`video-show-actions` 开启操作标注：之后的每个 CLI/MCP 操作在页面上以标注框呈现，显示操作名并高亮目标元素，适合录制演示或讲解视频。

## 选项

### `--duration`

格式：`--duration <VALUE>`。每个操作标注的停留时长（毫秒），缺省 500。

### `--position`

格式：`--position <VALUE>`。操作标题的放置位置，取值 `top-left`、`top`、`top-right`、`bottom-left`、`bottom`、`bottom-right`，缺省 `top-right`。

### `--cursor`

格式：`--cursor <VALUE>`。光标装饰：`pointer`（缺省）在操作点之间播放指针动画；`none` 关闭。

## 示例

```sh
playwright-cli video-show-actions --duration=600 --position=top-right
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
