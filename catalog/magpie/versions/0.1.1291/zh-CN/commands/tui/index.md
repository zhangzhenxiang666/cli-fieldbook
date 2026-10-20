---
title: magpie tui
command:
  - tui
---

在终端里打开 magpie 的界面;打开期间(且没有其他 magpie 在运行时)同时承担网关服务。

## 简介

`magpie tui` 启动终端版界面,与菜单栏应用、窗口应用看到同一份设置(同一批 provider、账号与 agent 配置),适合无图形界面的服务器、SSH 会话或习惯终端操作的场景。

与 [`magpie web`](cli:command:web) 的浏览器页面不同,TUI 不需要浏览器,直接在当前终端渲染;它也不是守护进程——需要开机自启与掉线重启时应使用 [`magpie daemon`](cli:command:daemon) 安装系统服务。

TUI 打开期间同时承担网关服务;若已有其他 magpie(应用、服务或 [`magpie serve`](cli:command:serve))在服务网关,则以那一个为准。

## 使用提醒

- 无图形界面的环境下,直接运行 `magpie`(不带参数)也会进入 TUI,与本命令等价。
- Ctrl-C 退出;退出后若没有其他 magpie 接管,网关随之下线,各 agent 的请求不再被代理。

## 源码补充

- 命令分发见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)(`case "tui": return runTUI()`)。
- 运行形态说明见 [README.zh-CN.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/README.zh-CN.md)。
