---
title: magpie goose
command:
  - goose
---

`magpie goose` 查看或设置 Goose 的模型与字段。

## 简介

Goose(Block 的编程代理)的 agent 入口。四种通用形态:

- `magpie goose`:显示 Goose 当前的模型、字段与接线状态。
- `magpie goose <model>`:把模型设为 `provider/model`(或路由组 `group/<id>`);裸值属于非模型字段(如 effort 档位)时会路由到该字段。
- `magpie goose <field>`:显示一个字段的当前值;`magpie goose <field> <value>`:设置该字段(`default` 一词还原)。
- `magpie goose default`:撤销 magpie 的接管;已接线时解除接线,还原 Goose 自己原来的设置。

magpie 改写 `~/.config/goose/config.yaml`(Windows 在 `%APPDATA%\Block\goose\config\config.yaml`)。

可设字段:

| 字段 | 说明 |
|---|---|
| `model` | 主模型 |
| `effort` | 思考档位(写入其 `GOOSE_THINKING_EFFORT` 设置) |

## 参数

### `target`

要查看或设置的模型(`provider/model` 形式)、字段名,或 `default`(撤销接管、还原原设置)。

### `value`

字段的新值;省略时表示查看该字段当前值。

## 使用提醒

- agent 形式不接受任何 `-` 开头的参数:出现即报错,且什么都不改。
- Goose 在启动时加载 provider:改动后需退出并重开 Goose(含 `goose sessions`)才生效。
- Goose 的模型名单独列出时不含各模型名(源码 `NoNames`)。

## 示例

```sh
magpie goose
magpie goose openai/gpt-6.1-sol
magpie goose default
```

以上示例为说明性内容,未实际运行。

## 源码补充

- agent 通用分发语法见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
- Goose 的注册与字段定义见 [agents.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/agents.go)。
