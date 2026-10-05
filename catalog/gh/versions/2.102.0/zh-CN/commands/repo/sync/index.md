---
title: gh repo sync
command:
  - repo
  - sync
---

用源仓库同步目标仓库。

## 简介

同步以源仓库的默认分支（或 `--branch` 指定的分支）更新目标仓库的对应分支，使两者一致。默认采用 fast-forward 更新；指定 `--force` 时改为硬重置同步两个分支。

不带参数时，本地仓库被选为目标仓库。源仓库默认为目标仓库的父仓库，可用 `--source` 覆盖。

两种模式的实现不同：目标是本地仓库时，从对应远端 fetch 后在本地执行快进合并或重置；目标是远端仓库时，先尝试 merge-upstream API，失败后回退到 git references API。除非指定 `--force`，不执行非 fast-forward 的更新。

## 参数

### `DESTINATION-REPOSITORY`

可选，写作 `[<destination-repository>]`。目标仓库；省略时以本地仓库为目标。

## 选项

### `--source`

短旗标 `-s`。格式：`--source <string>`。源仓库。

### `--branch`

短旗标 `-b`。格式：`--branch <string>`。要同步的分支（默认为默认分支）。

### `--force`

格式：`--force`。硬重置目标仓库的分支以匹配源仓库。

## 环境变量

- `GH_REPO`：省略位置参数时，可用 `[HOST/]OWNER/REPO` 形式指定源仓库推断所用的当前仓库，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 目标与源仓库分属不同主机时报错。
- 同步本地仓库时，目标分支存在分叉改动会报错并提示用 `--force` 覆盖；当前分支有未提交或未跟踪的本地改动时拒绝同步（提示先 `git stash`）。
- 同步远端仓库出现分叉时同样提示 `--force`；目标仓库不存在该分支时报错。
- 本地同步要求源仓库能对应到本地的一个 git 远端，找不到时报错。

## 示例

```sh
# 从远端父仓库同步本地仓库
gh repo sync

# 从远端父仓库同步本地仓库的指定分支
gh repo sync --branch v1

# 从父仓库同步远端复刻
gh repo sync owner/cli-fork

# 从另一个远端仓库同步远端仓库
gh repo sync owner/repo --source owner2/repo2
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 旗标注册与本地／远端两条同步路径见 [pkg/cmd/repo/sync/sync.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/sync/sync.go)；本地 git 操作与远端 API 调用分别见 [pkg/cmd/repo/sync/git.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/sync/git.go) 与 [pkg/cmd/repo/sync/http.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/sync/http.go)。
