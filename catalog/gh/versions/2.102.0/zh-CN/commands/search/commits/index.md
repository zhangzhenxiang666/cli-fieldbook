---
title: gh search commits
command:
  - search
  - commits
---

在 GitHub 上搜索提交。

## 简介

本命令支持三种构造查询的方式：GitHub 搜索语法（关键词与 `author:`、`merge:` 等限定符）、限定符旗标，或两者组合；搜索语法见官方文档 [Searching commits](https://docs.github.com/search-github/searching-on-github/searching-commits)。

查询中包含以连字符开头的限定符（如 `-label:bug`）时的处理方式，见 [`gh search`](cli:command:search)。

## 参数

### `QUERY`

格式：`[<query>]`。可选的搜索关键词或 GitHub 搜索语法表达式，可由多个词项组成；省略时仍须至少给出一个旗标。

## 选项

### `--json`

格式：`--json <strings>`。把结果导出为 JSON，值为逗号分隔的字段列表。支持字段：`author`、`commit`、`committer`、`sha`、`id`、`parents`、`repository`、`url`。导出结果可用 `--jq` 或 `--template` 进一步加工，见 [JSON 输出与格式化](../../../reference/formatting.md)。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。按 jq 表达式筛选或重组 `--json` 导出的结果，需与 `--json` 同用。

### `--template`

短旗标 `-t`。格式：`--template <string>`。按 Go 模板渲染 `--json` 导出的结果，需与 `--json` 同用。

### `--web`

短旗标 `-w`。格式：`--web`。不在终端输出结果，而是在浏览器中打开本次搜索查询。

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。最多获取的提交条数，默认 `30`；取值须在 1 到 1000 之间，超出范围报错。

### `--order`

格式：`--order <string>`。返回结果的排序方向，取值 `asc`、`desc`，默认 `desc`；仅在同时指定 `--sort` 时生效。

### `--sort`

格式：`--sort <string>`。对获取的提交排序，取值 `author-date`、`committer-date`，默认按最佳匹配（`best-match`）排序。

### `--author`

格式：`--author <string>`。按提交作者过滤。

### `--author-date`

格式：`--author-date <date>`。按作者署名日期过滤，支持 `--author-date="<2022-02-01"` 这类日期范围写法。

### `--author-email`

格式：`--author-email <string>`。按作者邮箱过滤。

### `--author-name`

格式：`--author-name <string>`。按作者姓名过滤。

### `--committer`

格式：`--committer <string>`。按提交者过滤。

### `--committer-date`

格式：`--committer-date <date>`。按提交日期过滤，支持日期范围写法。

### `--committer-email`

格式：`--committer-email <string>`。按提交者邮箱过滤。

### `--committer-name`

格式：`--committer-name <string>`。按提交者姓名过滤。

### `--hash`

格式：`--hash <string>`。按提交哈希过滤。

### `--merge`

格式：`--merge`。只保留合并提交；也接受 `--merge=false` 形式。

### `--parent`

格式：`--parent <string>`。按父提交哈希过滤。

### `--repo`

短旗标 `-R`。格式：`--repo <OWNER/REPO>`。按 `OWNER/REPO` 格式的仓库过滤，可多次给出。

### `--tree`

格式：`--tree <string>`。按提交对应的树对象哈希过滤。

### `--owner`

格式：`--owner <strings>`。按仓库所有者过滤，可给出多个。

### `--visibility`

格式：`--visibility <strings>`。按仓库可见性过滤，取值 `public`、`private`、`internal`。

## 使用提醒

- 至少给出搜索关键词或一个旗标，否则命令报错。
- `--order` 只在同时指定 `--sort` 时生效；不排序时结果按最佳匹配排列。
- 搜索结果为空且未用 `--json` 导出时，命令以失败结束并提示没有匹配的提交。

## 示例

```sh
# 搜索同时匹配关键词 "readme" 与 "typo" 的提交
gh search commits readme typo

# 搜索匹配短语 "bug fix" 的提交
gh search commits "bug fix"

# 用原始搜索限定符作为独立参数搜索
gh search commits fix author:monalisa merge:false

# 搜索提交者为 "monalisa" 的提交
gh search commits --committer=monalisa

# 搜索署名作者姓名为 "Jane Doe" 的提交
gh search commits --author-name="Jane Doe"

# 搜索哈希为 "8dd03144ffdc6c0d486d6b705f9c7fba871ee7c3" 的提交
gh search commits --hash=8dd03144ffdc6c0d486d6b705f9c7fba871ee7c3

# 搜索 2022 年 2 月 1 日之前署名的提交
gh search commits --author-date="<2022-02-01"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、排序旗标与限定符注册见 [pkg/cmd/search/commits/commits.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/search/commits/commits.go)。
