---
title: magpie provider quota-rest
command:
  - provider
  - quota-rest
---

厂商说"配额用完"却没说何时恢复时,该密钥休息多久。

## 简介

厂商响应配额耗尽但未给出恢复时间时,密钥按此设置休息:固定时长(`30m`、`6h`、`7d`,上限 8 天)、`until 08:00` 到本机时钟的指定时刻、`until 00:00+08:00` 到厂商 UTC 偏移下的指定时刻(适合每日刷新的配额)。默认 15 分钟;`default` 回到默认。不带值时显示当前设置。

## 参数

### `id`

`<id>`。目标 provider 的 id。

### `duration`

`[30m|6h|7d|until 08:00|until 00:00+08:00|default]`。休息时长或恢复时刻;默认 15 分钟(providerUsage 原文)。

## 示例

```sh
magpie provider quota-rest my-relay 6h
magpie provider quota-rest my-relay "until 00:00+08:00"
magpie provider quota-rest my-relay default
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 处理逻辑与默认值见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `quotaRestCmd()` 与 providerUsage 常量。
