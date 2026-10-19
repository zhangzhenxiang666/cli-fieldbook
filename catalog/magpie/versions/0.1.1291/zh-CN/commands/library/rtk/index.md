---
title: magpie library rtk
command:
  - library
  - rtk
---

library rtk —— 查看哪些 agent 的 shell 命令经过 RTK。

## 简介

RTK(rtk-ai.app)是一个在模型读取前削减 shell 输出的 CLI,能省 token。magpie 通过在各 agent 里放一个 RTK 钩子来启用它。不带子命令运行时打印:

- RTK 的版本与路径;未安装时给出其下载地址与 [`library rtk install`](cli:command:library/rtk/install) 提示。
- 新版本提示(有更新时给出 [`library rtk upgrade`](cli:command:library/rtk/upgrade) 的说明)。
- RTK 不在 PATH 上时的警告:agent 的钩子按名称调用它,不在 PATH 上就完全不生效,并给出 [`library rtk path`](cli:command:library/rtk/path) 的修复方式。
- RTK 已省下的 token 数、命令数与平均百分比(无法统计时说明原因;Codex 在 Windows 沙箱里运行命令的两种不计入情形)。
- 每个 agent 的开关状态:on/off;钩子调用的 rtk 未安装、或 rtk 不在 PATH 上时,on 状态带警告。
- 需要重启才生效的 agent 列表,以及改动前的备份路径。

## 使用提醒

- 没有任何 agent 适配 RTK 钩子时,列表说明"这里没有一个 agent 是 RTK 有钩子的";个别 agent 因其钩子机制无法改写命令而永远为 off(如 dsh、Grok Build/Grok App)。
- 打开开关用 [`library rtk on`](cli:command:library/rtk/on),关闭用 [`library rtk off`](cli:command:library/rtk/off)。

## 源码补充

- 状态输出(`ReadRTK`)见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
- 安装器调用、开关与钩子写入的约束见官方文档 [library.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/library.md)。
