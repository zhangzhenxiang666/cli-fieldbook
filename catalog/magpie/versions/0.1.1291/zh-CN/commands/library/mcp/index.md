---
title: magpie library mcp
command:
  - library
  - mcp
---

library mcp —— 管理写给各 agent 的 MCP 服务器。

## 简介

库把 MCP 服务器(一条命令,或 `http`/`sse` 的 URL)保存一次,再按每个 agent 自己的格式写进它的 MCP 配置,并与该条目里用户自己的字段合并。子命令:

- [`library mcp add`](cli:command:library/mcp/add):添加一个服务器。
- [`library mcp agents`](cli:command:library/mcp/agents):设置接收某个服务器的 agent。
- [`library mcp rm`](cli:command:library/mcp/rm):移除一个服务器。

## 使用提醒

- 只运行 `magpie library mcp`(不带子命令)会打印用法错误;查看库里已有的服务器用 [`magpie library`](cli:command:library) 的 MCP servers 一节。
- 需要登录(OAuth)的服务器在 magpie 里登录一次,agent 经网关的 `/mcp/<name>` 使用它;个别只认自家客户端的服务器(如 Figma)除外,此类服务器由各 agent 自己登录。
- 不支持某类服务器的 agent 不会被写入,结果里会说明原因(例如 Claude Desktop 不接收远程服务器,Codex、Goose、Zed 等不接收 SSE)。

## 源码补充

- 命令分发见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
- 服务器的编码、健康检查与登录机制见官方文档 [library.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/library.md)。
