---
title: gh pr edit
command:
  - pr
  - edit
---

编辑拉取请求。

## 简介

修改拉取请求的标题、正文、基分支、评审人、指派人、标签、项目与里程碑。不带参数时选择当前分支所属的拉取请求。

编辑拉取请求的 projects 需要 `project` scope 授权，可运行 `gh auth refresh -s project`。

用 `--attach` 上传图片或视频：不带正文旗标时，拉取请求保留原有正文，附件追加到其后；正文中对附件的引用（如 `![alt](./login.png)`）会被改写为指向已上传的资产。每条命令最多附加 50 个文件。图片的替代文本跟在路径 `#` 之后（如 `--attach './login.png#The login error state'`），未给出时使用文件名；正文中已写的引用保留其原有替代文本；视频渲染为播放器、没有替代文本。部分附件上传失败时，拉取请求仍会以成功的附件更新，命令以非零状态退出，但拉取请求的 URL 仍打印到标准输出。

`--add-assignee` 与 `--remove-assignee` 支持特殊值 `@me`（指派/取消指派自己）与 `@copilot`（指派/取消指派 Copilot，GitHub Enterprise Server 不支持）；`--add-reviewer` 与 `--remove-reviewer` 支持 `@copilot`（请求/移除 Copilot 评审，GitHub Enterprise Server 不支持）。

## 参数

### `NUMBER|URL|BRANCH`

可选，命令形态为 `[<number> | <url> | <branch>]`。定位目标拉取请求，三种形式：

- 数字：拉取请求编号，如 `123`；
- URL：拉取请求地址，如 `https://github.com/OWNER/REPO/pull/123`；
- 分支名：头部分支名，如 `patch-1`，跨仓库时可用 `OWNER:patch-1`。

省略时默认选择当前分支所属的拉取请求。

## 选项

### `--title`

短旗标 `-t`。格式：`--title <string>`。设置新标题。

### `--body`

短旗标 `-b`。格式：`--body <string>`。设置新正文。

### `--body-file`

短旗标 `-F`。格式：`--body-file <file>`。从 `file` 读取正文文本（用 `"-"` 从标准输入读取）。

### `--base`

短旗标 `-B`。格式：`--base <branch>`。更改此拉取请求的基 `branch`。

### `--add-reviewer`

格式：`--add-reviewer <login>`。按 `login` 添加或重新请求评审人，用 `"@copilot"` 请求 Copilot 评审。

### `--remove-reviewer`

格式：`--remove-reviewer <login>`。按 `login` 移除评审人，用 `"@copilot"` 移除 Copilot 的评审请求。

### `--add-assignee`

格式：`--add-assignee <login>`。按 `login` 添加指派人，用 `"@me"` 指派自己，用 `"@copilot"` 指派 Copilot。

### `--remove-assignee`

格式：`--remove-assignee <login>`。按 `login` 移除指派人，用 `"@me"` 取消指派自己，用 `"@copilot"` 取消指派 Copilot。

### `--add-label`

格式：`--add-label <name>`。按 `name` 添加标签。

### `--remove-label`

格式：`--remove-label <name>`。按 `name` 移除标签。

### `--add-project`

格式：`--add-project <title>`。按 `title` 把拉取请求加入项目。

### `--remove-project`

格式：`--remove-project <title>`。按 `title` 把拉取请求移出项目。

### `--milestone`

短旗标 `-m`。格式：`--milestone <name>`。按 `name` 编辑拉取请求所属的里程碑。

### `--remove-milestone`

格式：`--remove-milestone`。移除拉取请求的里程碑关联。

### `--attach`

格式：`--attach <file>`。附加图片或视频 `file`，格式为 `'<file>#<图片替代文本>'`，可重复给出，每条命令最多 50 个。

## 使用提醒

- `--body` 与 `--body-file` 二选一；`--milestone` 与 `--remove-milestone` 二选一。
- 未给出任何编辑旗标且没有附件时，进入交互式编辑流程。
- 多个 `--add-*`/`--remove-*` 旗标接受逗号分隔的多个值（如 `--add-label "bug,help wanted"`）。
- `@copilot` 相关取值在 GitHub Enterprise Server 上不可用。

## 示例

```sh
# 编辑拉取请求的标题与正文
$ gh pr edit 23 --title "I found a bug" --body "Nothing works"

# 用文件作为正文
$ gh pr edit 23 --body-file body.txt

# 向正文追加截图，替代文本跟在 "#" 之后
$ gh pr edit 23 --attach './login.png#The login error state'

# 重复旗标附加多个文件
$ gh pr edit 23 --attach ./before.png --attach ./after.png

# 管理标签
$ gh pr edit 23 --add-label "bug,help wanted" --remove-label "core"

# 管理评审人
$ gh pr edit 23 --add-reviewer monalisa,hubot --remove-reviewer myorg/team-name

# 重新请求评审
$ gh pr edit 23 --add-reviewer monalisa

# 请求 GitHub Copilot 评审
$ gh pr edit 23 --add-reviewer "@copilot"

# 管理指派人
$ gh pr edit 23 --add-assignee "@me" --remove-assignee monalisa,hubot

# 指派 GitHub Copilot
$ gh pr edit 23 --add-assignee "@copilot"

# 管理项目与里程碑
$ gh pr edit 23 --add-project "Roadmap" --remove-project v1,v2
$ gh pr edit 23 --milestone "Version 1"
$ gh pr edit 23 --remove-milestone
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、编辑旗标映射与交互流程见 [pkg/cmd/pr/edit/edit.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/edit/edit.go)。
