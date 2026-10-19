---
title: magpie daemon start
command:
  - daemon
  - start
---

启动已安装的 magpie 系统服务。

## 简介

`magpie daemon start` 启动 [`magpie daemon install`](cli:command:daemon/install) 安装的服务。服务本身具备"停止后自动重启"的属性,本命令用于手动拉起(例如刚安装完、或被手动 [`stop`](cli:command:daemon/stop) 之后)。

命令执行后会等待网关应答(最长约 5 秒)并在应答时打印网关地址;超时则提示服务日志路径。

## 使用提醒

- 服务未安装时先运行 [`magpie daemon install`](cli:command:daemon/install)。

## 源码补充

- 见 [daemon_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/daemon_cli.go)(`case "start": err = daemon.Start()`)。
