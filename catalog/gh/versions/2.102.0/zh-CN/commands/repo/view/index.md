---
title: gh repo view
command:
  - repo
  - view
---

显示仓库的描述与 README。

## 简介

`gh repo view` 输出仓库全名、描述与 README 内容，结尾附上在 GitHub 上查看该仓库的链接。

不带参数时显示当前目录对应的仓库。参数只写仓库名（不含 `/`）时，自动补全为当前认证用户的 `OWNER/REPO`；也可给出 `OWNER/REPO` 或 URL。使用 `--web` 时改为在浏览器中打开仓库；使用 `--branch` 时查看仓库的指定分支。

README 为 Markdown 时会按终端宽度渲染；仓库没有 README 时会提示。输出重定向（非终端）时改用制表符分隔的 `name:`、`description:` 纯文本形式，并原样输出 README。

## 参数

### `REPOSITORY`

可选，写作 `[<repository>]`。目标仓库，形式为 `OWNER/REPO` 或 URL；只写仓库名时补全为当前认证用户的仓库。省略时使用当前目录对应的仓库。

## 选项

### `--web`

短旗标 `-w`。格式：`--web`。在浏览器中打开仓库。

### `--branch`

短旗标 `-b`。格式：`--branch <string>`。查看仓库的指定分支。

### `--json`

格式：`--json <strings>`。以 JSON 导出仓库信息，配合 `--jq`、`--template` 加工输出，参见 [JSON 输出与格式化](../../../reference/formatting.md)。可用字段共 69 个：`id`、`name`、`nameWithOwner`、`owner`、`parent`、`templateRepository`、`description`、`homepageUrl`、`openGraphImageUrl`、`usesCustomOpenGraphImage`、`url`、`sshUrl`、`mirrorUrl`、`securityPolicyUrl`、`createdAt`、`pushedAt`、`updatedAt`、`archivedAt`、`isBlankIssuesEnabled`、`isSecurityPolicyEnabled`、`hasIssuesEnabled`、`hasProjectsEnabled`、`hasWikiEnabled`、`hasDiscussionsEnabled`、`mergeCommitAllowed`、`squashMergeAllowed`、`rebaseMergeAllowed`、`forkCount`、`stargazerCount`、`watchers`、`issues`、`pullRequests`、`codeOfConduct`、`contactLinks`、`defaultBranchRef`、`deleteBranchOnMerge`、`diskUsage`、`fundingLinks`、`isArchived`、`isEmpty`、`isFork`、`isInOrganization`、`isMirror`、`isPrivate`、`visibility`、`isTemplate`、`isUserConfigurationRepository`、`licenseInfo`、`viewerCanAdminister`、`viewerDefaultCommitEmail`、`viewerDefaultMergeMethod`、`viewerHasStarred`、`viewerPermission`、`viewerPossibleCommitEmails`、`viewerSubscription`、`repositoryTopics`、`primaryLanguage`、`languages`、`issueTemplates`、`pullRequestTemplates`、`labels`、`milestones`、`latestRelease`、`assignableUsers`、`mentionableUsers`、`projects`、`projectsV2`、`branchProtectionRules`、`collaborators`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。按 jq 查询语法筛选或重组 `--json` 的输出，参见 [JSON 输出与格式化](../../../reference/formatting.md)。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板渲染 `--json` 的输出，参见 [JSON 输出与格式化](../../../reference/formatting.md)。

## 环境变量

- `GH_REPO`：省略位置参数时，可用 `[HOST/]OWNER/REPO` 形式指定目标仓库，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 使用 `--json` 时不获取 README，仅导出仓库字段。
- `--branch` 既决定读取哪个分支的 README，也决定 `--web` 打开的 `tree/<branch>` 页面。
- 在仓库外的目录运行且无法解析默认仓库时会报错，可显式给出仓库参数或设置 `GH_REPO`。

## 示例

```sh
# 查看当前目录对应的仓库
gh repo view

# 查看指定仓库的 dev 分支
gh repo view cli/cli --branch dev

# 在浏览器中打开仓库
gh repo view cli/cli --web
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 旗标注册、仓库参数解析与终端渲染模板见 [pkg/cmd/repo/view/view.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/view/view.go)；README 获取见 [pkg/cmd/repo/view/http.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/view/http.go)。
