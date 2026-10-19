---
title: magpie autostart
command:
  - autostart
---

查看或设置 magpie 是否在登录时自动启动(以菜单栏方式)。

## 简介

`magpie autostart` 不带参数时报告当前状态;带 `on` 或 `off` 时设置。开启后,系统登录时 magpie 以菜单栏形式自动启动(Windows、macOS、Linux 桌面);Android(Termux)上则是在开机时启动网关,并需要 Termux:Boot。

## 参数

### `state`

`[on|off]`。`on` 开启登录自启,`off` 关闭;省略时只报告当前状态,不做修改。

## 示例

```sh
magpie autostart on
magpie autostart
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- 自启的是菜单栏形态的应用;想开机运行纯网关守护进程,用 [`magpie daemon install`](cli:command:daemon/install) 而不是本命令。

## 源码补充

- 状态读取与设置见 [autostart_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/autostart_cli.go)。
