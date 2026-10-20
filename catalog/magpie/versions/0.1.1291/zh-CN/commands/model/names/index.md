---
title: magpie model names
command:
  - model
  - names
---

列出你改过显示名或收窄过 reasoning 档位的模型。别名 `model ls`、`model list`。

## 简介

只列出被你显式设置过的模型:用过 [`model name`](cli:command:model/name) 改名、或用过 [`model efforts`](cli:command:model/efforts) 收窄档位的条目。未改动过的模型不在列表中。

## 使用提醒

- 与 [`model prices`](cli:command:model/prices)、[`model wires`](cli:command:model/wires) 分别对应三类自定义记录。

## 源码补充

- 实现见 [model_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/model_cli.go) 中的 `modelNames`。
