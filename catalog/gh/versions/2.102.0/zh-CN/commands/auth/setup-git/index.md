---
title: gh auth setup-git
command:
  - auth
  - setup-git
---

把 git 配置为使用 GitHub CLI 作为凭据助手。

## 简介

本命令把 git 的 credential helper 配置为 gh，使 git 的 https 操作复用 gh 已存储的认证凭据。关于 git 凭据助手的背景见 [gitcredentials 文档](https://git-scm.com/docs/gitcredentials)。

默认为所有已认证主机设置 gh 为凭据助手；没有任何已认证主机时命令报错。也可以用 `--hostname` 只配置单个主机；该主机未认证过时同样报错，加 `--force` 可跳过该检查。

## 参数

本命令不使用位置参数。

## 选项

### `--hostname`

短旗标 `-h`。格式：`--hostname <string>`。指定要为其配置 git 的主机名。

### `--force`

短旗标 `-f`。格式：`--force <--hostname>`。即使主机未知也强制配置；必须与 `--hostname` 同用。

## 使用提醒

- 只给 `--force` 不给 `--hostname` 会直接报旗标错误。
- 主机未认证且未加 `--force` 时，报错并提示先运行 `gh auth login -h <主机名>`。
- 本命令只写入 git 配置中的凭据助手条目，实际应答由 [`gh auth git-credential`](cli:command:auth/git-credential) 完成。

## 示例

```sh
# 为所有已认证主机把 gh 配置为 git 凭据助手
gh auth setup-git

# 只为 enterprise.internal 主机配置
gh auth setup-git --hostname enterprise.internal
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与 `--force` 校验见 [pkg/cmd/auth/setupgit/setupgit.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/auth/setupgit/setupgit.go)。
