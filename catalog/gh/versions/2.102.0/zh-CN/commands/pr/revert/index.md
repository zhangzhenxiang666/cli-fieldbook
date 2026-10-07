---
title: gh pr revert
command:
  - pr
  - revert
---

回退一个已合并的拉取请求。

## 简介

对已合并的拉取请求发起回退：创建一个新的回退拉取请求并在成功后打印其 URL。只能回退已合并的拉取请求，未合并的会报错。

未指定 `--title`/`--body` 时，沿用 GitHub 自动生成的回退标题与正文；显式给出的值会覆盖默认生成内容。

## 参数

### `NUMBER|URL|BRANCH`

必填，命令形态为 `{<number> | <url> | <branch>}`。定位目标拉取请求，三种形式：

- 数字：拉取请求编号，如 `123`；
- URL：拉取请求地址，如 `https://github.com/OWNER/REPO/pull/123`；
- 分支名：头部分支名，如 `patch-1`，跨仓库时可用 `OWNER:patch-1`。

## 选项

### `--draft`

短旗标 `-d`。格式：`--draft`。把回退拉取请求标记为草稿。

### `--title`

短旗标 `-t`。格式：`--title <string>`。回退拉取请求的标题。

### `--body`

短旗标 `-b`。格式：`--body <string>`。回退拉取请求的正文。

### `--body-file`

短旗标 `-F`。格式：`--body-file <file>`。从 `file` 读取正文文本（用 `"-"` 从标准输入读取）。

## 使用提醒

- 参数必填：省略时报错"cannot revert pull request: number, url, or branch required"。
- `--body` 与 `--body-file` 二选一，同时给出会报错。

## 示例

```sh
# 回退指定拉取请求
$ gh pr revert 23

# 以草稿形式创建回退拉取请求
$ gh pr revert 23 --draft

# 指定标题，正文来自文件
$ gh pr revert 23 --title "Revert PR #23" --body-file notes.md
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与回退参数的处理见 [pkg/cmd/pr/revert/revert.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/revert/revert.go)。
