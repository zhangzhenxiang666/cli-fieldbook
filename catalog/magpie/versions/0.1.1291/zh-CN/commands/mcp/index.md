---
title: magpie mcp
command:
  - mcp
---

magpie 自带的 MCP 服务器入口;目前提供图像与视频生成的 [`magpie mcp image`](cli:command:mcp/image)。

## 简介

`magpie mcp` 是给 agent 配备 MCP 工具的入口,子命令:

| 子命令 | 说明 |
|---|---|
| [`image`](cli:command:mcp/image) | 图像与视频生成的 stdio MCP 服务器 |

这些服务器通常不手工运行:在应用的 Library 页(或 [`magpie library`](cli:command:library) 相关配置)里勾选后,由 magpie 写进各 agent 的 MCP 配置,agent 启动时以 stdio 方式拉起。

## 使用提醒

- 手动运行 `magpie mcp image` 会进入 JSON-RPC stdio 循环,等待 MCP 协议消息,不适合在交互终端直接执行。

## 源码补充

- 分发见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)(`case "mcp": return imagemcp.Run(args[1:])`)。
