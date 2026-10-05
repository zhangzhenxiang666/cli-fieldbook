---
title: gh variable set
command:
  - variable
  - set
---

创建或更新变量。

## 简介

在以下层级之一为变量设置值：

- 仓库（默认）：仓库内 GitHub Actions 运行或 Dependabot 可用；
- 环境（environment）：仓库中某个部署环境的 GitHub Actions 运行可用；
- 组织（organization）：组织内 GitHub Actions 运行或 Dependabot 可用。

组织级变量可选地限定仅特定仓库可用。

变量值来自 `--body`；未指定时交互模式下提示输入，非交互模式下从标准输入读取。使用 `--env-file` 时可省略变量名参数，从文件批量载入。

## 参数

### `VARIABLE-NAME`

格式：`<variable-name>`。变量名，通常必填；仅在使用 `--env-file` 时可省略（源码校验）。

## 选项

### `--org`

短旗标 `-o`。格式：`--org <organization>`。设置组织级变量。

### `--env`

短旗标 `-e`。格式：`--env <environment>`。设置部署环境变量。

### `--visibility`

短旗标 `-v`。格式：`--visibility <string>`。设置组织级变量的可见性。取值 `all`、`private`、`selected`；默认 `private`。仅在与 `--org` 同用时有效。

### `--repos`

短旗标 `-r`。格式：`--repos <repositories>`。可访问组织变量的仓库列表（逗号分隔）。仅当可见性为 `selected` 时可配合使用。

### `--body`

短旗标 `-b`。格式：`--body <string>`。变量的值；未指定时从标准输入读取（交互模式下提示输入）。

### `--env-file`

短旗标 `-f`。格式：`--env-file <file>`。从 dotenv 格式文件载入变量名与值，批量设置；`-` 表示标准输入。

## 环境变量

- `GH_REPO`：为命令指定 `[HOST/]OWNER/REPO` 形式的目标仓库，作用同分组级 `--repo` 旗标，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--org` 与 `--env` 互斥；`--body` 与 `--env-file` 也互斥。
- 显式给出 `--visibility` 时必须同时给出 `--org`；`--visibility=selected` 要求再给出 `--repos`，反之给出 `--repos` 时只允许 `selected`。
- 未显式给出 `--visibility` 但提供了 `--repos` 时，按 `selected` 处理（源码行为）。
- 查看与删除见 [`gh variable get`](cli:command:variable/get)、[`gh variable list`](cli:command:variable/list) 与 [`gh variable delete`](cli:command:variable/delete)。

## 示例

```sh
# 在交互提示中为当前仓库输入变量值
gh variable set MYVARIABLE

# 从环境变量读取变量值
gh variable set MYVARIABLE --body "$ENV_VALUE"

# 从文件读取变量值
gh variable set MYVARIABLE < myfile.txt

# 为当前仓库的部署环境设置变量
gh variable set MYVARIABLE --env myenvironment

# 设置对公开和私有仓库都可见的组织变量
gh variable set MYVARIABLE --org myOrg --visibility all

# 设置仅对特定仓库可见的组织变量
gh variable set MYVARIABLE --org myOrg --repos repo1,repo2,repo3

# 从 .env 文件批量设置多个变量
gh variable set -f .env
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、互斥与可见性校验见 [pkg/cmd/variable/set/set.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/variable/set/set.go)。
