---
title: magpie model enable
command:
  - model
  - enable
---

把模型从禁用列表中移除,参数按禁用列表中的原样书写。

## 简介

与 [`model disable`](cli:command:model/disable) 相对的解除操作:按禁用列表里的写法(同样的 id 或 glob)逐个移除。

## 参数

### `model`

`<model>`。要解除禁用的模型 id 或 glob,按 [`model disabled`](cli:command:model/disabled) 列表中的原样书写,可一次给出多个。

## 源码补充

- 实现见 [model_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/model_cli.go) 中的 `modelEnable`。
