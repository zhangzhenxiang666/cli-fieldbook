---
title: magpie app
command:
  - app
---

打开应用窗口(带菜单栏图标);别名 `magpie gui`。本入口存在于源码分发但未列入官方 usage 主体。

## 简介

`magpie app`(或 `magpie gui`)启动桌面应用:一个窗口加一个菜单栏图标,与不带参数运行 `magpie` 相同。带一个 `tab` 参数时直接把窗口开在指定页面上——源码中的例子是 `magpie gui settings` 开在 Settings 页;应用更新后重启回到原页面时也走这条路径。

无图形界面的构建(GUI 关闭编译)会报错并提示改用 [`magpie tui`](cli:command:tui)。

## 参数

### `tab`

`[tab]`。打开窗口时停留的页面名,如 `settings`、`usage`;省略时打开默认页面。

## 使用提醒

- 只想常驻菜单栏不开窗口,用 [`magpie tray`](cli:command:tray);只想弹快速面板用 [`magpie panel`](cli:command:panel)。

## 源码补充

- 分发逻辑(`runWindow(args[1])` / `runGUI(true, "")`)见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
- 无 GUI 构建的报错见 [gui_off.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/gui_off.go)。
