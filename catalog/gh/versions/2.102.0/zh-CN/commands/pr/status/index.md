---
title: gh pr status
command:
  - pr
  - status
---

显示相关拉取请求的状态总览。

## 简介

按三部分显示拉取请求的状态摘要：当前分支对应的拉取请求、自己创建的拉取请求、等待自己评审的拉取请求。每个条目包含编号、标题、CI 检查、评审等信息。用 `-R` 指定仓库时，"当前分支"部分不显示。

要查看 CI 检查的更多细节，运行 `gh pr checks`。

## 选项

### `--conflict-status`

短旗标 `-c`。格式：`--conflict-status`。显示每个拉取请求的合并冲突状态。

### `--json`

格式：`--json <strings>`。以 JSON 输出指定字段。取值 `assignees`、`author`、`body`、`closed`、`comments`、`createdAt`、`closedAt`、`id`、`labels`、`milestone`、`number`、`projectCards`、`projectItems`、`reactionGroups`、`state`、`title`、`updatedAt`、`url`、`additions`、`autoMergeRequest`、`baseRefName`、`baseRefOid`、`changedFiles`、`closingIssuesReferences`、`commits`、`deletions`、`files`、`fullDatabaseId`、`headRefName`、`headRefOid`、`headRepository`、`headRepositoryOwner`、`isCrossRepository`、`isDraft`、`latestReviews`、`maintainerCanModify`、`mergeable`、`mergeCommit`、`mergedAt`、`mergedBy`、`mergeStateStatus`、`potentialMergeCommit`、`reviewDecision`、`reviewRequests`、`reviews`、`statusCheckRollup`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。用 jq `expression` 过滤 JSON 输出，仅在给出 `--json` 时可用。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板格式化 JSON 输出，参见 `gh help formatting`（详见[格式化](../../../reference/formatting.md)）；仅在给出 `--json` 时可用。

## 使用提醒

- 本命令不接受位置参数，始终以当前仓库与当前分支为上下文。
- `--json` 输出的顶层结构是 `currentBranch`（可为 null）、`createdBy`、`needsReview` 三个键，各键的值为按所选字段输出的拉取请求数组。
- `--json` 字段必须在取值范围内，未知字段会报错并列出可用字段。

## 示例

```sh
# 查看当前仓库中与自己相关的拉取请求
$ gh pr status

# 同时显示每个拉取请求的合并冲突状态
$ gh pr status --conflict-status

# 查看其他仓库的状态
$ gh pr status --repo cli/cli
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与三部分状态的取数逻辑见 [pkg/cmd/pr/status/status.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/status/status.go)。
