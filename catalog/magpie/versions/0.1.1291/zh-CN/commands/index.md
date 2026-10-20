---
title: magpie
command: []
---

magpie —— 在一个地方为每个 agent 挑选模型。不带参数运行时打开应用:一个窗口加一个菜单栏图标;无图形界面的环境自动进入 [`tui`](cli:command:tui)。

## 简介

magpie 是一个本地网关加一组界面:菜单栏应用、窗口、终端 TUI、浏览器页面与纯网关守护进程。各 agent(Claude Code、Codex、Gemini CLI 等)的请求经过本地网关,由 magpie 按你挑选的模型路由,并在 OpenAI Chat、OpenAI Responses、Anthropic Messages 与 Gemini 四种接口之间转译。

常用入口:

- 查看已检测到的 agent 及其当前设置:[`ls`](cli:command:ls)
- 列出全部受支持 agent:[`agents`](cli:command:agents)
- 查看与挑选模型:[`models`](cli:command:models)、`magpie <agent> <model>`
- 管理模型服务商:[`provider`](cli:command:provider)、[`providers`](cli:command:providers)、[`presets`](cli:command:presets)

## 选项

### `--help`

`-h, --help`。打印主帮助。任何子命令之后也可以用 `-h` 或 `--help`(`magpie group help` 同义),只打印该命令的用法,不做其他事。

### `--version`

`-v, --version`。打印版本号。

## 使用提醒

- 不带参数运行:有图形界面时打开应用窗口,没有时进入 TUI;TUI 打开期间(且无其他 magpie 运行时)同时承担网关服务。
- 系统传入 `magpie://` 链接参数时(Windows、Linux 的 URL 分发):有图形界面则交给应用确认,无图形界面时等价于 [`import`](cli:command:import)。
- Windows 上点击历史通知可能以 `-Embedding` 参数启动 magpie:这是内部入口,直接打开应用的 Usage 页,不作为命令文档化。
- agent 形式(`magpie <agent> …`)不接受任何 `-` 开头的参数:出现即报错并保持原状不变。
- `magpie <command> --help` 或 `magpie <command> help` 查看单个命令的详细用法。

## 源码补充

- 命令分发、`usage` 常量与 agent 通用语法见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
- 各命令的主题帮助分发见 [help_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/help_cli.go)。
- 项目概览与网关地址、环境变量见 [README.zh-CN.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/README.zh-CN.md)。
