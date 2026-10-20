---
title: magpie pi
command:
  - pi
---

`magpie pi` 查看或设置 Pi 的模型与字段。

## 简介

Pi(pi 编程代理)的 agent 入口。四种通用形态:

- `magpie pi`:显示 Pi 当前的模型、字段与接线状态。
- `magpie pi <model>`:把模型设为 `provider/model`(或路由组 `group/<id>`);裸值属于非模型字段时会路由到该字段。
- `magpie pi <field>`:显示一个字段的当前值;`magpie pi <field> <value>`:设置该字段(`default` 一词还原)。
- `magpie pi default`:撤销 magpie 的接管;已接线时解除接线,还原 Pi 自己原来的设置。

magpie 改写 `~/.pi/agent` 下的配置(模型经其 `models.json` 的 provider 块接入网关);`PI_CODING_AGENT_DIR` 可改该目录(`~` 代表主目录)。

可设字段:

| 字段 | 说明 |
|---|---|
| `model` | 新会话启动模型(同时维护可选模型列表,使模型能被 Ctrl+P 选中) |
| `thinking` | 启动时的思考档位(对应 Pi 的 `/thinking` 列表;Pi 会按模型能力收敛) |

## 参数

### `target`

要查看或设置的模型(`provider/model` 形式)、字段名,或 `default`(撤销接管、还原原设置)。

### `value`

字段的新值;省略时表示查看该字段当前值。

## 使用提醒

- agent 形式不接受任何 `-` 开头的参数:出现即报错,且什么都不改。
- `thinking` 只在变化时写入:避免覆盖手工编辑过的 provider 字段。

## 示例

```sh
magpie pi
magpie pi anthropic/claude-opus-5-5
magpie pi thinking high
magpie pi default
```

以上示例为说明性内容,未实际运行。

## 源码补充

- agent 通用分发语法见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
- Pi 的注册与字段定义(`piLike`)见 [agents.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/agents.go)。
