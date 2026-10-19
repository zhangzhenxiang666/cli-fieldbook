---
title: magpie gateway-key rotate
command:
  - gateway-key
  - rotate
---

给一个网关密钥换新值,旧值立即失效。

## 简介

按 ID 轮换密钥:生成新值并打印一次,名字、限额与可用范围设置保持不变;仍用旧值的客户端立刻被拒绝。

## 参数

### `id`

要轮换的密钥 ID,见 [`list`](cli:command:gateway-key/list)。

## 使用提醒

- 新值只打印一次;使用旧值的客户端会立刻被拒绝,需要换成新值。
- 轮换不改变该密钥的名字、限额与可用范围设置。

## 源码补充

- 分发至 access 层的 rotate-key 见 [gateway_keys_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/gateway_keys_cli.go)。
