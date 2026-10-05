---
title: gh issue comment
command:
  - issue
  - comment
---

## 简介

在议题下添加评论。未通过旗标提供正文或附件时，命令以交互方式提示输入评论内容；`--edit-last` 与 `--delete-last` 转为编辑或删除当前用户的最后一条评论。

用 `--attach` 上传图片或视频：正文中已引用的附件（如 `![alt](./login.png)`）会被改写为指向已上传的资源，未被正文引用的附件追加到评论末尾。每条命令最多附加 50 个文件。图片的替代文本写在路径后的 `#` 之后（如 `--attach './login.png#The login error state'`），缺省时使用文件名；正文引用中原有的替代文本保持不变；视频渲染为播放器，没有替代文本。

## 参数

### `NUMBER|URL`

必需。议题选择器，两种形式任选其一：议题编号（如 `123`，可带 `#` 前缀）或议题 URL（如 `https://github.com/OWNER/REPO/issues/123`）。URL 自带仓库信息时以该仓库为准。

## 选项

### `--body`

短旗标 `-b`。格式：`--body <text>`。评论文本 `text`。

### `--body-file`

短旗标 `-F`。格式：`--body-file <file>`。从 `file` 读取正文文本（"-" 表示从标准输入读取）。

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

格式：`--create-if-none`。找不到评论时新建评论。只能与 `--edit-last` 同用。

### `--attach`

格式：`--attach <file>`。附加图片或视频 `file`，格式为 `<file>#<图片替代文本>`，可重复给出。

## 环境变量

- `--editor` 与交互撰写使用的编辑器由 `GH_EDITOR`、`GIT_EDITOR`、`VISUAL`、`EDITOR` 依次决定，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--body`、`--body-file`、`--editor`、`--web` 四者只能选一；仅给出 `--attach` 时视为已提供正文输入。
- `--attach` 不能与 `--web`、`--delete-last` 同用；`--delete-last` 不能与任何正文旗标同用。
- `--yes` 只能与 `--delete-last` 同用；非交互运行删除时必须给出 `--yes`，交互删除默认显示确认提示（删除不可恢复）。
- `--edit-last` 找不到当前用户的评论时报错；给出 `--create-if-none`（或交互确认）时改为新建评论。
- 发布或更新成功后向标准输出打印评论 URL；删除成功后向标准错误输出提示。

## 示例

```sh
# 在 12 号议题下添加评论
gh issue comment 12 --body "Hi from GitHub CLI"

# 附加截图，替代文本写在 "#" 之后
gh issue comment 12 --attach './login.png#The login error state'

# 重复旗标附加多个文件
gh issue comment 12 --attach ./before.png --attach ./after.png
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与议题定位见 [pkg/cmd/issue/comment/comment.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/comment/comment.go)。
- 评论的创建、编辑与删除流程见 [pkg/cmd/pr/shared/commentable.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/shared/commentable.go)（与拉取请求评论共用）。
