---
title: magpie quota
command:
  - quota
---

查看每个订阅、计划与密钥余额还剩多少:各窗口的用量与恢复时间。

## 简介

向各厂商实时(或不到一分钟内)读取额度:每个订阅计划各窗口(如 5 小时、每周)已用多少、何时恢复,以及各 API 密钥的余额。可只看某个 provider。

带 `--json` 时每个条目含 `lastServedAt`(最近一次经网关应答的时间);网关自身在 `GET http://127.0.0.1:3425/v1/magpie/quotas` 提供同样的数据(仅在 magpie 共享到局域网时对其他机器开放,以网关密钥认证)。

## 参数

### `provider`

`[<provider>]`。只显示匹配的 provider(按 id 或名称,忽略大小写);源码用法允许同时给多个。

## 选项

### `--json`

以 JSON 输出,供脚本与 agent 使用。

## 使用提醒

- `magpie quota` 是用户主动询问:即使平时只在被问到时读额度,这里也会现读。
- 子命令:[`wait`](cli:command:quota/wait) 阻塞等待额度恢复,[`history`](cli:command:quota/history) 看历史读数。
- 源码另有 `quota reset`、`auto-reset`、`credits`、`alert`、`refresh` 子形式(见 `magpie quota help`),主帮助未列出,本版命令参考未单独收录。

## 示例

```sh
magpie quota
magpie quota codex --json
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 分发、过滤与 JSON 输出见 [quota_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/quota_cli.go)。
