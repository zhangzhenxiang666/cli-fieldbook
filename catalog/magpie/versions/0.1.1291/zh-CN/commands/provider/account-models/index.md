---
title: magpie provider account-models
command:
  - provider
  - account-models
---

查看或设定单个订阅账户/密钥独自服务的模型。别名 `account-model`。

## 简介

面向有多个账户或密钥的 provider:限制某个账户或 key 只服务指定模型,避免所有请求压在同一账户上。`all` 表示该 provider 的全部模型。不带 account 时显示各账户/密钥当前的模型分配。

## 参数

### `id`

`<id>`。目标 provider 的 id。

### `account`

`[account|key`。订阅账户名或密钥标识。

### `ids`

`[ids…|all]]`。该账户服务的模型 id;`all` 为全部。

## 使用提醒

- 该命令服务于订阅计划类 provider;自定义 provider 通常只有一个 key,无需划分。

## 示例

```sh
magpie provider account-models copilot
magpie provider account-models copilot <account> <model-id>
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 处理逻辑见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `accountModelsCmd()`。
