---
title: magpie daemon restart
command:
  - daemon
  - restart
---

重启 magpie 系统服务。

## 简介

`magpie daemon restart` 重启服务进程:先停止再启动。升级 magpie 二进制后、或修改了需要重启才生效的配置后使用。与 [`stop`](cli:command:daemon/stop) + [`start`](cli:command:daemon/start) 等效,一条命令完成。

命令执行后同样等待网关应答(最长约 5 秒)并打印网关地址。

## 源码补充

- 见 [daemon_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/daemon_cli.go)(`case "restart": err = daemon.Restart()`)。
