---
title: magpie models
command:
  - models
---

列出 agent 可以挑选的全部模型,以 `provider/model` 形式呈现。

## 简介

不带参数时列出整个模型目录;带 agent 时列出该 agent 实际看到的模型,并解释其余模型为何不可见:哪些被 [`visible`](cli:command:visible) 的窄化挡住、哪些因"只显示已勾选"而未勾选。路由组以 `group/` 前缀单独成组显示。

一个 agent 被显示的模型为空时,命令会给出对应的提示与修复入口(如 `magpie visible <agent> all`)。整个目录为空时提示先添加 provider(`magpie provider add …`)。

## 参数

### `agent`

`[<agent>]`。要查看的 agent。省略时列出全部目录。源码同样接受 `--agent=<id>` 与 `--agent <id>` 写法。

## 使用提醒

- 模型以 `provider/model` 标识;同一个模型来自不同 provider 时是两个条目,各自保留名称、档位与限制。
- 配套命令:[`model name`](cli:command:model/name) 改显示名、[`model efforts`](cli:command:model/efforts) 改 reasoning 档位、[`model disable`](cli:command:model/disable) 全局禁用。

## 源码补充

- 目录构建与逐 agent 的可见性解释见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中的 `models`。
- 可见性窄化的设置端见 [visible_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/visible_cli.go)。
