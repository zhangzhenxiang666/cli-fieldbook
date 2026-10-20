---
title: magpie accounts
command:
  - accounts
---

列出 magpie 记住的全部订阅账户:每个账户的额度窗口用了多少、何时重置(别名 `account`)。

## 简介

订阅(Claude、ChatGPT、Copilot、Gemini、Antigravity、Zed、Factory、MiMo 以及插件添加的订阅)由 magpie 统一记账。本命令逐行显示每个账户:

- 标记 `●` 表示 agent 当前登录的账户,`○` 表示排队待命的账户(当前的耗尽后顶上);
- 每个额度窗口的用量与重置时间;有余额(ChatGPT credits)或 rate-limit 重置的单独列出;
- 已用 [`magpie accounts alias`](cli:command:accounts/alias) 起名的账户按名字显示。

额度读数有缓存:不到一分钟前的读数直接复用。空列表时提示先 [`magpie accounts add`](cli:command:accounts/add)。

## 参数

### `agent`

`[claude|codex|grok|copilot|gemini|antigravity|zed|factory|mimo|<plugin>]`。只看某一家的账户。省略时列出全部;`grok`、`copilot` 之外的别名(`cc`、`ag`、`droid` 等)同样可用。

## 选项

### `--json`

以 JSON 输出(`agent`、`user`、`plan`、`active`、`on`、`windows`、`balance`、`resets`、`alias` 等字段),适合脚本处理。

## 使用提醒

- 相关操作:添加账户见 [`accounts add`](cli:command:accounts/add),切换见 [`accounts switch`](cli:command:accounts/switch),额度总览(含 API key 厂商)见 [`magpie quota`](cli:command:quota)。
- 自动发现是否读取 agent 登录由 [`accounts discovery`](cli:command:accounts/discovery) 控制。

## 源码补充

- 列表、标记与 JSON 字段见 [accounts_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/accounts_cli.go)。
