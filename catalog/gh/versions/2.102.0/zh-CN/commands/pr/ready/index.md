---
title: gh pr ready
command:
  - pr
  - ready
---

把拉取请求标记为可评审。

## 简介

不带参数时作用于当前分支所属的拉取请求。只有打开状态的草稿拉取请求能被标记为可评审；已关闭的拉取请求会报错，已是目标状态的仅输出提示。

若所用套餐支持，用 `--undo` 可把拉取请求转回"草稿"。

## 参数

### `NUMBER|URL|BRANCH`

可选，命令形态为 `[<number> | <url> | <branch>]`。定位目标拉取请求，三种形式：

- 数字：拉取请求编号，如 `123`；
- URL：拉取请求地址，如 `https://github.com/OWNER/REPO/pull/123`；
- 分支名：头部分支名，如 `patch-1`，跨仓库时可用 `OWNER:patch-1`。

省略时默认选择当前分支所属的拉取请求。

## 选项

### `--undo`

格式：`--undo`。把拉取请求转为"草稿"。

## 使用提醒

- 使用 `-R` 指定仓库时必须显式给出参数，否则报错。
- 对已关闭的拉取请求执行会报错；对已是"可评审"或已是"草稿"的拉取请求仅输出提示。

## 示例

```sh
# 把当前分支的拉取请求标记为可评审
$ gh pr ready

# 标记指定拉取请求
$ gh pr ready 23

# 转回草稿
$ gh pr ready 23 --undo
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与状态检查见 [pkg/cmd/pr/ready/ready.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/ready/ready.go)。
