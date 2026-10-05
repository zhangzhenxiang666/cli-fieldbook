---
title: gh issue create
command:
  - issue
  - create
---

## 简介

在 GitHub 上创建议题。目标仓库默认从当前目录的 Git 远程推断，可用 `--repo` 指定。交互模式下会依次提示标题、正文（可从模板起步）与元数据；既未提供 `--title` 与正文，也不能交互时会报错。本命令有别名 `gh issue new`。

用 `--attach` 上传图片或视频：附件追加到正文末尾，正文中已引用的附件（如 `![alt](./login.png)`）会被改写为指向已上传的资源。每条命令最多附加 50 个文件。图片的替代文本写在路径后的 `#` 之后（如 `--attach './login.png#The login error state'`），缺省时使用文件名；正文引用中原有的替代文本保持不变；视频渲染为播放器，没有替代文本。

把议题加入项目需要令牌具有 `project` scope 授权，可运行 `gh auth refresh -s project` 授权。`--assignee` 支持特殊值：`@me` 指派自己；`@copilot` 指派 Copilot（GitHub Enterprise Server 不支持）。

## 参数

本命令不接受位置参数。

## 选项

### `--title`

短旗标 `-t`。格式：`--title <string>`。提供标题，否则会提示输入。

### `--body`

短旗标 `-b`。格式：`--body <string>`。提供正文，否则会提示输入。

### `--body-file`

短旗标 `-F`。格式：`--body-file <file>`。从 `file` 读取正文文本（"-" 表示从标准输入读取）。

### `--editor`

短旗标 `-e`。格式：`--editor`。跳过提示并打开文本编辑器撰写标题与正文：第一行是标题，其余文本是正文。

### `--web`

短旗标 `-w`。格式：`--web`。打开浏览器创建议题。

### `--assignee`

短旗标 `-a`。格式：`--assignee <login>`。按 `login` 指派人，可重复给出或用逗号分隔。用 `@me` 指派自己。

### `--label`

短旗标 `-l`。格式：`--label <name>`。按 `name` 添加标签，可重复给出或用逗号分隔。

### `--project`

短旗标 `-p`。格式：`--project <title>`。按 `title` 把议题加入项目。

### `--milestone`

短旗标 `-m`。格式：`--milestone <name>`。按 `name` 把议题加入里程碑。

### `--recover`

格式：`--recover <string>`。从一次失败的 create 运行中恢复输入。

### `--template`

短旗标 `-T`。格式：`--template <name>`。用作正文起始文本的模板 `name`。

### `--type`

格式：`--type <name>`。按 `name` 设置议题类型。

### `--parent`

格式：`--parent <number>`。把新议题添加为指定父议题 `number` 或 URL 的子议题。

### `--blocked-by`

格式：`--blocked-by <numbers>`。把新议题标记为被这些议题 `numbers` 或 URL 阻塞。

### `--blocking`

格式：`--blocking <numbers>`。把新议题标记为阻塞这些议题 `numbers` 或 URL。

### `--attach`

格式：`--attach <file>`。附加图片或视频 `file`，格式为 `<file>#<图片替代文本>`，可重复给出。

## 环境变量

- `--editor` 使用的编辑器由 `GH_EDITOR`、`GIT_EDITOR`、`VISUAL`、`EDITOR` 依次决定，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--template` 不能与 `--body` 或 `--body-file` 同用；`--recover` 仅支持交互式运行。
- `--attach` 不能与 `--web` 同用。
- 非交互运行时必须提供 `--title` 与正文（`--body` 或 `--body-file`），或改用 `--editor`、`--web`。
- 创建成功后向标准输出打印新议题的 URL；附件部分上传失败时议题仍会以成功的附件创建，命令以非零退出码结束，但 URL 仍会输出。
- 议题类型、父议题与阻塞关系在议题创建后通过后续请求补齐。

## 示例

```sh
# 指定标题与正文创建议题
gh issue create --title "I found a bug" --body "Nothing works"

# 附加带替代文本的截图
gh issue create --attach './login.png#The login error state'

# 重复 --attach 附加多个文件
gh issue create --attach ./before.png --attach ./after.png

# 添加标签：逗号分隔或重复给出
gh issue create --label "bug,help wanted"
gh issue create --label bug --label "help wanted"

# 指派用户
gh issue create --assignee monalisa,hubot
gh issue create --assignee "@me"
gh issue create --assignee "@copilot"

# 把议题加入项目
gh issue create --project "Roadmap"

# 使用模板
gh issue create --template "Bug Report"

# 设置议题类型
gh issue create --type Bug

# 作为 100 号议题的子议题创建
gh issue create --parent 100
gh issue create --parent https://github.com/cli/go-gh/issues/42

# 同时声明被阻塞与阻塞关系
gh issue create --blocked-by 200,201 --blocking 300
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、交互流程与类型／父议题／阻塞关系的延迟更新见 [pkg/cmd/issue/create/create.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/create/create.go)。
