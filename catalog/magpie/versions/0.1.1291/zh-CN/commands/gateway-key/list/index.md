---
title: magpie gateway-key list
command:
  - gateway-key
  - list
---

列出全部网关密钥:状态、脱敏的密钥值、限额用量、可用模型与账户。

## 简介

`magpie gateway-key list` 以表格列出每个网关密钥,列依次为 ID、NAME、STATE(enabled/disabled)、GATEWAY KEY(脱敏显示)、LIMIT、MODELS、ACCOUNTS。

LIMIT 列在每个限额的窗口内显示已用与上限(如 `1200/1000000 tokens per day; $1.00/$20.00 per week`),耗尽的注明恢复时间;无限额显示 `-`。MODELS 与 ACCOUNTS 未限定时显示 `all`。

## 使用提醒

- 不带子命令的 `magpie gateway-key` 与本命令等价。
- 想看某个密钥各限额的详细窗口与剩余,用 [`limit`](cli:command:gateway-key/limit) 不带修改参数的形式。

## 源码补充

- 表格与 limitWords 的拼装见 [gateway_keys_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/gateway_keys_cli.go)。
