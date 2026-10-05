---
title: gh issue develop
command:
  - issue
  - develop
---

## 简介

管理议题的关联分支：默认为议题创建新的关联分支，用 `--list` 改为列出现有分支。创建成功后向标准输出输出分支的 URL（形如 `<host>/<owner>/<repo>/tree/<branch>`）；配合 `--checkout` 可同时检出该分支，配合 `--worktree` 可检出到指定路径的 worktree。

用 `--base` 指定基分支时，新分支从该远程分支创建，并记录为之后用 `gh pr create` 从新分支创建拉取请求时的基分支。

## 参数

### `NUMBER|URL`

必需。议题选择器，两种形式任选其一：议题编号（如 `123`，可带 `#` 前缀）或议题 URL（如 `https://github.com/OWNER/REPO/issues/123`）。URL 自带仓库信息时以该仓库为准。

## 选项

### `--branch-repo`

格式：`--branch-repo <string>`。要在其中创建新分支的仓库的名称或 URL。

### `--base`

短旗标 `-b`。格式：`--base <string>`。作为新分支起点的远程分支名称。

### `--checkout`

短旗标 `-c`。格式：`--checkout`。创建分支后检出它。

### `--list`

短旗标 `-l`。格式：`--list`。列出议题的关联分支。

### `--name`

短旗标 `-n`。格式：`--name <string>`。要创建的分支名称。

### `--worktree`

格式：`--worktree <path>`。把分支检出到位于 `path` 的 worktree。

### `--issue-repo`

短旗标 `-i`。格式：`--issue-repo <string>`。议题所在仓库的名称或 URL。已弃用，改用 `--repo`。

## 使用提醒

- `--list` 与 `--branch-repo`、`--base`、`--checkout`、`--name`、`--worktree` 均互斥。
- `--worktree` 需要配合 `--checkout`，且路径不能为空。
- 未给出 `--name` 时由 GitHub 自动生成分支名；给出的名称与目标仓库中现有关联分支一致时直接复用该分支。
- `--issue-repo` 为兼容旧写法保留：与 `--repo` 同用时 `--repo` 的值转给 `--branch-repo`，`--issue-repo` 的值转给 `--repo`；`--issue-repo`、`--repo`、`--branch-repo` 三者同时给出会报错。

## 示例

```sh
# 列出 123 号议题的分支
gh issue develop --list 123

# 列出 cli/cli 仓库中 123 号议题的分支
gh issue develop --list --repo cli/cli 123

# 基于 my-feature 分支为 123 号议题创建分支
gh issue develop 123 --base my-feature

# 为 123 号议题创建分支并检出
gh issue develop 123 --checkout

# 创建分支并检出到 worktree
gh issue develop 123 --checkout --worktree /path/to/wt-feature

# 在 monalisa/cli 仓库为 cli/cli 仓库的 123 号议题创建分支
gh issue develop 123 --repo cli/cli --branch-repo monalisa/cli
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、兼容旧旗标的预处理与分支检出见 [pkg/cmd/issue/develop/develop.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/develop/develop.go)。
