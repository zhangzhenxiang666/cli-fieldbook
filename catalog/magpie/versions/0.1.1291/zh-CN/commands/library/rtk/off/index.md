---
title: magpie library rtk off
command:
  - library
  - rtk
  - off
---

library rtk off —— 为某个 agent 关闭 RTK。

## 简介

移除指定 agent 的 RTK 钩子。移除由 magpie 自己的代码精确执行、只删安装器写入的内容,即使 RTK 已经不在也能完成。

## 参数

### `agent`

`<agent>`。要关闭 RTK 的 agent。

## 使用提醒

- 移除绝不使用 `rtk init --uninstall`:那条命令会整个删除 Gemini 的 `GEMINI.md`,并把 Claude Code、OpenCode、Cursor 的内容一并移除。
- CLI 已卸载但文件夹还在的 agent 仍会被列出,以便把遗留的钩子关掉。
- 改动可能需要重启该 agent 才生效。

## 示例

```sh
magpie library rtk off codex
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 入口见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
- "只删安装器写入的内容"与禁用 `rtk init --uninstall` 的原因见官方文档 [library.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/library.md)。
