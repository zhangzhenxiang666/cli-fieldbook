---
title: magpie copilot
command:
  - copilot
---

`magpie copilot` 查看或设置 Copilot CLI 的模型与字段。

## 简介

GitHub Copilot CLI 的 agent 入口。四种通用形态:

- `magpie copilot`:显示 Copilot CLI 当前的模型、字段与接线状态。
- `magpie copilot <model>`:把模型设为 `provider/model`(或路由组 `group/<id>`);裸值属于非模型字段(如 effort 档位)时会路由到该字段。
- `magpie copilot <field>`:显示一个字段的当前值;`magpie copilot <field> <value>`:设置该字段(`default` 一词还原)。
- `magpie copilot default`:撤销 magpie 的接管;已接线时解除接线,还原 Copilot CLI 自己原来的设置。

magpie 改写 `~/.copilot/settings.json`。

可设字段:

| 字段 | 说明 |
|---|---|
| `model` | 主模型(特殊值 `auto` 表示让 Copilot 自行挑选) |
| `effort` | 推理档位(写入其 `effortLevel`;档位随模型,默认列表为 low、medium、high、xhigh) |

## 参数

### `target`

要查看或设置的模型(`provider/model` 形式)、字段名,或 `default`(撤销接管、还原原设置)。

### `value`

字段的新值;省略时表示查看该字段当前值。

## 使用提醒

- agent 形式不接受任何 `-` 开头的参数:出现即报错,且什么都不改。
- 源码级别名还有 `gh-copilot`。
- `~/.copilot` 目录由 Copilot 的 JetBrains 与 VS Code 插件共用,检测以其 `settings.json` 或 `copilot` 命令为准。
- Copilot 订阅账号的添加与企业版主机见 [`accounts add`](cli:command:accounts/add)。

## 示例

```sh
magpie copilot
magpie copilot openai/gpt-6.1-sol
magpie copilot effort high
magpie copilot default
```

以上示例为说明性内容,未实际运行。

## 源码补充

- agent 通用分发语法见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
- Copilot CLI 的注册与字段定义见 [agents.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/agents.go)。
