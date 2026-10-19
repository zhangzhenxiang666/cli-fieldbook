---
title: magpie crush
command:
  - crush
---

`magpie crush` 查看或设置 Crush 的模型与字段。

## 简介

Crush(Charm 的编程代理)的 agent 入口。四种通用形态:

- `magpie crush`:显示 Crush 当前的模型、字段与接线状态。
- `magpie crush <model>`:把模型设为 `provider/model`(或路由组 `group/<id>`);裸值属于非模型字段(如 effort 档位)时会路由到该字段。
- `magpie crush <field>`:显示一个字段的当前值;`magpie crush <field> <value>`:设置该字段(`default` 一词还原)。
- `magpie crush default`:撤销 magpie 的接管;已接线时解除接线,还原 Crush 自己原来的设置。

magpie 改写 `~/.config/crush/crush.json`;Crush 自身挑选器保存的模型在数据文件 `~/.local/share/crush/crush.json`(读取优先于配置,magpie 按 Crush 的合并规则同样维护;Windows 两处均在 `%LOCALAPPDATA%\crush`)。

可设字段:

| 字段 | 说明 |
|---|---|
| `model` | 大模型(`models.large`) |
| `small` | 小模型(`models.small`) |
| `effort` | 大模型的 `reasoning_effort`,档位 low、medium、high;须先选定模型 |

## 参数

### `target`

要查看或设置的模型(`provider/model` 形式)、字段名,或 `default`(撤销接管、还原原设置)。

### `value`

字段的新值;省略时表示查看该字段当前值。

## 使用提醒

- agent 形式不接受任何 `-` 开头的参数:出现即报错,且什么都不改。
- 设置 `effort` 前须已设置大模型,否则报错。
- magpie 首次在 Crush 的数据文件写入 API 密钥时会将该文件权限收紧为仅所有者可读。

## 示例

```sh
magpie crush
magpie crush anthropic/claude-opus-5-5
magpie crush effort high
magpie crush default
```

以上示例为说明性内容,未实际运行。

## 源码补充

- agent 通用分发语法见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
- Crush 的注册与字段定义见 [agents.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/agents.go)。
