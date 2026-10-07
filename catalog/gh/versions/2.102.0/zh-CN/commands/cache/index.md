---
title: gh cache
command:
  - cache
---

管理 GitHub Actions 缓存。

## 简介

`gh cache` 用于操作 GitHub Actions 缓存：列出当前仓库的缓存条目，或按缓存 ID、缓存键乃至整仓删除。缓存条目属于具体仓库，命令默认作用于从当前 Git 仓库推断出的目标仓库。

## 子命令导览

- [gh cache list](cli:command:cache/list)：列出仓库的 GitHub Actions 缓存，别名 `ls`。
- [gh cache delete](cli:command:cache/delete)：按缓存 ID、缓存键删除缓存，或用 `--all` 全部删除。

## 选项

### `--repo`

短旗标 `-R`。格式：`--repo <[HOST/]OWNER/REPO>`。以 `[HOST/]OWNER/REPO` 格式选择其他仓库。该旗标注册在 `gh cache` 分组级并持久化，对 `list`、`delete` 两个子命令都生效；未指定时从当前 Git 仓库的远端推断目标仓库。

## 环境变量

- `GH_REPO`：与 `--repo` 作用相同，为命令指定 `[HOST/]OWNER/REPO` 形式的目标仓库；`--repo` 优先，见[环境变量](../../reference/environment.md)。

## 使用提醒

- 缓存按仓库归属，操作其他仓库的缓存用 `--repo` 指定。
- 删除缓存需要令牌具有 `repo` scope，见 [`gh cache delete`](cli:command:cache/delete)。

## 示例

```sh
# 列出当前仓库的缓存
gh cache list

# 删除当前仓库的全部缓存
gh cache delete --all
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 分组定义见 [pkg/cmd/cache/cache.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/cache/cache.go)；分组级 `--repo` 持久旗标由 [pkg/cmdutil/repo_override.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/repo_override.go) 的 `EnableRepoOverride` 添加。
