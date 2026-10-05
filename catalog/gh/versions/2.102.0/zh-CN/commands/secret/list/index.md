---
title: gh secret list
command:
  - secret
  - list
---

列出机密。

## 简介

列出以下层级之一的机密：

- 仓库（默认）：仓库内 GitHub Actions 运行、Agents 会话或 Dependabot 可用；
- 环境（environment）：仓库中某个部署环境的 GitHub Actions 运行可用；
- 组织（organization）：组织内 GitHub Actions 运行、Agents 会话、Dependabot 或 Codespaces 可用；
- 用户（user）：你的用户的 Codespaces 可用。

默认作用于仓库级，目标仓库从当前 Git 仓库推断；显式指定仓库（旗标或 `GH_REPO`）以外的情况下，若存在多个可用远端，交互模式会提示选择，非交互模式报错。终端下的表格包含名称与更新时间列，组织与用户级还包含可见性（Visibility）列。没有机密时命令以"无结果"错误结束。

支持 `--json`/`--jq`/`--template` 以 JSON 形式输出，参见 [JSON 输出与格式化](../../../reference/formatting.md)。本命令不接受位置参数。

## 选项

### `--org`

短旗标 `-o`。格式：`--org <string>`。列出组织的机密。

### `--env`

短旗标 `-e`。格式：`--env <string>`。列出某个环境的机密。

### `--user`

短旗标 `-u`。格式：`--user`。列出你的用户的机密。

### `--app`

短旗标 `-a`。格式：`--app <string>`。列出特定应用的机密。取值 `actions`、`agents`、`codespaces`、`dependabot`；未指定时默认 `actions`（用户层级为 `codespaces`）。应用与层级的受支持组合：`actions` 支持仓库/组织/环境，`agents` 支持仓库/组织，`codespaces` 支持用户/组织/仓库，`dependabot` 支持仓库/组织。

### `--json`

格式：`--json <strings>`。以指定字段输出 JSON，字段（逗号分隔）：`selectedReposURL`、`name`、`visibility`、`updatedAt`、`numSelectedRepos`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。用 jq 表达式过滤 JSON 输出。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板格式化 JSON 输出（参见 `gh help formatting`）。

## 环境变量

- `GH_REPO`：为命令指定 `[HOST/]OWNER/REPO` 形式的目标仓库，作用同分组级 `--repo` 旗标，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--org`、`--env`、`--user` 三者互斥，只能给出其一。
- `--app` 与层级不受支持的组合（如环境级的 `codespaces`）会报错。
- 设置与删除机密见 [`gh secret set`](cli:command:secret/set) 与 [`gh secret delete`](cli:command:secret/delete)。

## 示例

```sh
# 列出当前仓库的机密
gh secret list

# 列出组织的机密
gh secret list --org myOrg

# 列出环境的机密
gh secret list --env myenvironment

# 列出用户（Codespaces）机密
gh secret list --user

# 以 JSON 输出仓库机密的名称与更新时间
gh secret list --json name,updatedAt
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、层级解析与表格输出见 [pkg/cmd/secret/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/secret/list/list.go)。
- 应用与层级的受支持组合见 [pkg/cmd/secret/shared/shared.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/secret/shared/shared.go)。
