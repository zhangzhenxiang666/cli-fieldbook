---
title: magpie daemon uninstall
command:
  - daemon
  - uninstall
---

卸载 magpie 系统服务;别名 `magpie daemon remove`。

## 简介

`magpie daemon uninstall` 移除 [`magpie daemon install`](cli:command:daemon/install) 安装的服务定义并停止服务。magpie 的其他数据(provider、密钥、设置、账号)不受影响;应用、TUI 或 [`magpie serve`](cli:command:serve) 仍可照常运行网关。

## 使用提醒

- 只是临时停一下服务用 [`magpie daemon stop`](cli:command:daemon/stop),不必卸载。

## 源码补充

- 分发逻辑见 [daemon_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/daemon_cli.go)(`case "uninstall", "remove"`),实际卸载由 internal/daemon 包完成。
