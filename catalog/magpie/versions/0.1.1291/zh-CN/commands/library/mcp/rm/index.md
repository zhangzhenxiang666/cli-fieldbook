---
title: magpie library mcp rm
command:
  - library
  - mcp
  - rm
---

library mcp rm —— 从库移除一个 MCP 服务器。

## 简介

把指定服务器从库里删除,并从各 agent 收回 magpie 为它写入的条目;条目里用户自有的字段保持原样。改动前的 agent 文件有备份。

## 参数

### `name`

`<name>`。要移除的服务器名称。

## 使用提醒

- 只运行 `magpie library mcp` 不带子命令会打印用法错误;移除全部服务器没有专门子命令,逐个执行本命令。

## 示例

```sh
magpie library mcp rm deepwiki
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 命令入口见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
- 收回时"只收回自己写入的部分"的机制见官方文档 [library.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/library.md)。
