---
title: gh issue list
command:
  - issue
  - list
---

## 简介

列出 GitHub 仓库中的议题，默认只列出开启状态的议题。目标仓库默认从当前目录的 Git 远程推断，可用 `--repo` 指定。本命令有别名 `gh issue ls`。

`--search` 的查询语法见 [GitHub 搜索文档](https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests)；在支持高级议题搜索的 GitHub 主机上，`--search` 中还可以使用高级议题搜索语法，参见[构建议题高级筛选器](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/filtering-and-searching-issues-and-pull-requests#building-advanced-filters-for-issues)。

## 参数

本命令不接受位置参数。

## 选项

### `--web`

短旗标 `-w`。格式：`--web`。在网页浏览器中列出议题。

### `--assignee`

短旗标 `-a`。格式：`--assignee <string>`。按指派人过滤，可用 `@me` 表示自己。

### `--label`

短旗标 `-l`。格式：`--label <strings>`。按标签过滤，可重复给出或用逗号分隔。

### `--state`

短旗标 `-s`。格式：`--state <string>`。按状态过滤。取值 `open`、`closed`、`all`。默认 `open`。

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。最多获取的议题数量。默认 `30`。

### `--author`

短旗标 `-A`。格式：`--author <string>`。按作者过滤（按 GitHub App 过滤请用 `--app`）。

### `--app`

格式：`--app <string>`。按 GitHub App 作者过滤。

### `--mention`

格式：`--mention <string>`。按提及过滤。

### `--milestone`

短旗标 `-m`。格式：`--milestone <string>`。按里程碑编号或标题过滤。

### `--search`

短旗标 `-S`。格式：`--search <query>`。用 `query` 搜索议题。

### `--type`

格式：`--type <name>`。按议题类型 `name` 过滤。

### `--json`

格式：`--json <strings>`。以 JSON 输出指定的 `fields`。取值 `assignees`、`author`、`body`、`closed`、`comments`、`createdAt`、`closedAt`、`id`、`labels`、`milestone`、`number`、`projectCards`、`projectItems`、`reactionGroups`、`state`、`title`、`updatedAt`、`url`、`isPinned`、`stateReason`、`closedByPullRequestsReferences`、`issueType`、`parent`、`subIssues`、`subIssuesSummary`、`blockedBy`、`blocking`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。用 jq `expression` 过滤 JSON 输出。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板格式化 JSON 输出（参见 `gh help formatting`）。

## 使用提醒

- `--author` 与 `--app` 互斥，同时给出会报错；给出 `--app` 时内部按 `app/<名称>` 形式的作者过滤。
- 给出 `--search`，或给出 `--label`、`--milestone`、`--type` 时改走搜索 API，结果上限 1000 条，超出时输出警告。
- `--limit` 需不小于 1，否则报错。
- `--web` 不能与 `--json` 同用；`--jq`、`--template` 需要配合 `--json`，参见 [JSON 输出与格式化](../../../reference/formatting.md)。

## 示例

```sh
# 列出带 bug 与 help wanted 标签的议题
gh issue list --label "bug" --label "help wanted"

# 列出 monalisa 创建的议题
gh issue list --author monalisa

# 列出 dependabot 这个 GitHub App 创建的议题
gh issue list --app dependabot

# 列出指派给自己的议题
gh issue list --assignee "@me"

# 列出里程碑 "The big 1.0" 中的议题
gh issue list --milestone "The big 1.0"

# 用搜索查询列出无指派人、按创建时间升序排列的议题
gh issue list --search "error no:assignee sort:created-asc"

# 列出全部状态的议题
gh issue list --state all

# 列出 Bug 类型的议题
gh issue list --type Bug
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、过滤逻辑与默认输出字段见 [pkg/cmd/issue/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/list/list.go)。
- 列表与搜索的请求实现见 [pkg/cmd/issue/list/http.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/list/http.go)。
