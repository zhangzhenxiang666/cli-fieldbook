---
title: magpie codex
command:
  - codex
---

`magpie codex` 查看或设置 Codex 的模型与字段。

## 简介

Codex(OpenAI 的编程 CLI)的 agent 入口。四种通用形态:

- `magpie codex`:显示 Codex 当前的模型、字段与接线状态。
- `magpie codex <model>`:把模型设为 `provider/model`(或路由组 `group/<id>`);裸值属于非模型字段(如 effort 档位)时会路由到该字段。
- `magpie codex <field>`:显示一个字段的当前值;`magpie codex <field> <value>`:设置该字段(`default` 一词还原)。
- `magpie codex default`:撤销 magpie 的接管;已接线时解除接线,还原 Codex 自己原来的设置。

magpie 改写的是 `~/.codex/config.toml`。

主要可设字段:

| 字段 | 说明 |
|---|---|
| `model` | 主模型 |
| `effort` | 推理档位 |
| `subagent` | 子代理相关设置 |
| `subagent_model` | 子代理模型 |
| `subagent_effort` | 子代理推理档位 |
| `memories` | 记忆相关设置 |
| `login` | 登录归属:ChatGPT、Always ChatGPT 或 magpie API 三种取向 |

## 参数

### `target`

要查看或设置的模型(`provider/model` 形式)、字段名,或 `default`(撤销接管、还原原设置)。

### `value`

字段的新值;省略时表示查看该字段当前值。

## 使用提醒

- agent 形式不接受任何 `-` 开头的参数:出现即报错,且什么都不改。
- `login` 字段决定 Codex 应用与 CLI 的账号取向:ChatGPT 登录保留订阅,Codex CLI 的请求走 magpie;选 magpie API 则应用进入 API 状态;Chrome 控制等能力需要 ChatGPT 登录。
- 模型在列表里的显示名受 [`model name`](cli:command:model/name) 与 [`model suffix`](cli:command:model/suffix) 影响;可挑的模型见 [`models`](cli:command:models)。
- ChatGPT 订阅账号的余额与切换见 [`accounts`](cli:command:accounts);`accounts switch-only codex` 可让 Codex 只在自有账号间切换。

## 示例

```sh
magpie codex
magpie codex moonshot/kimi-k2.5
magpie codex effort xhigh
magpie codex default
```

以上示例为说明性内容,未实际运行。

## 源码补充

- agent 通用分发语法见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
- Codex 的注册与字段定义见 [agents.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/agents.go) 与 [codex.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/codex.go)。
