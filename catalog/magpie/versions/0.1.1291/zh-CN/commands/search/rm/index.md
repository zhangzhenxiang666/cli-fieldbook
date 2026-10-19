---
title: magpie search rm
command:
  - search
  - rm
---

彻底移除一个搜索 API。别名 `search remove`。

## 简介

把该 API 连同 key 与设置一起删除;只是暂停而保留配置用 [`search off`](cli:command:search/off)。

## 参数

### `api`

`<api>`。API 名称,不区分大小写。

## 源码补充

- 实现见 [search_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/search_cli.go) 中的 `rm` 分支。
