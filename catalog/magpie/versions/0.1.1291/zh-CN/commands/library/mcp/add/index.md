---
title: magpie library mcp add
command:
  - library
  - mcp
  - add
---

library mcp add —— 向库添加一个 MCP 服务器。

## 简介

以给定名称注册一个 MCP 服务器:目标是一个 URL(http、sse),或一条命令及其参数。保存后按各接收 agent 自己的格式写入;`agents=` 指定初始接收列表,省略时按库的默认处理。

## 参数

### `name`

`<name>`。服务器名称,各 agent 配置里以此作为条目名。

### `target`

`<url | command args…>`。服务器目标:一个 URL,或命令与参数(可多段)。URL 形式的服务器按远程服务器写入;命令形式按 stdio 服务器写入。

### `agents`

`[agents=a,b…]`。逗号分隔的初始接收 agent 列表;每个 agent 会被校验能否接收 MCP 服务器,不能的报错。可以出现在参数中的任意位置。

## 使用提醒

- 环境变量引用按 `${NAME}` 形式写入库,再转换成各 agent 自己的语法(如 OpenCode 的 `{env:NAME}`、Cursor 的 `${env:NAME}`);不支持变量语法的 agent 不会拿到该值。
- 服务器条目里用户自有的字段在写入与收回时都保持原样。

## 示例

```sh
magpie library mcp add deepwiki https://deepwiki.mcp.deepwiki.com/mcp
magpie library mcp add context7 npx -y @upstash/context7-mcp agents=claude,codex
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 参数解析与保存见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
- `ServerOf` 对 URL 与命令的区分、各 agent 格式编码见官方文档 [library.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/library.md)。
