---
title: gh pr review
command:
  - pr
  - review
---

为拉取请求添加评审。

## 简介

以通过、请求修改或评论三种类型之一提交评审。不带参数时评审当前分支所属的拉取请求。

不带任何评审类型旗标且处于交互模式时，会进入交互流程；非交互模式下必须给出 `--approve`、`--request-changes` 或 `--comment` 三者之一，且恰好一个。

## 参数

### `NUMBER|URL|BRANCH`

可选，命令形态为 `[<number> | <url> | <branch>]`。定位目标拉取请求，三种形式：

- 数字：拉取请求编号，如 `123`；
- URL：拉取请求地址，如 `https://github.com/OWNER/REPO/pull/123`；
- 分支名：头部分支名，如 `patch-1`，跨仓库时可用 `OWNER:patch-1`。

省略时默认选择当前分支所属的拉取请求。

## 选项

### `--approve`

短旗标 `-a`。格式：`--approve`。通过拉取请求。

### `--request-changes`

短旗标 `-r`。格式：`--request-changes`。对拉取请求请求修改。

### `--comment`

短旗标 `-c`。格式：`--comment`。对拉取请求发表评论。

### `--body`

短旗标 `-b`。格式：`--body <string>`。指定评审的正文。

### `--body-file`

短旗标 `-F`。格式：`--body-file <file>`。从 `file` 读取正文文本（用 `"-"` 从标准输入读取）。

## 使用提醒

- `--approve`、`--request-changes`、`--comment` 恰好给出一个，多给会报错。
- `--request-changes` 与 `--comment` 的评审要求正文非空（`--body` 或 `--body-file`）。
- `--body` 与 `--body-file` 二选一，同时给出会报错。
- 只给 `--body` 而不给任何类型旗标会报错。
- 使用 `-R` 指定仓库时必须显式给出参数，否则报错。

## 示例

```sh
# 通过当前分支的拉取请求
$ gh pr review --approve

# 为当前分支的拉取请求留下评审评论
$ gh pr review --comment -b "interesting"

# 为指定拉取请求添加评审
$ gh pr review 123

# 对指定拉取请求请求修改
$ gh pr review 123 -r -b "needs more ASCII art"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与类型旗标的互斥校验见 [pkg/cmd/pr/review/review.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/review/review.go)。
