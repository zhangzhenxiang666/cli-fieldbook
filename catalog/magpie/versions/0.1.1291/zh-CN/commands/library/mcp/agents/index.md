---
title: magpie library mcp agents
command:
  - library
  - mcp
  - agents
---

library mcp agents —— 设置接收某个 MCP 服务器的 agent。

## 简介

把接收指定服务器的 agent 集合设为给定列表,随即写入各 agent。每个 agent 会被校验能否接收 MCP 服务器(不支持该类服务器的会被拒绝并报错)。

## 参数

### `name`

`<name>`。服务器名称,须是库里已有的。

### `agents`

`<a,b…|none>`。逗号分隔的 agent 列表;`none` 表示没有任何 agent 接收它(空白项被忽略)。

## 使用提醒

- 校验失败时整条命令报错,不做部分修改。
- 从某个 agent 的接收列表里去掉它之后,magpie 只收回自己写入的部分。

## 示例

```sh
magpie library mcp agents deepwiki claude,codex,gemini
magpie library mcp agents deepwiki none
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 列表解析与校验见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
