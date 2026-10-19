---
title: magpie provider account-cap
command:
  - provider
  - account-cap
---

限制一个订阅账户在每个用量窗口内最多用掉多大份额。别名 `account-caps`。

## 简介

给订阅账户设百分比份额(如 `70`):达到后路由把该账户视为已用尽,直到窗口刷新。`off` 关闭。也可以用 `--window` 为单个窗口单独设份额:`none` 表示该窗口不设限,`default` 表示跟随账户的整体份额。不带值时显示当前设置。

## 参数

### `id`

`<id>`。目标 provider 的 id。

### `account`

`[account`。订阅账户名。

### `percent`

`[percent|off]]`。份额百分比,或 `off` 关闭。

## 选项

### `--window`

`--window <name>`。只针对指定窗口(如 `"5 hours"`)设置份额,取值 `percent|none|default`。

## 示例

```sh
magpie provider account-cap claude 70
magpie provider account-cap claude <account> --window "5 hours" 50
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 处理逻辑见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `accountCapCmd()`。
