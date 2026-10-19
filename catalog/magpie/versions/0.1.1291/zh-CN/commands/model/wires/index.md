---
title: magpie model wires
command:
  - model
  - wires
---

列出各厂商实际被请求时使用的模型线路名。

## 简介

显示每个模型"厂商被请求的名称"与你设置的线路名(wire)。未设置的按 magpie 已知的原始名称请求。设置入口见 [`model wire`](cli:command:model/wire)。

## 源码补充

- 实现见 [model_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/model_cli.go) 中的 `modelWires`。
