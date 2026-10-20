---
title: magpie model suffix
command:
  - model
  - suffix
---

控制 agent 列表中模型名是否带 provider(或"routing group")后缀。别名 `model suffixes`。

## 简介

三种取值:

- `on`(默认):"Sol · OpenAI" —— 名称后带 provider 名。
- `own`:你为模型起的名字按你写的原样显示(如 "Opus 5.5"),其余模型同 `on`。
- `off`:"Sol" 只显示名称 —— 但若两个条目会因此同名,则保留后缀以区分。

不带参数时显示当前设置。

## 参数

### `mode`

`[on|own|off]`。目标模式。省略时为查看。

## 使用提醒

- 只影响呈现,不影响标识与路由。
- 显示名的设置见 [`model name`](cli:command:model/name)。

## 源码补充

- 实现见 [model_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/model_cli.go) 中的 `modelSuffix`。
