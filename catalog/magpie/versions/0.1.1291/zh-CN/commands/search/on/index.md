---
title: magpie search on
command:
  - search
  - on
---

恢复询问一个被关闭的搜索 API。

## 简介

与 [`search off`](cli:command:search/off) 相对:重新把它纳入询问顺序,key 与设置原样保留。

## 参数

### `api`

`<api>`。API 名称,不区分大小写。

## 源码补充

- 实现见 [search_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/search_cli.go) 中的 `on` 分支。
