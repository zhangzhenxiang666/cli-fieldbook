---
title: 阅读说明
---

# magpie 概念文章

本目录按主题解释 magpie 的工作方式,与[命令参考](cli:command:)互为补充:命令参考回答"怎么调用",概念文章回答"为什么这样工作"。

## 文章一览

- [网关与协议转译](gateway.md) —— 本地网关如何在一个端口上服务四种 API 并互相转译
- [agent 接线](agent-wiring.md) —— magpie 如何改写各 agent 的配置文件把它们接到网关
- [provider、preset 与密钥](providers.md) —— 模型来源的统一抽象:厂商预设、自定义 vendor、订阅计划
- [订阅账户](accounts.md) —— 订阅(Claude、ChatGPT、Copilot 等)如何作为 provider 服务其他 agent
- [路由组](routing-groups.md) —— 把多个模型/账户当一个来挑:routing 模式、亲和与规则
- [profiles 与备份](profiles.md) —— 配置快照、封存备份与多机同步的关系
- [library](library.md) —— 写进每个 agent 的共享指示、MCP 服务器与 skills
- [运行形态](run-forms.md) —— 应用、TUI、Web、纯网关与守护进程分别适合什么场景

## 术语约定

- **agent**:被 magpie 管理模型的编程代理(Claude Code、Codex、Gemini CLI 等)。
- **provider**:模型来源。preset(厂商预设)、自定义 vendor、订阅计划都是 provider。
- **网关(gateway)**:本地 HTTP 服务,默认 `127.0.0.1:3425`,负责路由与协议转译。
- **路由组(routing group)**:多个模型构成的单一可选项,agent 按 `group/<id>` 挑选。

术语表见仓库 `style/tools/magpie.yml`;拼写与上游保持一致,中文只做解释性翻译。
