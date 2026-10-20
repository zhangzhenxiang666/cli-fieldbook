---
title: magpie search add
command:
  - search
  - add
---

添加一个搜索 API,或为已有的换 key。别名 `search set`。

## 简介

基本形式 `magpie search add <api> <key>`。可选 `url=<address>` 指向按该 API 协议应答的自建端点;`pick=turns|order` 控制多 key 的使用方式。特殊形态:`searxng` 以 `url=` 为主、key 可省;`you` 可完全无 key(每天 100 次免费搜索)。

对同一 API 再次 add 即更换 key;只给新 key 时保留先前设置的 url,`url=` 后为空则恢复厂商默认地址。key 只发送给该 url。

多个 key 以逗号分隔(`k1,k2`):默认轮流;`pick=order` 从第一个用起,直到它被拒绝。

## 参数

### `api`

`<api>`。API 名称,不区分大小写:tavily、brave、exa、firecrawl、you、deepseek、searxng。

### `key`

`<key>`。API key。`searxng` 与 `you` 可省略(searxng 换用 `url=`,you 无 key 亦可用)。多个 key 用逗号分隔。

## 使用提醒

- 自建端点示例:`url=https://search.example.com/tavily`;不给 `url=` 时用厂商自己的地址。
- 顺序调整见 [`search move`](cli:command:search/move),暂停见 [`search off`](cli:command:search/off)。

## 示例

```sh
magpie search add tavily tvly-…
magpie search add searxng url=https://searx.example.com
magpie search add you
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 参数解析(含 url=/pick=)见 [search_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/search_cli.go) 中的 `add` 分支。
