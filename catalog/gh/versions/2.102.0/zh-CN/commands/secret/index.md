---
title: gh secret
command:
  - secret
---

管理 GitHub 机密。

## 简介

机密（secret）可设置在仓库或组织级，供 GitHub Actions、Agents 或 Dependabot 使用；用户、组织和仓库级机密可供 GitHub Codespaces 使用；环境级机密供 GitHub Actions 使用。运行 `gh help secret set` 可了解入门方法。

## 子命令导览

- [gh secret list](cli:command:secret/list)：列出仓库、环境、组织或用户级的机密，别名 `ls`。
- [gh secret set](cli:command:secret/set)：创建或更新机密，支持批量导入 dotenv 文件。
- [gh secret delete](cli:command:secret/delete)：删除机密，别名 `remove`。

## 选项

### `--repo`

短旗标 `-R`。格式：`--repo <[HOST/]OWNER/REPO>`。以 `[HOST/]OWNER/REPO` 格式选择其他仓库。该旗标注册在 `gh secret` 分组级并持久化，对 `list`、`set`、`delete` 三个子命令都生效；未指定时从当前 Git 仓库推断目标仓库。

## 环境变量

- `GH_REPO`：与 `--repo` 作用相同，为命令指定 `[HOST/]OWNER/REPO` 形式的目标仓库；`--repo` 优先，见[环境变量](../../reference/environment.md)。

## 使用提醒

- 子命令用 `--org`、`--env`、`--user` 选择机密层级，三者互斥；都不给时作用于仓库级。
- 组织与用户级机密可通过可见性与所选仓库限定访问范围，见 [`gh secret set`](cli:command:secret/set)。
- 机密值在本地加密后才发送到 GitHub。

## 示例

```sh
# 在交互提示中为当前仓库设置机密
gh secret set MYSECRET

# 列出当前仓库的机密
gh secret list
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 分组定义见 [pkg/cmd/secret/secret.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/secret/secret.go)；分组级 `--repo` 持久旗标由 [pkg/cmdutil/repo_override.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/repo_override.go) 的 `EnableRepoOverride` 添加。
