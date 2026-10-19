---
title: magpie gateway-key quotas
command:
  - gateway-key
  - quotas
---

查看或设置是否向一个被限额、限模型的网关密钥告知其可用范围的配额。

## 简介

密钥被预算、模型或账户范围约束时,`on` 让网关把它可用的 provider 与账户的配额卡片也告知它(它便能看到自己还剩多少);`off` 则不告知。两态都不带时显示当前设置。

## 参数

### `id`

密钥 ID,见 [`list`](cli:command:gateway-key/list)。

### `state`

`on` 或 `off`;缺省时只显示当前状态。

## 使用提醒

- 该设置只影响"告知与否",不影响限额本身的执行;限额始终生效。

## 源码补充

- quotas-key 设置与状态输出见 [gateway_keys_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/gateway_keys_cli.go)。
