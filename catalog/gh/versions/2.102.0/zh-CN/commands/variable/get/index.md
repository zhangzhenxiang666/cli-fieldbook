---
title: gh variable get
command:
  - variable
  - get
---

获取变量。

## 简介

获取以下层级之一的变量：

- 仓库（默认）：仓库内 GitHub Actions 运行或 Dependabot 可用；
- 环境（environment）：仓库中某个部署环境的 GitHub Actions 运行可用；
- 组织（organization）：组织内 GitHub Actions 运行或 Dependabot 可用。

默认输出变量的值本身；指定 `--json` 时改为输出结构化字段（此时会额外请求所选仓库数量等信息）。变量不存在时报错。

## 参数

### `VARIABLE-NAME`

格式：`<variable-name>`。变量名，必填。

## 选项

### `--org`

短旗标 `-o`。格式：`--org <string>`。获取组织级变量。

### `--env`

短旗标 `-e`。格式：`--env <string>`。获取环境级变量。

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
- JSON 输出的用法见 [JSON 输出与格式化](../../../reference/formatting.md)。
- 设置与列出变量见 [`gh variable set`](cli:command:variable/set) 与 [`gh variable list`](cli:command:variable/list)。

## 示例

```sh
# 输出当前仓库变量的值
gh variable get MYVARIABLE

# 输出组织变量的值
gh variable get MYVARIABLE --org myOrg

# 以 JSON 输出变量的名称与值
gh variable get MYVARIABLE --json name,value
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与层级解析见 [pkg/cmd/variable/get/get.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/variable/get/get.go)。
