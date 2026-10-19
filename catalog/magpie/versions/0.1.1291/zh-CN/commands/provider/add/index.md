---
title: magpie provider add
command:
  - provider
  - add
---

添加一个 provider:预置厂商只需一个 key,自定义服务商用 k=v 描述。

## 简介

两种形态:

- `magpie provider add <preset> <key>`:按预置厂商添加(如 `magpie provider add deepseek sk-…`),厂商列表见 [`presets`](cli:command:presets)。同一 preset 再次添加会生成带 `-2` 后缀的新 id(如 `deepseek-2`),也可附带 k=v 对(如 `id=`、`name=`、`header.X-Foo=`)。
- `magpie provider add <name> k=v…`:添加自定义服务商。可用的 k 包括:`url`、`anthropic`、`responses`、`gemini`、`decide`、`key`、`models`、`catalog`、`icon`、`header.X-Foo`、`balance`、`balance.path`、`balance.method`、`balance.token`、`models.url`、`search`、`user-agent`、`access.key`、`access.secret`(火山引擎 AccessKey,或腾讯云 SecretId/SecretKey,用于其计划窗口)。

`url` 指 OpenAI 兼容端点;`anthropic`、`responses`、`gemini` 分别补充对应协议的端点;`catalog` 指定按哪个厂商的目录展示模型(如 `catalog=anthropic`)。

## 参数

### `preset`

`<preset>`。预置厂商的 id(见 [`presets`](cli:command:presets)),如 `deepseek`、`openai`、`moonshot-cn`。

### `key`

`<key>`。该厂商的 API key。预置厂商也可以不给 key 而直接给 k=v 对。

## 使用提醒

- 被你移除过的订阅账户 provider,用其 id 重新 `add` 会带着原有挑选恢复。
- Google Vertex 不用 key:用 Google 凭据签名,`provider add google-vertex project=<project id>` 并可加 `impersonate=<service account>`、`credentials=<file>`、`location=`。
- 添加另一台电脑的 magpie:`magpie provider add remote-magpie sk-magpie-… url=http://192.168.1.20:3425 id=office`,其模型与路由组以 `office/…` 出现。
- balance 系列配置余额查询端点;`balance.path` 支持取值表达式与算术(见 providerUsage 原文)。

## 示例

```sh
magpie provider add deepseek sk-…
magpie provider add "My Relay" url=https://relay.example.com/v1 key=sk-… header.X-Org-Id=acme
magpie provider add "Own Claude" anthropic=https://gw.example.com key=sk-… catalog=anthropic
magpie provider add ollama url=http://192.168.1.5:11434/v1 anthropic=http://192.168.1.5:11434
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 添加逻辑与 k=v 解析见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `addProvider()` 与 providerUsage 常量。
