---
title: magpie gateway-key models
command:
  - gateway-key
  - models
---

查看或限定一个网关密钥可以调用的模型。

## 简介

不带模型清单时显示该密钥当前可用的模型;带清单时设置白名单,`all` 恢复全部。限定后请求清单之外的模型会被拒绝。

## 参数

### `id`

密钥 ID,见 [`list`](cli:command:gateway-key/list)。

### `models`

可用模型清单。`all` 恢复全部模型;否则列出允许的 `provider/model` 或 `provider/*`(整个 provider)模式,可多个。不带此参数时只显示当前设置。

## 使用提醒

- 限定后,该密钥请求清单之外的模型会被拒绝;[`list`](cli:command:gateway-key/list) 的 MODELS 列显示 `all` 或具体清单。
- 想同时按订阅账户限制,源码另有 `gateway-key accounts` 子形式(主帮助未列出)。

## 示例

```sh
magpie gateway-key models k1 deepseek/* moonshot/kimi-k2.5
magpie gateway-key models k1 all
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 白名单的设置与显示见 [gateway_keys_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/gateway_keys_cli.go)。
