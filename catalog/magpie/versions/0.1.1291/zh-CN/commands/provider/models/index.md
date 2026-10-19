---
title: magpie provider models
command:
  - provider
  - models
---

拉取厂商模型列表,或挑选暴露哪些模型。别名 `refresh`、`fetch`。

## 简介

两种用法:

- `magpie provider models <id>`(或 `refresh` / `fetch`):重新拉取厂商模型列表(30 秒超时),随后显示 provider 详情。auto-include 规则会自动收下新出现的模型;从厂商列表消失的模型会从挑选中移除。
- `magpie provider models <id> ids…`:挑选暴露哪些模型——`ids…` 整体替换列表,`+id` 增加一个,`-id` 移除一个,`all` 恢复默认全量,`none` 一个也不暴露(provider 保留,余额与用量仍显示)。

`refresh` / `fetch` 别名只负责拉取,不接受 ids。

## 参数

### `id`

`<id>`。目标 provider 的 id。

### `ids`

`[ids…]`。要暴露的模型 id 列表,支持 `+id`、`-id`、`all`、`none`。

## 使用提醒

- 挑选只影响 agent 可见的模型列表;订阅账户类 provider 的模型另受 [`provider account-models`](cli:command:provider/account-models) 约束。

## 示例

```sh
magpie provider models deepseek
magpie provider models deepseek +deepseek-reasoner
magpie provider models my-relay none
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 拉取与挑选(`editPicks`)见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `providerCmd()` 的 `models` 分支。
