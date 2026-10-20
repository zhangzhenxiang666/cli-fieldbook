---
title: magpie provider account-concurrency
command:
  - provider
  - account-concurrency
---

限制单个订阅账户或密钥同时在外的请求数。别名 `account-limit`。

## 简介

该上限作用于账户/密钥维度,覆盖它服务的所有模型、路由组与 agent:`n` 为其自有上限,`off` 不限制,`default` 回到 provider 级设置。不带值时显示当前设置。

## 参数

### `id`

`<id>`。目标 provider 的 id。

### `account`

`[account|key`。订阅账户名或密钥标识。

### `n`

`[n|off|default]]`。并发上限,或 `off` / `default`。

## 示例

```sh
magpie provider account-concurrency claude <account> 3
magpie provider account-concurrency claude <account> default
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 处理逻辑见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `accountConcurrencyCmd()`。
