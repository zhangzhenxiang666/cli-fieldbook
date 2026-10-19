---
title: magpie tray
command:
  - tray
---

只在菜单栏启动 magpie,不打开窗口。

## 简介

`magpie tray` 启动应用但只显示菜单栏图标,不弹窗口,适合开机或登录后常驻后台:菜单栏图标提供快速切换模型的面板入口,网关同时在本机服务。需要打开完整窗口时,从菜单栏图标进入,或运行 [`magpie app`](cli:command:app)。

登录时自动以菜单栏方式启动,用 [`magpie autostart on`](cli:command:autostart) 设置。

## 使用提醒

- 与不带参数运行 `magpie`([`magpie app`](cli:command:app))的区别只在是否打开窗口;两者都带菜单栏图标。
- 快速面板也可以用 [`magpie panel`](cli:command:panel) 直接触发。

## 源码补充

- 分发逻辑(`runGUI(false, "")`,不打开窗口)见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
