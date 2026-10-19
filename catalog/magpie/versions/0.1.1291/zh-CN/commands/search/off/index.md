---
title: magpie search off
command:
  - search
  - off
---

暂停询问一个搜索 API:key 与设置保留,只是不再被问到。

## 简介

临时下线某个 API(如 key 额度将尽时),配置原样保留,随时用 [`search on`](cli:command:search/on) 恢复;彻底移除用 [`search rm`](cli:command:search/rm)。

## 参数

### `api`

`<api>`。API 名称,不区分大小写。

## 源码补充

- 实现见 [search_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/search_cli.go) 中的 `off` 分支。
