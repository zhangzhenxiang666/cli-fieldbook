---
title: magpie claude-code remove
command:
  - claude-code
  - remove
---

删除 magpie 下载的 Claude Code;别名 `magpie claude-code rm`。

## 简介

`magpie claude-code remove` 删除 [`magpie claude-code install`](cli:command:claude-code/install) 下载的构建并打印其版本与路径。没有下载过时只作说明,不算错误。

本命令只影响 magpie 下载的那份;本机自装的 Claude Code 不受影响,也不会被动用。

## 源码补充

- 见 [claude_code_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/claude_code_cli.go)(`case "remove", "rm"`)。
