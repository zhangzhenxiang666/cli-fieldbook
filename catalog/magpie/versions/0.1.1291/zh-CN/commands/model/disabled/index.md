---
title: magpie model disabled
command:
  - model
  - disabled
---

显示禁用列表,以及每一条当前实际挡掉的模型。别名 `model list-disabled`。

## 简介

列出全部禁用条目(id 或 glob)与每个条目现在命中的模型。配合 [`model enable`](cli:command:model/enable) 按原样解除。

## 源码补充

- 实现见 [model_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/model_cli.go) 中的 `modelDisabled`。
