---
title: magpie search
command:
  - search
---

管理模型的 web 搜索兜底所用的搜索 API。

## 简介

不带参数时按询问顺序列出已配置的搜索 API(名称、密钥掩码、自定义 url、多 key 时的轮流方式,off 状态;Tavily 会附带每个 key 的用量)。子命令负责添加、开关、排序与移除:

| 子命令 | 用途 |
|---|---|
| [`add`](cli:command:search/add) | 添加 API 或换 key |
| [`on`](cli:command:search/on) / [`off`](cli:command:search/off) | 恢复 / 暂停询问(保留 key) |
| [`move`](cli:command:search/move) | 调整询问顺序中的位置 |
| [`rm`](cli:command:search/rm) | 移除 |

支持的 API:tavily、brave、exa、firecrawl、you、deepseek、searxng。

客户端的 web 搜索(Claude Code 的 WebSearch、Codex 的 web_search)依次由:模型所在 provider(若它能搜)→ 某个能搜的 provider(Claude 或 ChatGPT 账户、OpenAI、Anthropic、OpenRouter…)→ 这些 API(按顺序,跳过关闭的)完成;结果原样交给模型。一个都不可用时,客户端的搜索被省略。

## 使用提醒

- 多个 key(逗号分隔)默认轮流使用;`pick=order` 用第一个直到被拒。最近被拒的 key 会休息:rate limit 按 API 所说的时长(30 秒到 10 分钟)、被拒 10 分钟、额度耗尽 1 小时。
- `magpie search help` 打印本族完整用法。

## 源码补充

- 子命令分发与 `searchUsage` 见 [search_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/search_cli.go)。
