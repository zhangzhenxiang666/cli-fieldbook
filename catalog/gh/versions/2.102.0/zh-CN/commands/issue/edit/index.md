---
title: gh issue edit
command:
  - issue
  - edit
---

## 简介

编辑同一仓库中的一个或多个议题：标题、正文、指派人、标签、项目、里程碑、议题类型，以及父议题、子议题与阻塞关系；也可用 `--attach` 为单个议题附加图片或视频。未给出任何编辑旗标时进入交互模式，交互模式仅支持单个议题。

用 `--attach` 上传附件时：未给正文旗标则保留议题原正文并把附件追加到末尾；正文中已引用的附件（如 `![alt](./login.png)`）会被改写为指向已上传的资源。每条命令最多附加 50 个文件。图片的替代文本写在路径后的 `#` 之后（如 `--attach './login.png#The login error state'`），缺省时使用文件名；正文引用中原有的替代文本保持不变；视频渲染为播放器，没有替代文本。

编辑议题的项目需要令牌具有 `project` scope 授权，可运行 `gh auth refresh -s project` 授权。`--add-assignee` 与 `--remove-assignee` 都支持特殊值：`@me` 指派或取消指派自己；`@copilot` 指派或取消指派 Copilot（GitHub Enterprise Server 不支持）。

## 参数

### `NUMBERS|URLS`

必需。一个或多个议题选择器：每个参数用议题编号（如 `123`，可带 `#` 前缀）或议题 URL（如 `https://github.com/OWNER/REPO/issues/123`）指定，两种形式可混用；所有议题必须属于同一仓库。

## 选项

### `--title`

短旗标 `-t`。格式：`--title <string>`。设置新标题。

### `--body`

短旗标 `-b`。格式：`--body <string>`。设置新正文。

### `--body-file`

短旗标 `-F`。格式：`--body-file <file>`。从 `file` 读取正文文本（"-" 表示从标准输入读取）。

### `--add-assignee`

格式：`--add-assignee <login>`。按 `login` 添加指派人。用 `@me` 指派自己，或 `@copilot` 指派 Copilot。

### `--remove-assignee`

格式：`--remove-assignee <login>`。按 `login` 移除指派人。用 `@me` 取消指派自己，或 `@copilot` 取消指派 Copilot。

### `--add-label`

格式：`--add-label <name>`。按 `name` 添加标签。

### `--remove-label`

格式：`--remove-label <name>`。按 `name` 移除标签。

### `--add-project`

格式：`--add-project <title>`。按 `title` 把议题加入项目。

### `--remove-project`

格式：`--remove-project <title>`。按 `title` 把议题移出项目。

### `--milestone`

短旗标 `-m`。格式：`--milestone <name>`。按 `name` 修改议题所属的里程碑。

### `--remove-milestone`

格式：`--remove-milestone`。移除议题的里程碑关联。

### `--type`

格式：`--type <name>`。按 `name` 设置议题类型。

### `--remove-type`

格式：`--remove-type`。移除议题的议题类型。

### `--parent`

格式：`--parent <number>`。按 `number` 或 URL 设置父议题。

### `--remove-parent`

格式：`--remove-parent`。移除父议题。

### `--add-sub-issue`

格式：`--add-sub-issue <number>`。按 `number` 或 URL 添加子议题。

### `--remove-sub-issue`

格式：`--remove-sub-issue <number>`。按 `number` 或 URL 移除子议题。

### `--add-blocked-by`

格式：`--add-blocked-by <number>`。按议题 `number` 或 URL 添加"blocked by"关系。

### `--remove-blocked-by`

格式：`--remove-blocked-by <number>`。按议题 `number` 或 URL 移除"blocked by"关系。

### `--add-blocking`

格式：`--add-blocking <number>`。按议题 `number` 或 URL 添加"blocking"关系。

### `--remove-blocking`

格式：`--remove-blocking <number>`。按议题 `number` 或 URL 移除"blocking"关系。

### `--attach`

格式：`--attach <file>`。附加图片或视频 `file`，格式为 `<file>#<图片替代文本>`，可重复给出。

## 环境变量

- 交互编辑正文使用的编辑器由 `GH_EDITOR`、`GIT_EDITOR`、`VISUAL`、`EDITOR` 依次决定，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--body` 与 `--body-file` 互斥；`--milestone` 与 `--remove-milestone`、`--type` 与 `--remove-type`、`--parent` 与 `--remove-parent` 也分别互斥。
- 编辑多个议题时不能进入交互模式，不能用 `--add-sub-issue`，也不能用 `--attach`。
- 非交互运行必须至少给出一个编辑旗标，否则报错。
- 成功编辑的议题 URL 排序后输出到标准输出；失败的议题输出到标准错误，且命令以非零退出码结束。
- 附件全部上传失败时不改写正文，其余编辑照常生效；部分失败时议题仍以成功附件更新，命令以非零退出码结束。
- 父议题、子议题与阻塞关系中的引用必须与当前仓库在同一主机，跨主机引用会报错。

## 示例

```sh
# 修改标题与正文
gh issue edit 23 --title "I found a bug" --body "Nothing works"

# 添加与移除标签
gh issue edit 23 --add-label "bug,help wanted" --remove-label "core"

# 添加与移除指派人
gh issue edit 23 --add-assignee "@me" --remove-assignee monalisa,hubot
gh issue edit 23 --add-assignee "@copilot"

# 加入与移出项目
gh issue edit 23 --add-project "Roadmap" --remove-project v1,v2

# 设置与移除里程碑
gh issue edit 23 --milestone "Version 1"
gh issue edit 23 --remove-milestone

# 从文件读取正文
gh issue edit 23 --body-file body.txt

# 附加截图，替代文本写在 "#" 之后
gh issue edit 23 --attach './login.png#The login error state'
gh issue edit 23 --attach ./before.png --attach ./after.png

# 一次编辑多个议题
gh issue edit 23 34 --add-label "help wanted"

# 设置与移除议题类型
gh issue edit 23 --type Bug
gh issue edit 23 --remove-type

# 设置与移除父议题
gh issue edit 23 --parent 100
gh issue edit 23 --remove-parent

# 添加子议题与阻塞关系
gh issue edit 100 --add-sub-issue 123,124
gh issue edit 123 --add-blocked-by 200 --add-blocking 300,301
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、互斥检查、并行更新与延迟关系更新见 [pkg/cmd/issue/edit/edit.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/edit/edit.go)。
