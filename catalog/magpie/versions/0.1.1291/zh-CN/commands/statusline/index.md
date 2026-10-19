---
title: magpie statusline
command:
  - statusline
---

输出 Claude Code 状态栏用的一行文本:会话模型与各订阅账户的窗口用量。

## 简介

为 Claude Code 的状态栏(statusline)生成一行。从 stdin 读取 Claude Code 传入的 JSON(仅当 stdin 是管道或文件时才读取,不会在终端上等待输入),取其中的 `session_id` 向本地网关查询该会话当前路由到的模型,显示为 `→ <model>`;随后附上各订阅账户的用量卡片。

卡片形如 `claude a@x.com* 5h 62% 7d 41%`:provider 名加账户(或 [`accounts alias`](cli:command:accounts/alias) 起的别名),`*` 表示最近用过,其后是各用量窗口(5 小时、7 天)的已用百分比;无限制的窗口显示 `∞`。网关无法应答时输出空字符串。

## 参数

### `target`

可选。只显示指定的 provider 或账户,可按 provider 名、账户名、别名或 `provider/账户` 匹配,大小写不敏感;可给出多个。省略时:优先显示最近通过 magpie 服务过的订阅,否则显示全部带用量窗口的订阅。

## 使用提醒

- 本命令设计为由 Claude Code 的状态栏配置调用;直接在终端运行时没有 stdin JSON,只输出用量卡片部分。
- 配额的完整查看用 [`quota`](cli:command:quota)。

## 源码补充

- stdin 读取、网关查询、卡片选择与格式见 [statusline_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/statusline_cli.go)。
