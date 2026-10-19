---
title: magpie claude
command:
  - claude
---

`magpie claude`(别名 `cc`)查看或设置 Claude Code 的模型与字段。

## 简介

Claude Code 的 agent 入口。四种通用形态:

- `magpie claude`:显示 Claude Code 当前的模型、字段与接线状态。
- `magpie claude <model>`:把模型设为 `provider/model`(或路由组 `group/<id>`);裸值属于非模型字段(如 effort 档位)时会路由到该字段。
- `magpie claude <field>`:显示一个字段的当前值;`magpie claude <field> <value>`:设置该字段(`default` 一词还原)。
- `magpie claude default`:撤销 magpie 的接管;已接线时解除接线,还原 Claude Code 自己原来的设置。

magpie 改写的是 `~/.claude/settings.json`(全局层;项目级 `.claude/settings.json` 不在改动范围)。

主要可设字段:

| 字段 | 说明 |
|---|---|
| `model` | 主模型 |
| `effort` | 推理档位 |
| `ultracode` | ultracode 开关 |
| `subagent` | 子代理相关设置 |

源码中另有若干静默字段(按 tier 的模型、登录等),由应用界面管理,同样可经字段形态读写。

## 参数

### `target`

要查看或设置的模型(`provider/model` 形式)、字段名,或 `default`(撤销接管、还原原设置)。

### `value`

字段的新值;省略时表示查看该字段当前值。

## 使用提醒

- agent 形式不接受任何 `-` 开头的参数:出现即报错,且什么都不改。
- 源码级别名还有 `claude-code`。
- 模型在列表里的显示名受 [`model name`](cli:command:model/name) 与 [`model suffix`](cli:command:model/suffix) 影响;可挑的模型见 [`models`](cli:command:models)。
- Claude Code 的请求经本地网关转译为 Anthropic Messages 接口;订阅账号(Claude 订阅)也可作为 provider,见 [`accounts`](cli:command:accounts)。

## 示例

```sh
magpie claude
magpie claude deepseek/deepseek-chat
magpie claude effort high
magpie claude default
```

以上示例为说明性内容,未实际运行。

## 源码补充

- agent 通用分发语法见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
- Claude Code 的注册与字段定义见 [agents.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/agents.go) 与 [claude.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/claude.go)。
