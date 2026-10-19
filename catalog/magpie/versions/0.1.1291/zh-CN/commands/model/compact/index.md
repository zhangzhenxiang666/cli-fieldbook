---
title: magpie model compact
command:
  - model
  - compact
---

控制 Codex 与 Claude Code 在长对话中是否压缩、以及在哪里压缩。别名 `model full-context`。

## 简介

三种取值:

- `on`(默认):窗口更长的模型在 272K 处压缩(Claude Code 中,Claude 模型按其自身规则)。
- `off`:在模型整个窗口处压缩,`[1m]` 模型即 1M。
- `<size>`(如 `500k`):在该长度处压缩。

应用的 Settings → Long conversations 是同一个开关;provider 自身的 Compact at(其编辑器中设置)优先于此处。不带参数时显示当前设置。

## 参数

### `setting`

`[on|off|<size>]`。目标设置。省略时为查看。

## 使用提醒

- 只作用于 Codex 与 Claude Code 的长对话压缩行为,不影响其他 agent。

## 源码补充

- 实现见 [model_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/model_cli.go) 中的 `modelCompact`。
