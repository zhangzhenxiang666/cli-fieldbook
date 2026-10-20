---
title: magpie model
command:
  - model
---

模型的显示名、reasoning 档位、价格与限制等属性的统一管理入口。

## 简介

`magpie model` 是一组子命令,统一管理每个模型在 agent 眼中的呈现(名称、档位)与在统计中的口径(价格、上下文、输出上限),以及向厂商请求时使用的线路名(wire)。这些属性按"本模型 → `<provider id>/*` → provider 自身列表 → models.dev"的顺序查找生效;`--reset` 只移除第一层,若 `<provider id>/*` 的值仍然生效会明确说明。

子命令:

| 子命令 | 用途 |
|---|---|
| [`names`](cli:command:model/names) | 列出改过名或收窄过档位的模型 |
| [`name`](cli:command:model/name) | 模型的显示名 |
| [`efforts`](cli:command:model/efforts) | 模型提供的 reasoning 档位 |
| [`price`](cli:command:model/price) / [`prices`](cli:command:model/prices) | 模型价格 / 已定价列表 |
| [`wires`](cli:command:model/wires) / [`wire`](cli:command:model/wire) | 线路名查询 / 设置 |
| [`suffix`](cli:command:model/suffix) | 列表中模型名的 provider 后缀 |
| [`compact`](cli:command:model/compact) | 长对话压缩开关 |
| [`context`](cli:command:model/context) / [`output`](cli:command:model/output) | 上下文长度 / 输出上限 |
| [`disable`](cli:command:model/disable) / [`enable`](cli:command:model/enable) / [`disabled`](cli:command:model/disabled) | 全局禁用 / 解除 / 禁用列表 |

## 使用提醒

- 名称与档位只改变 agent 看到的呈现:agent 依旧按 `provider/model` 挑选与路由,请求仍然到达该模型;另一个 provider 的同款模型保留自己的名称、档位与限制。
- 价格是"一个 provider 对一个模型的资费",不是模型本身的属性:只影响 usage 与 session 统计,不改变 agent 可见的任何内容。
- `magpie model help` 打印本族完整用法。

## 源码补充

- 子命令分发与 `modelUsage` 常量见 [model_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/model_cli.go)。
