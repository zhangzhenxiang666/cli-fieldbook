---
title: gh repo list
command:
  - repo
  - list
---

列出用户或组织拥有的仓库，别名为 `gh repo ls`。

## 简介

`gh repo list` 展示指定所有者名下的仓库，输出为表格：仓库名（`NAME`）、描述（`DESCRIPTION`）、信息列（`INFO`，由可见性、`fork`、`archived` 标记组成）与更新时间（`UPDATED`）。排序按推送时间倒序。

需要注意：列表只包含所有者参数本人名下的仓库，`--fork` 或 `--source` 不会跨越所有权边界。例如列出组织内的复刻时，不会包含属于个人用户的复刻。

无参数时列出当前认证用户的仓库。给出 `--language`、`--topic`、`--archived`、`--no-archived` 或 `--visibility internal` 筛选时改走 Search API，其结果上限为 1000；`--limit` 超过 1000 时会输出相应警告。

## 参数

### `OWNER`

可选，写作 `[<owner>]`。要列出仓库的用户或组织登录名；省略时列出当前认证用户名下的仓库。所有者无法识别为用户或组织时报错。

## 选项

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。最多列出的仓库数量，默认 `30`。小于 `1` 的值报错。

### `--source`

格式：`--source`。只显示非复刻仓库。与 `--fork` 互斥。

### `--fork`

格式：`--fork`。只显示复刻仓库。与 `--source` 互斥。

### `--language`

短旗标 `-l`。格式：`--language <string>`。按主要编程语言筛选。

### `--topic`

格式：`--topic <strings>`。按主题筛选，可给出多个值。

### `--visibility`

格式：`--visibility <string>`。按仓库可见性筛选。取值 `public`、`private`、`internal`。

### `--archived`

格式：`--archived`。只显示已归档仓库。与 `--no-archived` 互斥。

### `--no-archived`

格式：`--no-archived`。省略已归档仓库。与 `--archived` 互斥。

### `--json`

格式：`--json <strings>`。以 JSON 导出仓库列表，配合 `--jq`、`--template` 加工输出，参见 [JSON 输出与格式化](../../../reference/formatting.md)。可用字段共 69 个：`id`、`name`、`nameWithOwner`、`owner`、`parent`、`templateRepository`、`description`、`homepageUrl`、`openGraphImageUrl`、`usesCustomOpenGraphImage`、`url`、`sshUrl`、`mirrorUrl`、`securityPolicyUrl`、`createdAt`、`pushedAt`、`updatedAt`、`archivedAt`、`isBlankIssuesEnabled`、`isSecurityPolicyEnabled`、`hasIssuesEnabled`、`hasProjectsEnabled`、`hasWikiEnabled`、`hasDiscussionsEnabled`、`mergeCommitAllowed`、`squashMergeAllowed`、`rebaseMergeAllowed`、`forkCount`、`stargazerCount`、`watchers`、`issues`、`pullRequests`、`codeOfConduct`、`contactLinks`、`defaultBranchRef`、`deleteBranchOnMerge`、`diskUsage`、`fundingLinks`、`isArchived`、`isEmpty`、`isFork`、`isInOrganization`、`isMirror`、`isPrivate`、`visibility`、`isTemplate`、`isUserConfigurationRepository`、`licenseInfo`、`viewerCanAdminister`、`viewerDefaultCommitEmail`、`viewerDefaultMergeMethod`、`viewerHasStarred`、`viewerPermission`、`viewerPossibleCommitEmails`、`viewerSubscription`、`repositoryTopics`、`primaryLanguage`、`languages`、`issueTemplates`、`pullRequestTemplates`、`labels`、`milestones`、`latestRelease`、`assignableUsers`、`mentionableUsers`、`projects`、`projectsV2`、`branchProtectionRules`、`collaborators`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。按 jq 查询语法筛选或重组 `--json` 的输出，参见 [JSON 输出与格式化](../../../reference/formatting.md)。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板渲染 `--json` 的输出，参见 [JSON 输出与格式化](../../../reference/formatting.md)。

### `--private`

格式：`--private`。只显示私有仓库。已弃用，改用 `--visibility=private`。

### `--public`

格式：`--public`。只显示公开仓库。已弃用，改用 `--visibility=public`。

## 使用提醒

- `--public`、`--private`、`--visibility` 三者只能指定一个；`--source` 与 `--fork` 互斥；`--archived` 与 `--no-archived` 互斥，违反时报错。
- 弃用旗标 `--public`、`--private` 等价于设置对应可见性筛选；新脚本应使用 `--visibility`。
- 本命令不依赖本地仓库上下文，直接查询 GitHub API。

## 示例

```sh
# 列出当前认证用户的仓库
gh repo list

# 列出指定组织的仓库，最多 10 个
gh repo list my-org --limit 10

# 只列出组织名下的公开仓库
gh repo list my-org --visibility public
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 旗标注册、互斥检查与表格输出见 [pkg/cmd/repo/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/list/list.go)；GraphQL 查询与 Search API 回退逻辑见 [pkg/cmd/repo/list/http.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/list/http.go)。
- `--json` 字段来自 `api.RepositoryFields`，字段清单随源码字段表静态求值。
