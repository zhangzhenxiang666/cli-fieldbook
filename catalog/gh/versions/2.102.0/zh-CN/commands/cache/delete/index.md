---
title: gh cache delete
command:
  - cache
  - delete
---

删除 GitHub Actions 缓存。

## 简介

删除目标仓库的 GitHub Actions 缓存。删除操作要求令牌具有 `repo` scope 的授权。可按缓存 ID（数字）或缓存键删除单批缓存，也可用 `--all` 删除全部缓存；`--all` 还可与 `--ref` 连用，只删除特定 ref 的全部缓存。

按缓存键删除时，同一键与 ref 的组合可能对应多条缓存（各条 ID 不同），命令会删除匹配的全部条目并汇总数量。找不到匹配缓存时报错；`--all` 配合 `--succeed-on-no-caches` 时无缓存也以退出代码 0 结束。

## 参数

### `CACHE-ID|CACHE-KEY|ALL`

格式：`[<cache-id> | <cache-key> | --all]`。缓存 ID（数字）、缓存键二选一，或改用 `--all` 旗标，三者只能取其一（源码互斥校验）。省略参数时必须给出 `--all`。

## 选项

### `--all`

短旗标 `-a`。格式：`--all`。删除全部缓存；可与 `--ref` 连用，删除特定 ref 的全部缓存。

### `--ref`

短旗标 `-r`。格式：`--ref <string>`。按缓存键和 ref 删除，ref 格式为 `refs/heads/<branch name>` 或 `refs/pull/<number>/merge`。

### `--succeed-on-no-caches`

格式：`--succeed-on-no-caches`。没有缓存时返回退出代码 0。必须与 `--all` 连用。

## 环境变量

- `GH_REPO`：为命令指定 `[HOST/]OWNER/REPO` 形式的目标仓库，作用同分组级 `--repo` 旗标，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--ref` 只能与缓存键（或 `--all`）配合，不能与缓存 ID 同用（源码校验）。
- 只给 `--ref` 而不给缓存键或 `--all` 会报错。
- 先用 [`gh cache list`](cli:command:cache/list) 查看缓存 ID 与键。
- 删除是即时生效的破坏性操作，作用范围由目标仓库与 `--ref` 决定。

## 示例

```sh
# 按 ID 删除缓存
gh cache delete 1234

# 按键删除缓存
gh cache delete cache-key

# 删除指定仓库中按 ID 定位的缓存
gh cache delete 1234 --repo cli/cli

# 按键和分支 ref 删除缓存
gh cache delete cache-key --ref refs/heads/feature-branch

# 按键和拉取请求 ref 删除缓存
gh cache delete cache-key --ref refs/pull/<PR-number>/merge

# 删除全部缓存（无缓存时退出代码 1）
gh cache delete --all

# 删除特定 ref 的全部缓存
gh cache delete --all --ref refs/pull/<PR-number>/merge

# 删除全部缓存（无缓存时退出代码 0）
gh cache delete --all --succeed-on-no-caches
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、互斥校验与按键删除的批量语义见 [pkg/cmd/cache/delete/delete.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/cache/delete/delete.go)。
