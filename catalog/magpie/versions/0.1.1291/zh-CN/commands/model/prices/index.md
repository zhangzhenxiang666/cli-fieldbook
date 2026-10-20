---
title: magpie model prices
command:
  - model
  - prices
---

列出你设置过价格的模型。

## 简介

显示所有被你显式定价的条目,含 `provider/model` 与 `*/<model>` 形式的通配定价。未定价的模型按 models.dev 或 provider 列表的默认价格计费,不在本列表中。

## 使用提醒

- 设置与移除见 [`model price`](cli:command:model/price)。

## 源码补充

- 实现见 [model_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/model_cli.go) 中的 `modelPrices`。
