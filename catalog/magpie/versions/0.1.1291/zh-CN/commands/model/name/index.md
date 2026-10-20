---
title: magpie model name
command:
  - model
  - name
---

查看或设置一个模型的显示名,使其在 magpie、网关模型列表与写入 agent 的列表中统一生效。别名 `model rename`。

## 简介

三种形态:不带名字时显示该模型当前使用的名称与其自身名称;给名字则把 `provider/model` 以该名称呈现于各处;`--reset` 恢复其自身名称。

例如 `magpie model name claude/claude-opus-5-5 "Opus 5.5"` 之后,agent 列表里显示 "Opus 5.5",但挑选与路由仍按 `claude/claude-opus-5-5` 进行。

## 参数

### `model`

`<provider/model>`。目标模型,必须带 provider 前缀;找不到 provider 时报错并提示用 [`models`](cli:command:models) 查看可用项。

### `name`

`[<name>]`。要设置的显示名,可含空格(多段参数会合并)。省略时为查看;给 `--reset` 时恢复原名。

## 选项

### `--reset`

移除你设置的名称,恢复模型自身名称。源码同时接受 `-r`、`--default`、`default`、`reset` 等同义写法。

## 使用提醒

- 改名只影响呈现:agent 仍按 `provider/model` 挑选,请求仍到达该模型;另一个 provider 的同款模型保留自己的名称。
- 被挡在某个 agent 视野之外的模型不受影响 —— 可见性由 [`visible`](cli:command:visible) 决定。

## 示例

```sh
magpie model name claude/claude-opus-5-5 "Opus 5.5"
magpie model name openai/gpt-6 --reset
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 实现见 [model_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/model_cli.go) 中的 `modelName`。
