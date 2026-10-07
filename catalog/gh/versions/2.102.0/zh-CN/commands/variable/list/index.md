---
title: gh variable list
command:
  - variable
  - list
---

列出变量。

## 简介

列出以下层级之一的变量：

- 仓库（默认）：仓库内 GitHub Actions 运行或 Dependabot 可用；
- 环境（environment）：仓库中某个部署环境的 GitHub Actions 运行可用；
- 组织（organization）：组织内 GitHub Actions 运行或 Dependabot 可用。

终端下的表格包含名称、值与更新时间列，组织级还包含可见性（Visibility）列。没有变量时命令以"无结果"错误结束。

支持 `--json`/`--jq`/`--template` 以 JSON 形式输出，参见 [JSON 输出与格式化](../../../reference/formatting.md)。本命令不接受位置参数。

## 选项

### `--org`

短旗标 `-o`。格式：`--org <string>`。列出组织级变量。

### `--env`

短旗标 `-e`。格式：`--env <string>`。列出环境级变量。

### `--json`

格式：`--json <strings>`。以指定字段输出 JSON，字段（逗号分隔）：`name`、`value`、`visibility`、`updatedAt`、`createdAt`、`numSelectedRepos`、`selectedReposURL`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。用 jq 表达式过滤 JSON 输出。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板格式化 JSON 输出（参见 `gh help formatting`）。

## 环境变量

- `GH_REPO`：为命令指定 `[HOST/]OWNER/REPO` 形式的目标仓库，作用同分组级 `--repo` 旗标，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--org` 与 `--env` 互斥，只能给出其一；都不给时作用于仓库级。
- 表格会直接显示变量的值；机密类数据应使用 [`gh secret`](cli:command:secret) 而非变量。
- 读取单个变量的值见 [`gh variable get`](cli:command:variable/get)。

## 示例

```sh
# 列出当前仓库的变量
gh variable list

# 列出组织的变量
gh variable list --org myOrg

# 以 JSON 输出变量的名称与值
gh variable list --json name,value
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与表格输出见 [pkg/cmd/variable/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/variable/list/list.go)。
