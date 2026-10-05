---
title: gh repo rename
command:
  - repo
  - rename
---

重命名仓库。

## 简介

`<new-name>` 是不含所有者的目标仓库名。默认重命名当前目录对应的仓库；要重命名其他仓库，用 `--repo` 指定。

新名称不能包含 `/`：把仓库转移给其他用户或组织不属于重命名，需在 github.com 上执行额外的转移步骤，参见[转移仓库所有权文档](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository)。

未使用 `--repo` 时，重命名成功后会把本地对应 git 远端的 URL 更新为新地址；更新失败只输出警告，不影响重命名结果。

## 参数

### `NEW-NAME`

可选，写作 `[<new-name>]`。新的仓库名（不含所有者）。交互模式省略时会提示输入；非交互模式必填，且单独给出参数时要求 `--yes`。

## 选项

### `--repo`

短旗标 `-R`。格式：`--repo <[HOST/]OWNER/REPO>`。以 `[HOST/]OWNER/REPO` 格式选择另一个仓库；本命令在自身定义中注册该旗标。

### `--confirm`

格式：`--confirm`。跳过确认提示。已弃用，改用 `--yes`。

### `--yes`

短旗标 `-y`。格式：`--yes`。跳过确认提示。

## 环境变量

- `GH_REPO`：省略 `--repo` 时，可用 `[HOST/]OWNER/REPO` 形式指定要重命名的仓库，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 交互模式下单独给出新名称且未用 `--repo` 时会先确认；非交互模式此时要求 `--yes`。
- 使用 `--repo` 重命名其他仓库时，不更新本地远端。
- 新名称包含 `/` 时报错，并提示参见仓库所有权转移文档。

## 示例

```sh
# 重命名当前仓库（foo/bar -> foo/baz）
gh repo rename baz

# 重命名指定仓库（qux/quux -> qux/baz）
gh repo rename -R qux/quux baz
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 参数与确认逻辑、本地远端 URL 更新见 [pkg/cmd/repo/rename/rename.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/rename/rename.go)。
