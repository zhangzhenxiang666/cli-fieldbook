---
title: magpie cursor
command:
  - cursor
---

`magpie cursor` 查看或设置 Cursor CLI 的模型。

## 简介

Cursor CLI(`cursor-agent` 命令,不是 Cursor 编辑器本身)的 agent 入口。四种通用形态:

- `magpie cursor`:显示 Cursor CLI 当前的模型与接线状态。
- `magpie cursor <model>`:把模型设为 `provider/model`(或路由组 `group/<id>`)。
- `magpie cursor default`:撤销 magpie 的接管;已接线时解除接线,还原 Cursor CLI 自己原来的设置。

magpie 改写 `~/.cursor/cli-config.json`(设置模型时同时维护其展示名与"已更改默认模型"标记)。

可设字段:仅有 `model`(特殊值 `auto` 表示让 Cursor 自行挑选)。

## 参数

### `target`

要查看或设置的模型(`provider/model` 形式)、字段名,或 `default`(撤销接管、还原原设置)。

### `value`

字段的新值;省略时表示查看该字段当前值。

## 使用提醒

- agent 形式不接受任何 `-` 开头的参数:出现即报错,且什么都不改。
- 源码级别名还有 `cursor-agent`。
- `~/.cursor` 目录由 Cursor 编辑器与 CLI 共用(mcp.json、skills 等),但 CLI 的检测以其 `cli-config.json` 或 `cursor-agent` 命令为准;编辑器自身的模型不在本入口管理范围。

## 示例

```sh
magpie cursor
magpie cursor minimax/minimax-m3
magpie cursor default
```

以上示例为说明性内容,未实际运行。

## 源码补充

- agent 通用分发语法见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
- Cursor CLI 的注册与字段定义见 [agents.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/agents.go)。
