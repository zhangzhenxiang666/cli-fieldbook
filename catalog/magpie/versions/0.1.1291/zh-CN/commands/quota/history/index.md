---
title: magpie quota history
command:
  - quota
  - history
---

查看各订阅与计划的额度窗口随时间的历史读数,保留 45 天。

## 简介

每次读数在读取时刻入库(UTC 时间,只在变化时记录;每个窗口按其恢复时间分开)。不带参数时显示每个窗口的最新读数;带 `--json` 时输出自 `--days` 天前起的全部读数。网关在 `GET /v1/magpie/quotas/history?days=&provider=&user=` 提供同样的数据。

一个读数保存于读取它的时刻:比如 Claude 账户的额度只有 Claude Code 应答或运行 `/usage` 时才被告知,展示不会重复入库。

## 参数

### `target`

`[<provider|account>]`。缩小范围:provider 的 id 或名称、账户的邮箱或登录名,或 `<provider>/<account>`;源码用法允许同时给多个。

## 选项

### `--days`

`--days N`(`-n`)。看最近 N 天的读数。

### `--json`

以 JSON 输出全部历史读数(不带时只显示各窗口最新一条)。

## 示例

```sh
magpie quota history codex --days 7
magpie quota history --json
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 参数解析与输出见 [quota_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/quota_cli.go)。
