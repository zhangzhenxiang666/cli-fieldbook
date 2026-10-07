---
title: gh variable delete
command:
  - variable
  - delete
---

删除变量。

## 简介

删除以下层级之一的变量：

- 仓库（默认）：仓库内 GitHub Actions 运行或 Dependabot 可用；
- 环境（environment）：仓库中某个部署环境的 GitHub Actions 运行可用；
- 组织（organization）：组织内 GitHub Actions 运行或 Dependabot 可用。

## 参数

### `VARIABLE-NAME`

格式：`<variable-name>`。要删除的变量名，必填。

## 选项

### `--org`

短旗标 `-o`。格式：`--org <string>`。删除组织级变量。

### `--env`

短旗标 `-e`。格式：`--env <string>`。删除环境级变量。

## 环境变量

- `GH_REPO`：为命令指定 `[HOST/]OWNER/REPO` 形式的目标仓库，作用同分组级 `--repo` 旗标，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--org` 与 `--env` 互斥，只能给出其一；都不给时作用于仓库级。
- 删除是即时生效的破坏性操作；先核对名称可用 [`gh variable list`](cli:command:variable/list)。
- 本命令没有确认提示，删除前请确认层级（仓库/环境/组织）选择正确。

## 示例

```sh
# 删除当前仓库的变量
gh variable delete MYVARIABLE

# 删除组织变量
gh variable delete MYVARIABLE --org myOrg

# 删除当前仓库部署环境的变量
gh variable delete MYVARIABLE --env myenvironment
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与层级解析见 [pkg/cmd/variable/delete/delete.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/variable/delete/delete.go)。
