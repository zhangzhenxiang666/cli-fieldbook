---
title: gh cache list
command:
  - cache
  - list
---

列出仓库的 GitHub Actions 缓存。

## 简介

`gh cache list` 列出目标仓库的 GitHub Actions 缓存条目，默认目标仓库从当前 Git 仓库推断，可用分组级 `--repo` 旗标改选其他仓库。终端下的表格输出包含 ID、KEY、SIZE、CREATED、ACCESSED 列，并显示分页汇总（如 Showing 5 of 10 caches）。没有缓存时命令以错误结束并提示未找到缓存，不输出空表。

支持 `--json`/`--jq`/`--template` 以 JSON 形式输出，参见 [JSON 输出与格式化](../../../reference/formatting.md)。

本命令不接受位置参数。

## 选项

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。最多获取的缓存数量。默认 `30`；小于 1 时报错。

### `--order`

短旗标 `-O`。格式：`--order <string>`。返回缓存的排序方向。取值 `asc`、`desc`；默认 `desc`。

### `--sort`

短旗标 `-S`。格式：`--sort <string>`。对获取的缓存排序。取值 `created_at`、`last_accessed_at`、`size_in_bytes`；默认 `last_accessed_at`。

### `--key`

短旗标 `-k`。格式：`--key <string>`。按缓存键前缀过滤。

### `--ref`

短旗标 `-r`。格式：`--ref <string>`。按 ref 过滤，格式为 `refs/heads/<branch name>` 或 `refs/pull/<number>/merge`。

### `--json`

格式：`--json <strings>`。以指定字段输出 JSON，字段（逗号分隔）：`createdAt`、`id`、`key`、`lastAccessedAt`、`ref`、`sizeInBytes`、`version`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。用 jq 表达式过滤 JSON 输出。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板格式化 JSON 输出（参见 `gh help formatting`）。

## 环境变量

- `GH_REPO`：为命令指定 `[HOST/]OWNER/REPO` 形式的目标仓库，作用同分组级 `--repo` 旗标，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--sort` 与 `--order` 配合使用：前者选排序字段，后者选方向，例如按最久未访问在前用 `--sort last_accessed_at --order asc`。
- `--key` 匹配键前缀（或恰好相等的键）；配合 `--ref` 可进一步限定分支或拉取请求。
- 删除列出的缓存见 [`gh cache delete`](cli:command:cache/delete)。

## 示例

```sh
# 列出当前仓库的缓存
gh cache list

# 列出指定仓库的缓存
gh cache list --repo cli/cli

# 按最久未访问在前列出缓存
gh cache list --sort last_accessed_at --order asc

# 列出键匹配前缀（或恰好相等）的缓存
gh cache list --key key-prefix

# 列出特定分支的缓存，把 <branch-name> 换成实际分支名
gh cache list --ref refs/heads/<branch-name>

# 列出特定拉取请求的缓存，把 <pr-number> 换成实际拉取请求号
gh cache list --ref refs/pull/<pr-number>/merge
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、过滤参数与表格输出见 [pkg/cmd/cache/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/cache/list/list.go)。
