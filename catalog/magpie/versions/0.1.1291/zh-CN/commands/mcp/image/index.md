---
title: magpie mcp image
command:
  - mcp
  - image
---

图像与视频生成的 stdio MCP 服务器,由 Library 分配给需要的 agent。

## 简介

`magpie mcp image` 是一个遵循 MCP 协议(JSON-RPC over stdio)的服务器:处理 `initialize`、`ping`、`tools/list`、`tools/call` 等方法。生成图像用的是 Settings 中 Image generation 指定的模型;生成视频用网关现有的第一个视频模型。生成的文件默认放在项目的 `generated-images` 目录(未指定路径时)。

正常用法不是手动运行,而是在应用的 Library 页把它分配给某个 agent:magpie 会把它写进该 agent 的 MCP 配置,agent 启动时自行拉起本进程。

## 使用提醒

- 本命令面向 stdio 通信,直接在终端运行只会等待输入;验证服务器是否可用应通过 agent 的 MCP 工具列表。
- 分配与管理入口见 [`magpie library`](cli:command:library)。

## 源码补充

- 服务器实现(方法分发、目录约定)见 [imagemcp.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/imagemcp/imagemcp.go);Windows 的 WSL 适配见 [wsl.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/imagemcp/wsl.go)。
