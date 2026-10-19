---
title: magpie daemon install
command:
  - daemon
  - install
---

安装 magpie 网关为系统服务(Linux systemd `--user`,macOS launchd),从开机或登录起运行、停止后自动重启。

## 简介

`magpie daemon install` 把 [`magpie serve`](cli:command:serve) 写成用户级系统服务。再次安装(例如换 PATH、开页面)时保留原有配置:web 页面的密钥保持不变,浏览器登录状态不丢;证书同理,除非本次明确给出新的或用 `--no-tls` 撤销。

## 选项

### `--web`

让服务同时服务 [`magpie web`](cli:command:web) 的页面(从同一进程,默认地址 `127.0.0.1:3430`)。

### `--lan`

页面监听 `0.0.0.0`,局域网可访问;与 `--web`、[`magpie daemon web on`](cli:command:daemon/web) 配合使用。

### `--addr`

`--addr host:port`。页面监听地址。给出 `--addr` 或 `--lan` 即意味着页面开启。

### `--no-web`

明确不服务页面(与 `--web` 互斥,同时给出报错)。

### `--tls-cert`

`--tls-cert <file>`。PEM 证书,与 `--tls-key` 成对;写入服务(以 `MAGPIE_TLS_CERT`/`MAGPIE_TLS_KEY` 形式),让页面与网关对其他电脑以 `https://` 服务。证书与 `--no-tls` 互斥。

### `--tls-key`

`--tls-key <file>`。PEM 私钥,与 `--tls-cert` 成对。

### `--no-tls`

撤销服务已保存的 TLS 配置;与任何证书参数互斥。

## 示例

```sh
magpie daemon install --web --lan --tls-cert cert.pem --tls-key key.pem
magpie daemon install --no-web
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- 页面密钥跨安装保持:优先取环境变量 `MAGPIE_WEB_KEY`,其次服务已有密钥,否则新生成。
- 证书对无法加载时在写入任何内容之前即报错拒绝,不会让服务以意外的明文 HTTP 运行。

## 源码补充

- 参数解析(`parseDaemon`)、TLS 携带(`keepTLS`)与安装流程见 [daemon_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/daemon_cli.go)。
