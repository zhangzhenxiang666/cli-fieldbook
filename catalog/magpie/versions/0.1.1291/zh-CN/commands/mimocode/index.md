---
title: magpie mimocode
command:
  - mimocode
---

`magpie mimocode` 查看或设置 MiMo Code 的模型与字段。

## 简介

MiMo Code(Xiaomi MiMo 的 CLI 与桌面应用共用的引擎)的 agent 入口,与 OpenCode 同配置形态。四种通用形态:

- `magpie mimocode`:显示 MiMo Code 当前的模型、字段与接线状态。
- `magpie mimocode <model>`:把模型设为 `provider/model`(或路由组 `group/<id>`)。
- `magpie mimocode <field>`:显示一个字段的当前值;`magpie mimocode <field> <value>`:设置该字段(`default` 一词还原)。
- `magpie mimocode default`:撤销 magpie 的接管;已接线时解除接线,还原 MiMo Code 自己原来的设置。

magpie 改写 `~/.config/mimocode` 下的配置文件(查找顺序同 OpenCode:`mimocode.jsonc`、`mimocode.json`、`config.json`,都没有则新建 `mimocode.json`);`MIMOCODE_HOME` 可改配置目录。

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
- 源码级别名还有 `mimo`;CLI 与 Xiaomi MiMo 桌面应用读取同一份配置。
- 登录信息在 `~/.local/share/mimocode/auth.json`。

## 示例

```sh
magpie mimocode
magpie mimocode xiaomi/mimo-v4
magpie mimocode default
```

以上示例为说明性内容,未实际运行。

## 源码补充

- agent 通用分发语法见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
- MiMo Code 的注册(OpenCode 系共用构造 `openCodeLike`)见 [agents.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/agents.go)。
