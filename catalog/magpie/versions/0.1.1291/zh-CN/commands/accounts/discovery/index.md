---
title: magpie accounts discovery
command:
  - accounts
  - discovery
---

查看或开关"订阅账户自动发现":magpie 是否读取各 agent 自己的登录(凭据文件、钥匙串)并当作订阅来服务。

## 简介

- 不带参数:显示当前状态;
- `on`/`off`:写入设置并立即生效;`off` 同时清掉已发现的账户(API-key provider 不受影响);
- 环境变量 `MAGPIE_NO_ACCOUNTS=1` 可以只在本次运行禁用(保存的设置仍是 on,状态行会注明)。

对应应用里 Settings → Privacy 的 Subscription accounts。

## 参数

### `state`

`[on|off]`。省略时只显示状态。

## 使用提醒

- 关闭后订阅不再被自动读取,但手动 [`magpie accounts add`](cli:command:accounts/add) 的账户仍然工作;
- 这是隐私边界的总开关:介意 magpie 接触 agent 登录文件时用它。

## 源码补充

- 实现见 [account_discovery_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/account_discovery_cli.go)。
