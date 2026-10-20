---
title: magpie deveco
command:
  - deveco
---

`magpie deveco` 查看或设置 DevEco Code 的模型与字段。

## 简介

DevEco Code(华为面向 HarmonyOS 应用的 OpenCode 分支)的 agent 入口,与 OpenCode 同配置形态。四种通用形态:

- `magpie deveco`:显示 DevEco Code 当前的模型、字段与接线状态。
- `magpie deveco <model>`:把模型设为 `provider/model`(或路由组 `group/<id>`)。
- `magpie deveco <field>`:显示一个字段的当前值;`magpie deveco <field> <value>`:设置该字段(`default` 一词还原)。
- `magpie deveco default`:撤销 magpie 的接管;已接线时解除接线,还原 DevEco Code 自己原来的设置。

magpie 改写 `~/.config/deveco` 下的配置文件(合并 `config.json`、`deveco.json`、`deveco.jsonc`,magpie 取其查找顺序中最先存在者);`DEVECO_CONFIG_DIR` 可追加配置目录。

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
- 登录信息在 `~/.local/share/deveco/auth.json`;DevEco Code 的部分请求仍发送 OpenCode 的 User-Agent,网关以其专用密钥区分。

## 示例

```sh
magpie deveco
magpie deveco qwen/qwen3-coder-plus
magpie deveco default
```

以上示例为说明性内容,未实际运行。

## 源码补充

- agent 通用分发语法见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
- DevEco Code 的注册(OpenCode 系共用构造 `openCodeLike`)见 [agents.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/agents.go)。
