---
title: magpie daemon stop
command:
  - daemon
  - stop
---

停止 magpie 系统服务。

## 简介

`magpie daemon stop` 停止运行中的服务进程,网关随之下线。服务的"停止后自动重启"针对的是进程异常退出,手动 stop 不会触发自动拉起。

## 使用提醒

- 停止后各 agent 的请求不再被代理,直到服务再次启动([`magpie daemon start`](cli:command:daemon/start))。
- 彻底移除服务用 [`magpie daemon uninstall`](cli:command:daemon/uninstall)。

## 源码补充

- 见 [daemon_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/daemon_cli.go)(`case "stop": … daemon.Stop()`)。
