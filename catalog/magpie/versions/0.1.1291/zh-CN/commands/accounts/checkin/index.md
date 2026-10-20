---
title: magpie accounts checkin
command:
  - accounts
  - checkin
---

对每个 WorkBuddy 账户立即执行每日签到。

## 简介

WorkBuddy 订阅有每日签到(领取额度)机制。本命令对所有 WorkBuddy 账户立即签到一次;平时可在应用的 Settings 里设为每日自动执行。

## 选项

### `--json`

以 JSON 输出签到结果,适合脚本处理。

## 使用提醒

- 只有 WorkBuddy 账户参与签到;其他订阅忽略。

## 源码补充

- 实现见 [accounts_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/accounts_cli.go)。
