---
title: gh pr comment
command:
  - pr
  - comment
---

向拉取请求添加评论。

## 简介

未通过旗标提供正文或附件时，命令会交互提示输入评论正文。

用 `--attach` 上传图片或视频：正文中已引用的附件（如 `![alt](./login.png)`）会被改写为指向已上传的资产，未被引用的附件追加到评论末尾。每条命令最多附加 50 个文件。图片的替代文本跟在路径 `#` 之后（如 `--attach './login.png#The login error state'`），未给出时使用文件名；正文中已写的引用保留其原有替代文本；视频渲染为播放器、没有替代文本。

## 参数

### `NUMBER|URL|BRANCH`

可选，命令形态为 `[<number> | <url> | <branch>]`。定位目标拉取请求，三种形式：

- 数字：拉取请求编号，如 `123`；
- URL：拉取请求地址，如 `https://github.com/OWNER/REPO/pull/123`；
- 分支名：头部分支名，如 `patch-1`，跨仓库时可用 `OWNER:patch-1`。

省略时默认选择当前分支所属的拉取请求。

## 选项

### `--body`

短旗标 `-b`。格式：`--body <text>`。评论正文 `text`。

### `--body-file`

短旗标 `-F`。格式：`--body-file <file>`。从 `file` 读取正文文本（用 `"-"` 从标准输入读取）。

### `--editor`

短旗标 `-e`。格式：`--editor`。跳过提示并打开文本编辑器撰写正文。

### `--web`

短旗标 `-w`。格式：`--web`。打开网页浏览器撰写评论。

### `--edit-last`

格式：`--edit-last`。编辑当前用户的最后一条评论。

### `--delete-last`

格式：`--delete-last`。删除当前用户的最后一条评论。

### `--yes`

格式：`--yes`。给出 `--delete-last` 时跳过删除确认提示。

### `--create-if-none`

格式：`--create-if-none`。未找到评论时新建一条，只能与 `--edit-last` 同用。

### `--attach`

格式：`--attach <file>`。附加图片或视频 `file`，格式为 `'<file>#<图片替代文本>'`，可重复给出，每条命令最多 50 个。

## 使用提醒

- 使用 `-R` 指定仓库时必须显式给出参数，否则报错。
- 只附加文件而不提供正文时，编辑场景（`--edit-last`）会保留被编辑评论的原有正文，附件之外不做改动。
- `--delete-last` 默认有确认提示，脚本中可用 `--yes` 跳过。

## 示例

```sh
# 向拉取请求添加评论
$ gh pr comment 13 --body "Hi from GitHub CLI"

# 附加截图，替代文本跟在 "#" 之后
$ gh pr comment 13 --attach './login.png#The login error state'

# 重复旗标附加多个文件
$ gh pr comment 13 --attach ./before.png --attach ./after.png
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与 `--edit-last`/`--delete-last` 的共用评论逻辑见 [pkg/cmd/pr/comment/comment.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/comment/comment.go) 与 [pkg/cmd/pr/shared/comments.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/shared/comments.go)。
