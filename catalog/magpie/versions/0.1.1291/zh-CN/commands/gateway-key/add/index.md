---
title: magpie gateway-key add
command:
  - gateway-key
  - add
---

新建一个网关密钥并打印它的值。

## 简介

创建一个名为 `<name>` 的网关密钥。不带 `--key` 时生成新值并打印一次;带 `--key` 时保留一个客户端已在发送的值。

## 参数

### `name`

密钥的名字,显示在 [`list`](cli:command:gateway-key/list) 与用量统计中。

## 选项

### `--key`

`--key <key>`。让新密钥保持一个客户端已在发送的值,而不是生成新的。`--key -` 从 stdin 读取(至多 4096 字节,去掉首尾空白),避免密钥进入 shell 历史。

## 使用提醒

- 不带 `--key` 时生成新密钥,值只打印一次。
- 生成后可用 [`limit`](cli:command:gateway-key/limit)、[`models`](cli:command:gateway-key/models) 约束它的用量与范围。

## 示例

```sh
magpie gateway-key add laptop
magpie gateway-key add server --key -
```

以上示例为说明性内容,未实际运行。

## 源码补充

- `--key -` 的 stdin 读取与 add 分发见 [gateway_keys_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/gateway_keys_cli.go)。
