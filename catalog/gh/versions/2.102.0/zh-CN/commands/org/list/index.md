---
title: gh org list
command:
  - org
  - list
---

列出已认证用户所属的组织。

## 简介

按登录名逐行输出已认证用户所属的组织，终端下先输出汇总行（如 Showing 5 of 5 organizations）。没有组织时输出相应提示。

## 选项

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。最多列出的组织数量。默认 `30`；小于 1 时报错。

## 使用提醒

- 本命令输出为纯文本登录名列表，不支持 `--json`。
- 需要组织的详细信息时可用 `gh api` 配合 GraphQL/REST 查询。

## 示例

```sh
# 列出前 30 个组织
gh org list

# 列出更多组织
gh org list --limit 100
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与分页输出见 [pkg/cmd/org/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/org/list/list.go)。
