---
title: gh secret set
command:
  - secret
  - set
---

创建或更新机密。

## 简介

在以下层级之一为机密设置值：

- 仓库（默认）：仓库内 GitHub Actions 运行、Agents 会话或 Dependabot 可用；
- 环境（environment）：仓库中某个部署环境的 GitHub Actions 运行可用；
- 组织（organization）：组织内 GitHub Actions 运行、Agents 会话、Dependabot 或 Codespaces 可用；
- 用户（user）：你的用户的 Codespaces 可用。

组织和用户级机密可选地限定仅特定仓库可用。机密值在本地加密后才发送到 GitHub。

机密值来自 `--body`；未指定时交互模式下提示输入，非交互模式下从标准输入读取。默认作用于仓库级，目标仓库从当前 Git 仓库推断；显式指定仓库（旗标或 `GH_REPO`）以外的情况下，若存在多个可用远端，交互模式会提示选择，非交互模式报错。使用 `--env-file`（或 `--no-store`）时可省略机密名参数。

## 参数

### `SECRET-NAME`

格式：`<secret-name>`。机密名，通常必填；仅在使用 `--env-file` 或 `--no-store` 时可省略（源码校验）。

## 选项

### `--org`

短旗标 `-o`。格式：`--org <organization>`。设置组织机密。

### `--env`

短旗标 `-e`。格式：`--env <environment>`。设置部署环境机密。

### `--user`

短旗标 `-u`。格式：`--user`。为你的用户设置机密。

### `--visibility`

短旗标 `-v`。格式：`--visibility <string>`。设置组织机密的可见性。取值 `all`、`private`、`selected`；默认 `private`。仅在与 `--org` 同用时有效。

### `--repos`

短旗标 `-r`。格式：`--repos <repositories>`。可访问组织或用户机密的仓库列表（逗号分隔）。仅当可见性为 `selected` 时可配合使用。

### `--no-repos-selected`

格式：`--no-repos-selected`。不授权任何仓库访问该组织机密。仅当可见性为 `selected` 时可用，且不能与 `--user` 同用。

### `--body`

短旗标 `-b`。格式：`--body <string>`。机密的值；未指定时从标准输入读取（交互模式下提示输入）。

### `--no-store`

格式：`--no-store`。不把机密保存到 GitHub，而是输出本地加密后的 base64 编码值。

### `--env-file`

短旗标 `-f`。格式：`--env-file <file>`。从 dotenv 格式文件载入机密名与值，批量设置；`-` 表示标准输入。

### `--app`

短旗标 `-a`。格式：`--app <string>`。设置机密所属的应用。取值 `actions`、`agents`、`codespaces`、`dependabot`；未指定时默认 `actions`（用户层级为 `codespaces`）。

## 环境变量

- `GH_REPO`：为命令指定 `[HOST/]OWNER/REPO` 形式的目标仓库，作用同分组级 `--repo` 旗标，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--org`、`--env`、`--user` 三者互斥；`--body` 与 `--env-file`、`--env-file` 与 `--no-store`、`--repos` 与 `--no-repos-selected` 也互斥。
- 显式给出 `--visibility` 时必须同时给出 `--org`；`--visibility=selected` 要求再给出 `--repos` 或 `--no-repos-selected`，反之给出 `--repos`/`--no-repos-selected` 时只允许 `selected`。
- 未显式给出 `--visibility` 但提供了 `--repos` 或 `--no-repos-selected` 时，按 `selected` 处理（源码行为）。
- 查看与删除见 [`gh secret list`](cli:command:secret/list) 与 [`gh secret delete`](cli:command:secret/delete)。

## 示例

```sh
# 在交互提示中粘贴当前仓库机密的值
gh secret set MYSECRET

# 从环境变量读取机密值
gh secret set MYSECRET --body "$ENV_VALUE"

# 为指定远端仓库设置机密
gh secret set MYSECRET --repo origin/repo --body "$ENV_VALUE"

# 从文件读取机密值
gh secret set MYSECRET < myfile.txt

# 为当前仓库的部署环境设置机密
gh secret set MYSECRET --env myenvironment

# 设置对公开和私有仓库都可见的组织机密
gh secret set MYSECRET --org myOrg --visibility all

# 设置仅对特定仓库可见的组织机密
gh secret set MYSECRET --org myOrg --repos repo1,repo2,repo3

# 设置对任何仓库都不可见的组织机密
gh secret set MYSECRET --org myOrg --no-repos-selected

# 为 Codespaces 设置用户级机密
gh secret set MYSECRET --user

# 为 Dependabot 设置仓库级机密
gh secret set MYSECRET --app dependabot

# 从 .env 文件批量设置多个机密
gh secret set -f .env

# 从标准输入批量设置多个机密
gh secret set -f - < myfile.txt
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、互斥与可见性校验、本地加密流程见 [pkg/cmd/secret/set/set.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/secret/set/set.go)。
