---
title: magpie claude-code
command:
  - claude-code
---

查看或管理 Claude 订阅所运行的 Claude Code:这是订阅账号被接入与应答的前提。

## 简介

Claude 订阅(Claude Pro/Max 等)由 Claude Code 执行并登录;服务器或容器里常常没有它,`magpie claude-code` 负责查看本机用的是哪一个,并可在缺少时下载 Anthropic 官方构建。

| 子命令 | 说明 |
|---|---|
| [`install`](cli:command:claude-code/install) | 下载 Anthropic 官方构建的 Claude Code(供服务器/容器使用) |
| [`remove`](cli:command:claude-code/remove) | 删除 magpie 下载的 Claude Code |

不带子命令时报告状态:本机自装的 Claude Code(优先使用)、magpie 下载的那份,或两者皆无(此时 Claude 订阅无法登录与应答)。

## 使用提醒

- 本机已有自装的 Claude Code 时,magpie 下载的那份不会被动用;`remove` 只删下载的那份,不碰自装的。

## 源码补充

- 状态、安装与删除逻辑见 [claude_code_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/claude_code_cli.go)。
