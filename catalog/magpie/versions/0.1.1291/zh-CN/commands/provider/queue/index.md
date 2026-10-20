---
title: magpie provider queue
command:
  - provider
  - queue
---

设定账户/密钥超限后多少请求可以等待、等多久。

## 简介

每个订阅账户或密钥超过并发上限后,允许最多 `length` 个请求排队,每个最多等 `seconds` 秒;超出任一界限的请求以 429 拒绝。`0` 表示不设该界限。不带值时显示当前设置。

## 参数

### `id`

`<id>`。目标 provider 的 id。

### `length`

`[length`。队列长度上限。

### `seconds`

`[seconds]]`。单个请求最长等待秒数。

## 示例

```sh
magpie provider queue claude 10 120
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 处理逻辑见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `queueCmd()`。
