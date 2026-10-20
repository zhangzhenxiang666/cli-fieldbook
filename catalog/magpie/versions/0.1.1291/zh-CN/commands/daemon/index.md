---
title: magpie daemon
command:
  - daemon
---

管理把 [`magpie serve`](cli:command:serve) 作为系统服务运行的守护进程(Linux 上是 systemd `--user`,macOS 上是 launchd)。

## 简介

`magpie daemon` 不带子命令时等价于 [`magpie daemon status`](cli:command:daemon/status)。安装为服务后,网关从开机或登录起运行,停止后自动再次启动,适合常驻服务器或作为家里所有设备共同的网关。

| 子命令 | 说明 |
|---|---|
| [`install`](cli:command:daemon/install) | 安装服务(可同时让服务托管 web 页面、TLS) |
| [`uninstall`](cli:command:daemon/uninstall) | 卸载服务(别名 `remove`) |
| [`start`](cli:command:daemon/start) | 启动服务 |
| [`stop`](cli:command:daemon/stop) | 停止服务 |
| [`restart`](cli:command:daemon/restart) | 重启服务 |
| [`status`](cli:command:daemon/status) | 查看服务状态 |
| [`web`](cli:command:daemon/web) | 管理服务附带的 web 页面 |

install、start、restart 完成后会等待网关应答(最长约 5 秒);未应答时提示服务日志路径,不视为失败。

## 使用提醒

- 服务以当前用户身份运行(`systemd --user` / launchd 用户代理),不需要 root。
- 安装时若 PATH 上没有 Node.js,会提示:插件及其启动的 MCP 服务器需要 Node.js,装好后重新 `magpie daemon install`。

## 源码补充

- 命令分发、参数解析与等待逻辑见 [daemon_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/daemon_cli.go)。
