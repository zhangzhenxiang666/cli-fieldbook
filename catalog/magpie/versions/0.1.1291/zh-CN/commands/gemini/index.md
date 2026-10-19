---
title: magpie gemini
command:
  - gemini
---

`magpie gemini` 查看或设置 Gemini CLI 的模型与字段。

## 简介

Gemini CLI 的 agent 入口。四种通用形态:

- `magpie gemini`:显示 Gemini CLI 当前的模型、字段与接线状态。
- `magpie gemini <model>`:把模型设为 `provider/model`(或路由组 `group/<id>`);裸值属于非模型字段时会路由到该字段。
- `magpie gemini <field>`:显示一个字段的当前值;`magpie gemini <field> <value>`:设置该字段(`default` 一词还原)。
- `magpie gemini default`:撤销 magpie 的接管;已接线时解除接线,还原 Gemini CLI 自己原来的设置。

magpie 改写的是 `~/.gemini/settings.json`(认证相关还会用到 `~/.gemini/.env`)。

可设字段:

| 字段 | 说明 |
|---|---|
| `model` | 主模型 |
| `provider` | 认证方式:API key、Google 账号(OAuth)、Vertex AI,或 magpie 本地网关 |

## 参数

### `target`

要查看或设置的模型(`provider/model` 形式)、字段名,或 `default`(撤销接管、还原原设置)。

### `value`

字段的新值;省略时表示查看该字段当前值。

## 使用提醒

- agent 形式不接受任何 `-` 开头的参数:出现即报错,且什么都不改。
- 源码级别名还有 `gemini-cli`。
- Gemini CLI 的模型名单独列出时不含各模型名(源码 `NoNames`),挑选以 magpie 的模型目录为准。
- Google 账号的配额窗口与项目设置见 [`accounts`](cli:command:accounts) 与 [`accounts project`](cli:command:accounts/project)。

## 示例

```sh
magpie gemini
magpie gemini qwen/qwen3-max
magpie gemini default
```

以上示例为说明性内容,未实际运行。

## 源码补充

- agent 通用分发语法见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
- Gemini CLI 的注册与字段定义见 [agents.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/agents.go) 与 [gemini.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/gemini.go)。
