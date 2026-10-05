---
title: gh issue status
command:
  - issue
  - status
---

## 简介

显示当前仓库中与当前用户相关的议题，分三组列出：指派给你的、提及你的、由你创建的。目标仓库默认从当前目录的 Git 远程推断，可用 `--repo` 指定。

## 参数

本命令不接受位置参数。

## 选项

### `--json`

格式：`--json <strings>`。以 JSON 输出指定的 `fields`。取值 `assignees`、`author`、`body`、`closed`、`comments`、`createdAt`、`closedAt`、`id`、`labels`、`milestone`、`number`、`projectCards`、`projectItems`、`reactionGroups`、`state`、`title`、`updatedAt`、`url`、`isPinned`、`stateReason`、`closedByPullRequestsReferences`、`issueType`、`parent`、`subIssues`、`subIssuesSummary`、`blockedBy`、`blocking`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。用 jq `expression` 过滤 JSON 输出。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板格式化 JSON 输出（参见 `gh help formatting`）。

## 使用提醒

- 使用 `--json` 时，输出按 `assigned`（指派给你的）、`mentioned`（提及你的）、`createdBy`（你创建的）三个键组织，各键的值为议题数组。
- `--jq`、`--template` 需要配合 `--json`，参见 [JSON 输出与格式化](../../../reference/formatting.md)。

## 示例

```sh
# 查看当前仓库中与你相关的议题
gh issue status

# 以 JSON 输出编号、标题与状态
gh issue status --json number,title,state
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与三组议题的输出见 [pkg/cmd/issue/status/status.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/status/status.go)。
