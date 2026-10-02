---
title: herdr plugin pane open
command:
  - plugin
  - pane
  - open
---

## 简介

打开插件入口对应的窗格。

## 选项

### `--plugin`

插件 ID；实际解析器要求提供。

### `--entrypoint`

插件入口 ID；实际解析器要求提供。

### `--placement`

spec 列出 overlay、split、tab、zoomed；运行时额外支持 popup，见补注。

### `--workspace`

目标工作区。

### `--target-pane`

目标/锚点窗格。

### `--direction`

分割方向：right 在右侧创建，down 在下侧创建。

### `--cwd`

新进程的工作目录；传入目标机器可访问的路径。

### `--env`

设置启动进程的环境变量；可重复。相同键后值覆盖前值，键不得为空。

### `--focus`

创建后切换焦点到新对象。

### `--no-focus`

创建后不改变当前焦点；不要与 --focus 同时传入。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 运行时补充（未完整列入统一帮助）

- `--placement popup`：实际解析器支持弹出式窗格；此外 fullscreen 是 zoomed 的兼容别名。
- `--width <SIZE>`：弹出式窗格宽度，可用终端单元格数或百分比，例如 100、80%。
- `--height <SIZE>`：弹出式窗格高度，可用终端单元格数或百分比，例如 30、70%。

#### 行为与限制

默认 focus=true，与 workspace create / tab create / pane split 默认不抢焦点不同。

尺寸选项未列入统一 spec。布局相关组合限制仍由运行时验证；popup 示例见工作流。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S09](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/plugin.rs)
