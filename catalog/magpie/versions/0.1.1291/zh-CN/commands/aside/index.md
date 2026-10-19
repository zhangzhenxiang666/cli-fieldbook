---
title: magpie aside
command:
  - aside
---

`magpie aside` 查看或设置 Aside 的模型与字段。

## 简介

Aside 的 agent 入口。四种通用形态:

- `magpie aside`:显示 Aside 当前的模型、字段与接线状态。
- `magpie aside <model>`:把模型设为 `provider/model`(或路由组 `group/<id>`)。
- `magpie aside <field>`:显示一个字段的当前值;`magpie aside <field> <value>`:设置该字段(`default` 一词还原)。
- `magpie aside default`:撤销 magpie 的接管;已接线时解除接线,还原 Aside 自己原来的设置。

magpie 维护 `~/.aside` 下的配置。

可设字段:公开字段为 `model` 与 `effort`;源码中另有账户等静默字段,由应用界面管理。

## 参数

### `target`

要查看或设置的模型(`provider/model` 形式)、字段名,或 `default`(撤销接管、还原原设置)。

### `value`

字段的新值;省略时表示查看该字段当前值。

## 使用提醒

- agent 形式不接受任何 `-` 开头的参数:出现即报错,且什么都不改。
- 未检测到 Aside 时,设置模型会先行初始化其配置。

## 示例

```sh
magpie aside
magpie aside deepseek/deepseek-chat
magpie aside default
```

以上示例为说明性内容,未实际运行。

## 源码补充

- agent 通用分发语法见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
- Aside 的注册与字段定义见 [agents.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/agents.go) 与 [aside.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/aside.go)。
