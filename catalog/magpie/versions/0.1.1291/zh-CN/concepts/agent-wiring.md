---
title: agent 接线
uses:
  - command:ls
  - command:agents
  - command:claude
---

# agent 接线

magpie 不拦截流量:它改写每个 agent 自己的配置文件,把模型指向本地网关。这个动作称为"接线"(wiring),撤销接线用 `magpie <agent> default`。

## 接线发生了什么

以 Claude Code 为例,`magpie claude deepseek/deepseek-chat` 会:

1. 在 magpie 内记录该 agent 的当前挑选(模型、字段);
2. 原子地改写 agent 的配置文件(如 `~/.claude/settings.json`),把模型/base URL 指向网关 `127.0.0.1:3425`;
3. 之后该 agent 的请求经网关路由到 DeepSeek,协议由 Anthropic Messages 转译为 OpenAI 风格。

改写是原子的并尽量保留原文件的注释与格式;不同 agent 的配置格式不同(TOML、JSON、YAML 都有),magpie 为每个 agent 实现了对应的读写器。

## `magpie <agent>` 的通用语法

全部 agent 节点共享同一语法(以 [`magpie claude`](cli:command:claude) 为例):

| 形式 | 作用 |
|---|---|
| `magpie claude` | 显示该 agent 当前设置 |
| `magpie claude <model>` | 设模型(`provider/model` 或 `group/<id>`) |
| `magpie claude <field>` | 查看一个字段 |
| `magpie claude <field> <value>` | 设置字段 |
| `magpie claude default` | 撤销接管,还原 agent 自己的设置 |

裸值属于非模型字段(如 effort 档位)时会自动路由到该字段;agent 形式不接受任何 `-` 开头的参数。

## 检测与列表

- [`magpie ls`](cli:command:ls):列出**已检测到**(本机装了、有配置文件)的 agent 及设置;
- [`magpie agents`](cli:command:agents):列出**全部受支持**的 agent(含未安装的)。

每个 agent 的配置文件路径与可设字段见各自命令页(如 [`magpie codex`](cli:command:codex) 的字段表)。

## 接线状态与还原

`magpie <agent> default` 在已接线时解除接线:把 agent 的配置文件恢复为 magpie 接手之前的内容。订阅账户(Claude、ChatGPT 订阅)作为 provider 时,magpie 还会把 agent 的登录凭据接到网关侧,细节见 [订阅账户](accounts.md)。

## 来源

- 接线器架构与各 agent 配置格式:docs/subsystems/agent-wiring.md(固定提交)
- agent 通用语法的分发:internal/cli/main.go(固定提交)
