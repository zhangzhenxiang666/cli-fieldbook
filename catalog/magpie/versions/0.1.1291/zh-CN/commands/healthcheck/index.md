---
title: magpie healthcheck
command:
  - healthcheck
---

探测网关是否应答:应答则以退出码 0 退出,用于容器的 HEALTHCHECK。

## 简介

`magpie healthcheck` 向网关地址发一次 HTTP 请求并检查响应:状态码为 200 且响应体包含 `"magpie"` 标识才算通过。它专为容器 HEALTHCHECK 设计——容器里往往没有 curl 可用,而这个命令随 magpie 自带。

网关地址取环境变量 `MAGPIE_ADDR`,未设置时用 Settings 的网关端口(默认 `127.0.0.1:3425`)。请求超时为 3 秒。

## 使用提醒

- 退出码非 0 即不健康;错误信息写明原因(连不上、非 200、响应不像 magpie)。
- 本命令只探测,不启动任何东西;网关的运行形态见 [`magpie serve`](cli:command:serve) 与 [`magpie daemon`](cli:command:daemon)。

## 源码补充

- 见 [healthcheck_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/healthcheck_cli.go)。
