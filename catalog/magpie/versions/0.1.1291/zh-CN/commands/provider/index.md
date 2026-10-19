---
title: magpie provider
command:
  - provider
---

查看一个 provider 及其模型,或经子命令管理它。

## 简介

`magpie provider <id>` 显示单个 provider 的详情:密钥状态、暴露的模型、路由组归属等。子命令负责添加、修改、测试与删除。

## 参数

### `id`

`<id>`。provider 的 id(见 [`providers`](cli:command:providers) 列表)。不带子命令时显示该 provider 详情。

## 子命令速览

| 子命令 | 作用 |
|---|---|
| [`add`](cli:command:provider/add) | 添加预置厂商或自定义服务商 |
| [`set`](cli:command:provider/set) | 修改设置(k=v 对,与 add 相同) |
| [`key`](cli:command:provider/key) | 更换 API key |
| [`icon`](cli:command:provider/icon) | 给自定义 provider 设置图标 |
| [`fallback`](cli:command:provider/fallback) | 配额耗尽或宕机时的兜底模型 |
| [`models`](cli:command:provider/models) | 拉取厂商模型列表或挑选暴露哪些 |
| [`refresh-every`](cli:command:provider/refresh-every) | 网关自动重新拉取的间隔 |
| [`auto-include`](cli:command:provider/auto-include) | 按 id 规则自动暴露新模型 |
| [`account-models`](cli:command:provider/account-models) | 单个订阅账户/密钥服务的模型 |
| [`account-cap`](cli:command:provider/account-cap) | 订阅账户的使用量份额上限 |
| [`account-concurrency`](cli:command:provider/account-concurrency) | 单账户并发上限 |
| [`queue`](cli:command:provider/queue) | 超限后的等待队列长度与时长 |
| [`rpm`](cli:command:provider/rpm) | 每分钟请求数上限 |
| [`quota-rest`](cli:command:provider/quota-rest) | 厂商未说明恢复时间时的休息时长 |
| [`rest-cap`](cli:command:provider/rest-cap) | 连续失败/限流时的最长休息时长 |
| [`listed`](cli:command:provider/listed) | 模型是否出现在 agent 可见列表 |
| [`off`](cli:command:provider/off) / [`on`](cli:command:provider/on) | 关闭(保留) / 重新启用 |
| [`rm`](cli:command:provider/rm) | 删除 |
| [`test`](cli:command:provider/test) | 向每个端点发一个小请求验证连通性 |

## 使用提醒

- `magpie provider help` 打印本族完整用法(providerUsage 常量)。

## 源码补充

- 子命令分发见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `providerCmd()`。
