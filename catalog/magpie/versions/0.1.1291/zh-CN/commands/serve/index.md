---
title: magpie serve
command:
  - serve
---

单独运行网关(应用也内含同一网关);可选用 `--web` 让同一进程同时服务 web 页面。

## 简介

`magpie serve` 只启动网关,不打开任何界面,适合服务器、容器或 SSH 会话。启动后打印网关地址与各协议入口(OpenAI `/v1/chat/completions`、`/v1/responses`,Anthropic `/v1/messages` 等),各 agent 按 [`magpie ls`](cli:command:ls) 显示的接线方式把请求发过来。

需要开机自启与掉线自动重启时,用 [`magpie daemon install`](cli:command:daemon/install) 把本命令安装为系统服务;`--web` 正是服务形态的运行方式(页面看到的就是服务它的那个网关)。

## 选项

### `--web`

`--web[=host:port]`。同时服务 [`magpie web`](cli:command:web) 的页面,默认 `127.0.0.1:3430`;`--web=host:port` 指定其他地址。

### `--tls-cert`

`--tls-cert <file>`。PEM 证书,与 `--tls-key` 成对给出,让网关与页面对其他电脑以 `https://` 服务;也接受 `--tls-cert=<file>` 形式。

### `--tls-key`

`--tls-key <file>`。PEM 私钥,与 `--tls-cert` 成对使用。

## 示例

```sh
magpie serve
magpie serve --web --tls-cert cert.pem --tls-key key.pem
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- 证书也可以用环境变量 `MAGPIE_TLS_CERT` 与 `MAGPIE_TLS_KEY` 指定;只给其一或文件无法加载时拒绝启动。
- 另一个 magpie 已在服务网关时,本进程会在那一个停止后接管网关,并明确提示。
- 容器健康检查可直接用 [`magpie healthcheck`](cli:command:healthcheck)。
- Ctrl-C 停止。

## 源码补充

- 参数与启动流程见 [web_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/web_cli.go)(`serveCmd`),TLS 见 [tls_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/tls_cli.go)。
