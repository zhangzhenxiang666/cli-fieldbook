---
title: magpie agents
command:
  - agents
---

列出 magpie 支持的全部 agent,不论是否安装在本机。

## 简介

遍历内置 agent 注册表,逐行显示 agent 名称、字段值与配置文件路径:

- 已检测到的 agent 正常显示;
- 未检测到的以暗色显示 `not detected`,不显示路径;
- 配置目录残留但可执行文件缺失的显示 `CLI not found`。

与 [`ls`](cli:command:ls) 的区别:`ls` 只列已检测到的 agent(按应用中的顺序,隐藏的靠后),本命令列全部受支持 agent。

## 使用提醒

- agent 注册表远大于 usage 帮助尾部列出的 13 个常用 agent;帮助尾部的静态清单只覆盖最常用的一部分,完整清单以本命令输出为准。
- 对任意受支持的 agent 查看或修改设置,用 agent 形式,例如 [`magpie codex`](cli:command:codex)。

## 源码补充

- 分发与列表渲染见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go) 的 `agents` 分支,内置注册表见 [agents.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/agents.go)。
