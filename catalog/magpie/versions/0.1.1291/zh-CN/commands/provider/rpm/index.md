---
title: magpie provider rpm
command:
  - provider
  - rpm
---

限制每个订阅账户/密钥每分钟发给厂商的请求数。

## 简介

`n` 为每分钟请求上限;超出的请求等待空位,最多等 2 分钟,仍无空位则以 429 拒绝。`off` 关闭限制。不带值时显示当前设置。

## 参数

### `id`

`<id>`。目标 provider 的 id。

### `n`

`[n|off]`。每分钟请求上限,或 `off`。

## 示例

```sh
magpie provider rpm deepseek 60
magpie provider rpm deepseek off
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 处理逻辑见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `rpmCmd()`。
