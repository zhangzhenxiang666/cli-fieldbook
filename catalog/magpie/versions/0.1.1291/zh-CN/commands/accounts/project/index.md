---
title: magpie accounts project
command:
  - accounts
  - project
---

指定某个 Google 账户的请求走哪个 Google Cloud 项目。

## 简介

Gemini CLI 与 Antigravity 的订阅走 Google Cloud;一个 Google 账户的请求发到哪个 GCP 项目由此设定。项目名写空字符串则取消关联(该账户不再指定项目)。

## 参数

### `agent`

`<gemini|antigravity>`。只这两家走 Google Cloud 项目。

### `email`

`<email>`。要设置的 Google 账户(接受 [`magpie accounts alias`](cli:command:accounts/alias) 起的名字)。

### `project`

`<project>`。GCP 项目 id;留空取消关联。

## 示例

```sh
magpie accounts project gemini me@example.com my-gcp-project
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- 配额与结算都记在所选项目上;选错项目可能命中该项目的配额限制。

## 源码补充

- 实现见 [accounts_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/accounts_cli.go)。
