---
title: magpie claude-mcp-helper
command:
  - claude-mcp-helper
---

内部入口:由 Claude Code 拉起的 stdio MCP 子进程。本入口存在于源码分发但未列入官方 usage 主体。

## 简介

`magpie claude-mcp-helper` 是 magpie 与 Claude Code 之间桥接的内部进程:Claude Code 按其 MCP 配置以 stdio 启动它,用于订阅桥接等内部通信。它不面向用户,不应手工运行;手工执行只会进入等待 MCP 协议消息的 stdio 循环。

## 使用提醒

- 与之相关的是 [`magpie claude-code`](cli:command:claude-code) 的安装管理;该桥接的配置由 magpie 自动写入,不需要手工干预。

## 源码补充

- 分发见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)(`case "claude-mcp-helper": return claudebridge.RunMCP(args[1:])`),实现在 internal/claudebridge 包。
