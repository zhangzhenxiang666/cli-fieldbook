---
title: magpie model disable
command:
  - model
  - disable
---

全局关闭模型:对所有经过 magpie 的请求生效。

## 简介

每个参数是一个 id(`provider/model` 或裸模型 id)或 glob(`*` 匹配任意字符序列、`?` 匹配单个字符,如 `*fable*`)。被禁用的模型离开一切列表与路由组,网关在每条路由上拒绝它(403)。

shell 中给 glob 加引号,避免被展开。

## 参数

### `model`

`<model>`。要禁用的模型 id 或 glob,可一次给出多个。

## 使用提醒

- 解除见 [`model enable`](cli:command:model/enable),当前列表见 [`model disabled`](cli:command:model/disabled)。
- 与 [`provider off`](cli:command:provider/off) 的区别:后者关闭整个 provider(保留密钥,agent 不再获得其模型),本命令按模型 id 或 glob 精确关闭。

## 示例

```sh
magpie model disable '*fable*'
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 实现见 [model_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/model_cli.go) 中的 `modelDisable`。
