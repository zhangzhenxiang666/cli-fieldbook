---
title: gh pr list
command:
  - pr
  - list
---

列出仓库中的拉取请求，别名 `gh pr ls`。

## 简介

默认只列出打开状态的拉取请求，超过 `--limit` 上限（默认 30）时截断。过滤条件既可来自各个旗标，也可用 `--search` 传入完整的搜索查询。

搜索查询的语法见 GitHub 文档[搜索议题与拉取请求](https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests)。在受支持的 GitHub 主机上，`--search` 查询中还可以使用高级议题搜索语法，详见[使用高级筛选器构建议题查询](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/filtering-and-searching-issues-and-pull-requests#building-advanced-filters-for-issues)。

## 选项

### `--web`

短旗标 `-w`。格式：`--web`。在网页浏览器中列出拉取请求。

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。最多获取的项目数，默认 `30`。

### `--state`

短旗标 `-s`。格式：`--state <string>`。按状态过滤。取值 `open`、`closed`、`merged`、`all`，默认 `open`。

### `--base`

短旗标 `-B`。格式：`--base <string>`。按基分支过滤。

### `--head`

短旗标 `-H`。格式：`--head <string>`。按头部分支过滤（不支持 `"<owner>:<branch>"` 语法）。

### `--label`

短旗标 `-l`。格式：`--label <strings>`。按标签过滤。

### `--author`

短旗标 `-A`。格式：`--author <string>`。按作者过滤（按 GitHub App 过滤请用 `--app`）。

### `--app`

格式：`--app <string>`。按 GitHub App 作者过滤。

### `--assignee`

短旗标 `-a`。格式：`--assignee <string>`。按指派人过滤。

### `--search`

短旗标 `-S`。格式：`--search <query>`。以 `query` 搜索拉取请求。

### `--draft`

短旗标 `-d`。格式：`--draft`。按草稿状态过滤。

### `--json`

格式：`--json <strings>`。以 JSON 输出指定字段。取值 `assignees`、`author`、`body`、`closed`、`comments`、`createdAt`、`closedAt`、`id`、`labels`、`milestone`、`number`、`projectCards`、`projectItems`、`reactionGroups`、`state`、`title`、`updatedAt`、`url`、`additions`、`autoMergeRequest`、`baseRefName`、`baseRefOid`、`changedFiles`、`closingIssuesReferences`、`commits`、`deletions`、`files`、`fullDatabaseId`、`headRefName`、`headRefOid`、`headRepository`、`headRepositoryOwner`、`isCrossRepository`、`isDraft`、`latestReviews`、`maintainerCanModify`、`mergeable`、`mergeCommit`、`mergedAt`、`mergedBy`、`mergeStateStatus`、`potentialMergeCommit`、`reviewDecision`、`reviewRequests`、`reviews`、`statusCheckRollup`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。用 jq `expression` 过滤 JSON 输出，仅在给出 `--json` 时可用。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板格式化 JSON 输出，参见 `gh help formatting`（详见[格式化](../../../reference/formatting.md)）；仅在给出 `--json` 时可用。

## 使用提醒

- 本命令不接受位置参数；用 `-R` 指定其他仓库即可列出该仓库的拉取请求。
- `--author` 与 `--app` 互斥，同时给出会报错。
- `--limit` 必须为不小于 1 的整数。
- `--label` 可重复给出，效果是"同时带有全部给定标签"。
- `--draft` 支持显式取值：`--draft` 只列草稿，`--draft=false` 只列非草稿。
- `--json` 与 `--web` 互斥；`--json` 字段必须在取值范围内，未知字段会报错并列出可用字段。
- 查询走 Search API 时结果上限为 1000 条，达到上限会在标准错误输出警告。

## 示例

```sh
# 列出自己创建的拉取请求
$ gh pr list --author "@me"

# 列出由 GitHub App（如 Dependabot）发起的拉取请求
$ gh pr list --app dependabot

# 列出头部分支为特定名称的拉取请求
$ gh pr list --head "typo"

# 列出带有全部给定标签的拉取请求
$ gh pr list --label bug --label "priority 1"

# 用搜索语法过滤拉取请求
$ gh pr list --search "status:success review:required"

# 找到引入某个提交的拉取请求
$ gh pr list --search "<SHA>" --state merged
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、过滤旗标注册与互斥检查见 [pkg/cmd/pr/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/list/list.go)。
- `--json`/`--jq`/`--template` 三个共享旗标的注册与校验（含互斥规则）见 [pkg/cmdutil/json_flags.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/json_flags.go)。
