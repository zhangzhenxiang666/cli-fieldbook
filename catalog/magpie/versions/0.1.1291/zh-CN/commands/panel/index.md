---
title: magpie panel
command:
  - panel
---

打开菜单栏图标的快速面板;面板已开着时则关闭它。

## 简介

`magpie panel` 是快速切换模型的入口:如果 magpie 尚未运行,以"快速面板打开"的状态启动应用;如果已在运行,则切换(toggle)当前快速面板的开合。面板里可以直接为各 agent 换模型,不必打开完整窗口。

把它绑定到全局快捷键,即可随时弹出/收起面板,这是本命令的主要用法。

## 使用提醒

- 本命令是切换而非只开:面板开着时再执行会将其关闭。
- 快速面板属于菜单栏应用的形态;无 GUI 构建下不可用(提示改用 [`magpie tui`](cli:command:tui))。

## 源码补充

- `runPanel` 启动或切换面板的逻辑见 [gui_on.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/gui_on.go)。
- 命令分发见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
