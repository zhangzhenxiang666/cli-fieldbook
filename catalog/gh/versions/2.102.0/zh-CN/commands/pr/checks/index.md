---
title: gh pr checks
command:
  - pr
  - checks
---

显示单个拉取请求的 CI 检查状态。

## 简介

列出拉取请求的检查项及其状态。不带参数时选择当前分支所属的拉取请求。

使用 `--json` 时输出中包含 `bucket` 字段，它把 `state` 字段归类为 `pass`、`fail`、`pending`、`skipping` 或 `cancel`。

附加退出代码：`8` 表示存在待定检查。

## 参数

### `NUMBER|URL|BRANCH`

可选，命令形态为 `[<number> | <url> | <branch>]`。定位目标拉取请求，三种形式：

- 数字：拉取请求编号，如 `123`；
- URL：拉取请求地址，如 `https://github.com/OWNER/REPO/pull/123`；
- 分支名：头部分支名，如 `patch-1`，跨仓库时可用 `OWNER:patch-1`。

省略时默认选择当前分支所属的拉取请求。

## 选项

### `--web`

短旗标 `-w`。格式：`--web`。打开网页浏览器显示检查详情。

### `--watch`

格式：`--watch`。持续监视检查直到其完成。

### `--fail-fast`

格式：`--fail-fast`。在首个检查失败时退出监视模式。

### `--interval`

短旗标 `-i`。格式：`--interval <int>`。监视模式下的刷新间隔（秒），默认 `10`。

### `--required`

格式：`--required`。只显示必需的检查。

### `--json`

格式：`--json <strings>`。以 JSON 输出指定字段。取值 `name`、`state`、`startedAt`、`completedAt`、`link`、`bucket`、`event`、`workflow`、`description`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。用 jq `expression` 过滤 JSON 输出，仅在给出 `--json` 时可用。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板格式化 JSON 输出，参见 `gh help formatting`（详见[格式化](../../../reference/formatting.md)）；仅在给出 `--json` 时可用。

## 使用提醒

- 退出代码：有检查失败时为 `1`；仅存在待定检查时为 `8`，另见[退出代码](../../../reference/exit-codes.md)。
- `--watch` 不能与 `--json` 同用；`--fail-fast` 与 `--interval` 只能在给出 `--watch` 时使用。
- 使用 `-R` 指定仓库时必须显式给出参数，否则报错。
- `--web` 打开的是拉取请求的 checks 页面。

## 示例

```sh
# 查看当前分支拉取请求的检查
$ gh pr checks

# 监视指定拉取请求直到检查完成，每 30 秒刷新
$ gh pr checks 123 --watch --interval 30

# 首个失败即退出监视
$ gh pr checks --watch --fail-fast

# 只看必需的检查
$ gh pr checks --required
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、监视循环与退出码（`PendingError`）见 [pkg/cmd/pr/checks/checks.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/checks/checks.go)。
