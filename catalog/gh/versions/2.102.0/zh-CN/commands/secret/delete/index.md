---
title: gh secret delete
command:
  - secret
  - delete
---

删除机密。

## 简介

删除以下层级之一的机密：

- 仓库（默认）：仓库内 GitHub Actions 运行、Agents 会话或 Dependabot 可用；
- 环境（environment）：仓库中某个部署环境的 GitHub Actions 运行可用；
- 组织（organization）：组织内 GitHub Actions 运行、Agents 会话、Dependabot 或 Codespaces 可用；
- 用户（user）：你的用户的 Codespaces 可用。

默认作用于仓库级，目标仓库从当前 Git 仓库推断；显式指定仓库（旗标或 `GH_REPO`）以外的情况下，若存在多个可用远端，交互模式会提示选择，非交互模式报错。

## 参数

### `SECRET-NAME`

格式：`<secret-name>`。要删除的机密名，必填。

## 选项

### `--org`

短旗标 `-o`。格式：`--org <string>`。删除组织的机密。

### `--env`

短旗标 `-e`。格式：`--env <string>`。删除某个环境的机密。

### `--user`

短旗标 `-u`。格式：`--user`。删除你的用户的机密。

### `--app`

短旗标 `-a`。格式：`--app <string>`。删除特定应用的机密。取值 `actions`、`agents`、`codespaces`、`dependabot`；未指定时默认 `actions`（用户层级为 `codespaces`）。应用与层级的受支持组合：`actions` 支持仓库/组织/环境，`agents` 支持仓库/组织，`codespaces` 支持用户/组织/仓库，`dependabot` 支持仓库/组织。

## 环境变量

- `GH_REPO`：为命令指定 `[HOST/]OWNER/REPO` 形式的目标仓库，作用同分组级 `--repo` 旗标，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--org`、`--env`、`--user` 三者互斥，只能给出其一。
- 删除是即时生效的破坏性操作；先核对名称可用 [`gh secret list`](cli:command:secret/list)。
- 本命令没有确认提示，删除前请确认层级（仓库/环境/组织/用户）选择正确。

## 示例

```sh
# 删除当前仓库的机密
gh secret delete MYSECRET

# 删除组织的机密
gh secret delete MYSECRET --org myOrg

# 删除当前仓库部署环境的机密
gh secret delete MYSECRET --env myenvironment

# 删除用户（Codespaces）机密
gh secret delete MYSECRET --user
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与层级解析见 [pkg/cmd/secret/delete/delete.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/secret/delete/delete.go)。
