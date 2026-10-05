---
title: gh repo fork
command:
  - repo
  - fork
---

创建仓库的复刻。

## 简介

不带参数时复刻当前目录对应的仓库，否则复刻指定的仓库。创建复刻后：

- 在本地仓库内运行（无参数）时，新复刻默认设为 `origin` 远端，既有的 `origin` 远端改名为 `upstream`；可用 `--remote-name` 改变新远端的名称。
- `upstream` 远端会被设为默认仓库（参见 [`gh repo set-default`](cli:command:repo/set-default)）。
- 在仓库外运行（给出仓库参数）时，可配合 `--clone` 把复刻克隆到当前目录。

交互模式下，若未显式给出 `--remote`（仓库内）或 `--clone`（仓库外），会相应询问是否添加远端或克隆。

额外的 `git clone` 旗标可以列在 `--` 之后。

## 参数

### `REPOSITORY`

可选，写作 `[<repository>]`。要复刻的仓库；省略时复刻当前目录对应的仓库。

### `GITFLAGS`

可选，写作 `[-- <gitflags>...]`。列在 `--` 之后的额外 `git clone` 旗标；给出 `--` 时必须先给出仓库参数。

## 选项

### `--clone`

格式：`--clone`。克隆复刻。不带仓库参数运行时不适用。

### `--remote`

格式：`--remote`。为复刻添加 git 远端。给出仓库参数时不支持。

### `--remote-name`

格式：`--remote-name <string>`。为新远端指定的名称，默认值为源码常量 `defaultRemoteName`（本版本实现为 `origin`）。

### `--org`

格式：`--org <string>`。在指定组织中创建复刻。

### `--fork-name`

格式：`--fork-name <string>`。重命名复刻得到的仓库。

### `--default-branch-only`

格式：`--default-branch-only`。复刻只包含默认分支。

## 环境变量

- `GH_REPO`：省略位置参数时，可用 `[HOST/]OWNER/REPO` 形式指定要复刻的仓库，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 给出仓库参数时不能使用 `--remote`；`--remote-name` 不能为空，`--org` 给出时不能为空值。
- 复刻已存在时命令不报错，而是提示复刻已存在。
- 未显式给出 `--remote-name` 时才会把既有 `origin` 改名为 `upstream`；显式指定的远端名已存在时报错。
- 在仓库外使用 `--remote`、`--remote-name` 不产生效果（源码中留有相关待办注记），实际场景应使用 `--clone`。

## 示例

```sh
# 复刻一个仓库
gh repo fork owner/repo

# 复刻一个仓库并克隆到本地
gh repo fork owner/repo --clone

# 复刻仓库但不克隆，同时跳过提示
gh repo fork owner/repo --clone=false
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 旗标注册、参数校验与仓库内／仓库外两条后续路径见 [pkg/cmd/repo/fork/fork.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/fork/fork.go)。
- 是否新建复刻按返回仓库的创建时间判断（早于 1 分钟视为已存在）；克隆复刻失败时按固定间隔自动重试（最多 3 次）。
