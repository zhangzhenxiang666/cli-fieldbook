---
title: magpie daemon status
command:
  - daemon
  - status
---

查看 magpie 系统服务的状态;`magpie daemon` 不带子命令时即执行本命令。

## 简介

`magpie daemon status` 报告服务是否安装、是否在运行,以及网关是否应答。安装或启动类命令([`install`](cli:command:daemon/install)、[`start`](cli:command:daemon/start)、[`restart`](cli:command:daemon/restart))完成时输出的信息与此一致:服务文件路径、TLS 状态、附带的 web 页面链接等。

## 使用提醒

- 配合 [`magpie healthcheck`](cli:command:healthcheck) 可在容器或脚本里以退出码探测网关是否应答。

## 源码补充

- 见 [daemon_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/daemon_cli.go)(`case "status": return daemonStatus()`;`parseDaemon` 的默认命令即 `status`)。
