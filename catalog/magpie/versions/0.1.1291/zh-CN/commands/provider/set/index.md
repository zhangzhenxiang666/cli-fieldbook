---
title: magpie provider set
command:
  - provider
  - set
---

修改一个已存在 provider 的设置,k=v 对与 [`add`](cli:command:provider/add) 相同。

## 简介

对指定 provider 应用一组 k=v。特殊取值:

- `id=<new>`:重命名。保存后,使用其模型的分组与 agent 会随之前缀迁移(如 `my-relay/…` 变为 `relay/…`)。
- `codex=as-sent`:Codex 的 Responses 请求按 Codex 原样发出(供校验请求是否来自 Codex 的中转使用);`codex=default` 为默认,由 magpie 整理。
- `user-agent=agent`:发送 agent 给出的 User-Agent(如 pi、opencode)替代 magpie 自己的,供只服务指名 agent 的计划使用;`user-agent=magpie` 为默认。
- `compaction=native`:向该 provider 请求 Codex 自带的压缩,原样递交密封条目(Responses API、ChatGPT 账户、Copilot);`compaction=magpie` 为默认,由 magpie 摘要。
- `context=272k` / `context.<model>=1m`:告知 agent 请求长度上限,覆盖厂商或 models.dev 数据;留空清除。
- `family=<tag>`:给 provider 打族标签,配合 [`visible`](cli:command:visible) 控制哪些 agent 看到它的模型。
- `search=yes`:该中转自己应答 Claude Code 的 WebSearch 与 Codex 的 web_search,此类请求原样转发而不走 magpie 的搜索。

## 参数

### `id`

`<id>`。目标 provider 的 id。

### `pairs`

`k=v…`。一组键值对,可用的键同 [`provider add`](cli:command:provider/add)。

## 使用提醒

- 修改 `models` 会整体替换挑选列表;增量调整用 [`provider models`](cli:command:provider/models) 的 `+id` / `-id`。

## 示例

```sh
magpie provider set my-relay models.url=https://relay.example.com/api/models catalog=
magpie provider set my-relay search=yes
magpie provider set my-relay id=relay
magpie provider set my-relay context=272k context.gpt-6=1m
```

以上示例为说明性内容,未实际运行。

## 源码补充

- set 处理与 id 重命名迁移见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `providerCmd()` 的 `set` 分支。
