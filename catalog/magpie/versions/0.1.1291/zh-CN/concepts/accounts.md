---
title: 订阅账户
uses:
  - command:accounts
  - command:quota
---

# 订阅账户

magpie 能读取你已登录的订阅(Claude、ChatGPT、Copilot、Gemini、Antigravity 等),把它们变成可被**其他** agent 使用的 provider:比如让 Codex 走你的 Claude 订阅。

## 发现与添加

- **自动发现**(默认开):magpie 读取各 agent 的登录文件与钥匙串,登记订阅;[`magpie accounts discovery off`](cli:command:accounts/discovery) 关闭(或环境变量 `MAGPIE_NO_ACCOUNTS=1`)。
- **手动添加**:[`magpie accounts add claude`](cli:command:accounts/add) 再登入一个订阅;同一家的多个订阅可以并存,各自记账。
- **导入**:[`magpie accounts import`](cli:command:accounts/import) 从其他工具的凭据文件(Codex 的 auth.json、CLIProxyAPI 等)导入;来源工具会被登出。

## 额度、切换与别名

- [`magpie accounts`](cli:command:accounts):每个订阅的额度使用与重置时间;
- [`magpie accounts switch <agent> <email>`](cli:command:accounts/switch):把 agent 换到另一个账户;
- [`magpie accounts alias`](cli:command:accounts/alias):给账户起名,显示在卡片、菜单栏与 [`magpie quota`](cli:command:quota);
- [`magpie accounts switch-only codex`](cli:command:accounts/switch-only):例外模式——只切换 Codex 自己的登录,请求直连 OpenAI、不过网关。

## 作为 provider 的行为

订阅 provider 的模型按订阅计划配额服务;配额耗尽时由 fallback 或路由组内的下一个账户接管(见 [路由组](routing-groups.md))。份额上限(`account-cap`)与并发上限(`account-concurrency`)在 [`magpie provider`](cli:command:provider) 下按账户设置。

## 刷新与签到

- [`magpie accounts refresh`](cli:command:accounts/refresh):立即续期已存的 ChatGPT 登录(网关平时每日自动做);
- [`magpie accounts checkin`](cli:command:accounts/checkin):WorkBuddy 每日签到,可在 Settings 设为自动。

## 安全提醒

订阅凭据属于高敏感数据:发现功能会读取 agent 的登录文件,介意的话用 `discovery off`;备份文件用口令封存,口令丢失无法恢复。

## 来源

- 订阅桥接架构:docs/subsystems/providers-accounts.md、claude-subscription-bridge.md(固定提交)
- 全部子命令:internal/cli/accounts_cli.go(固定提交)
