---
title: magpie opencode
command:
  - opencode
---

`magpie opencode`(别名 `oc`)查看或设置 OpenCode 的模型与字段。

## 简介

OpenCode 的 agent 入口。四种通用形态:

- `magpie opencode`:显示 OpenCode 当前的模型、字段与接线状态。
- `magpie opencode <model>`:把模型设为 `provider/model`(或路由组 `group/<id>`);裸值属于非模型字段时会路由到该字段。
- `magpie opencode <field>`:显示一个字段的当前值;`magpie opencode <field> <value>`:设置该字段(`default` 一词还原)。
- `magpie opencode default`:撤销 magpie 的接管;已接线时解除接线,还原 OpenCode 自己原来的设置。

magpie 改写 `~/.config/opencode` 下的配置文件(按 OpenCode 的查找顺序取 `opencode.jsonc`、`opencode.json`、`config.json` 中最先存在者,都没有则新建 `opencode.json`);`OPENCODE_CONFIG_DIR` 可改配置目录。

可设字段:

| 字段 | 说明 |
|---|---|
| `model` | 主模型 |
| `small` | 小模型(后台轻量任务用) |

## 参数

### `target`

要查看或设置的模型(`provider/model` 形式)、字段名,或 `default`(撤销接管、还原原设置)。

### `value`

字段的新值;省略时表示查看该字段当前值。

## 使用提醒

- agent 形式不接受任何 `-` 开头的参数:出现即报错,且什么都不改。
- OpenCode 系(MiMo Code、DevEco Code 同形态)的登录信息在 `~/.local/share/<id>/auth.json`;provider 插件体系见 [`plugin`](cli:command:plugin)。
- 模型在列表里的显示名受 [`model name`](cli:command:model/name) 与 [`model suffix`](cli:command:model/suffix) 影响;可挑的模型见 [`models`](cli:command:models)。

## 示例

```sh
magpie opencode
magpie opencode zai/glm-5.3
magpie opencode small deepseek/deepseek-chat
magpie opencode default
```

以上示例为说明性内容,未实际运行。

## 源码补充

- agent 通用分发语法见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
- OpenCode 系共用构造 `openCodeLike`(配置查找、字段)见 [agents.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/agents.go)。
