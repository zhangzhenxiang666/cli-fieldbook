---
title: magpie provider rest-cap
command:
  - provider
  - rest-cap
---

密钥或账户连续失败、被限流时,最长的休息时长。

## 简介

持续失败或被限流的密钥按指数退避休息:从 1 分钟起每次翻倍,上限为该设置。默认失败休息 10 分钟、限流休息 30 分钟,至多 8 天(providerUsage 原文)。取值:

- 固定上限:`1m`、`30m`、`6h`、`1d`
- `off`:无原因的失败(如中转的 5xx)完全不休息;配额耗尽、key 被拒、被限流仍会休息
- `default`:回到默认

## 参数

### `id`

`<id>`。目标 provider 的 id。

### `duration`

`[1m|30m|6h|1d|off|default]`。休息时长上限。

## 示例

```sh
magpie provider rest-cap my-relay 30m
magpie provider rest-cap my-relay off
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 处理逻辑与默认值见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `restCapCmd()` 与 providerUsage 常量。
