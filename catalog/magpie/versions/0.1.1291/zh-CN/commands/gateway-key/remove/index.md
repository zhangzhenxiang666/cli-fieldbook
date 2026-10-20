---
title: magpie gateway-key remove
command:
  - gateway-key
  - remove
---

删除一个网关密钥,使用它的客户端从此被拒绝。

## 简介

按 ID 删除一个网关密钥;其限额与可用范围设置一并消失,无法恢复。

## 参数

### `id`

要删除的密钥 ID,见 [`list`](cli:command:gateway-key/list)。

## 使用提醒

- 删除成功打印 `Gateway key removed`;该密钥的限额与范围设置一并消失,无法恢复。
- 只想暂时停用一个密钥的用量,可考虑先收紧其 [`limit`](cli:command:gateway-key/limit) 而不是删除。

## 源码补充

- 分发至 access 层的 remove-key 见 [gateway_keys_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/gateway_keys_cli.go)。
