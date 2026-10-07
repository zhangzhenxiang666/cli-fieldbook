---
title: gh browse
command:
  - browse
---

在浏览器中打开仓库、议题、拉取请求等 GitHub 页面，从终端转到网页查看与交互。

## 简介

可从终端转到 web 浏览器查看与交互的对象包括：

- 议题
- 拉取请求
- 仓库内容
- 仓库主页
- 仓库设置

此外也可打开仓库的 projects、releases、wiki 与 Actions 页面，或文件的 blame 视图。

## 参数

### `NUMBER|PATH|COMMIT-SHA`

可选，写作 `[<number> | <path> | <commit-sha>]`。浏览器定位方式三选一：

- 数字：打开对应议题或拉取请求，如 `123`；
- 路径：打开目录或文件，如 `cmd/gh/main.go`；路径后可跟 `:行号` 或 `:起始行-结束行` 指定选区，如 `main.go:312`；
- 提交 SHA：打开对应提交页面。

## 选项

### `--repo`

短旗标 `-R`。格式：`--repo <[HOST/]OWNER/REPO>`。以 `[HOST/]OWNER/REPO` 格式选择另一个仓库。

### `--projects`

短旗标 `-p`。格式：`--projects`。打开仓库的 projects 页面。

### `--releases`

短旗标 `-r`。格式：`--releases`。打开仓库的 releases 页面。

### `--wiki`

短旗标 `-w`。格式：`--wiki`。打开仓库 wiki。

### `--actions`

短旗标 `-a`。格式：`--actions`。打开仓库的 Actions 页面。

### `--settings`

短旗标 `-s`。格式：`--settings`。打开仓库设置页面。

### `--blame`

格式：`--blame`。打开文件的 blame 视图，需要文件路径参数。

### `--no-browser`

短旗标 `-n`。格式：`--no-browser`。打印目标 URL 而不打开浏览器。

### `--commit`

短旗标 `-c`。格式：`--commit <string>`。传入提交 SHA 选择另一个提交，默认是最后一次提交；不带值使用时即取最后一次提交。

### `--branch`

短旗标 `-b`。格式：`--branch <string>`。传入分支名选择另一个分支。

## 环境变量

- `BROWSER`：配置打开链接所用、非默认的浏览器（gh 也识别 `GH_BROWSER`，优先级更高），见[环境变量](../../reference/environment.md)。
- `GH_REPO`：指定 `[HOST/]OWNER/REPO` 后，效果同 `--repo`，路径参数按所给原样用于目标仓库。

## 使用提醒

- 位置参数不能与 `--projects`、`--releases`、`--settings`、`--actions` 或 `--wiki` 同用。
- `--branch`、`--commit`、`--projects`、`--releases`、`--settings`、`--actions`、`--wiki` 至多选一。
- `--blame` 必须搭配文件路径参数。
- 参数是数字或提交 SHA 时，不能再用 `--branch` 或 `--commit`。
- 打开文件路径而未指定 `--branch`/`--commit` 时，会经 API 查询仓库默认分支作为 ref。
- `--no-browser` 会先经 API 确认目标仓库存在，再打印 URL。

## 示例

```sh
# 打开当前仓库主页
gh browse

# 打开当前仓库的 script 目录
gh browse script/

# 打开议题或拉取请求 217
gh browse 217

# 打开提交页面
gh browse 77507cd94ccafcf568f8560cfecde965fcfa63

# 打开仓库设置
gh browse --settings

# 打开 main.go 的第 312 行
gh browse main.go:312

# 打开 main.go 第 312 行的 blame 视图
gh browse main.go:312 --blame

# 在 bug-fix 分支头部打开 main.go
gh browse main.go --branch bug-fix

# 在提交 775007cd 处打开 main.go
gh browse main.go --commit=77507cd94ccafcf568f8560cfecde965fcfa63
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 参数解析（数字/路径/SHA、行号选区）、互斥检查与 URL 构造见 [pkg/cmd/browse/browse.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/browse/browse.go)。
