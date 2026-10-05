---
title: gh pr create
command:
  - pr
  - create
---

创建拉取请求，别名 `gh pr new`。

## 简介

在 GitHub 上创建拉取请求，成功后打印新建拉取请求的 URL。交互模式下会依次提示标题与正文；用 `--title` 与 `--body` 跳过提示，或用 `--fill` 从提交信息自动填充。若 `--fill` 与 `--title`/`--body` 同时给出，显式给出的值优先并覆盖自动填充的内容。

当前分支未完全推送到远端时，会提示选择推送位置，并提供复刻基仓库的选项；以这种方式创建的复刻只包含上游仓库的默认分支。显式给出 `--head` 可跳过全部复刻与推送行为。`--head` 支持 `<user>:<branch>` 语法选择属于 `<user>` 的头仓库，暂不支持以组织作为 `<user>`，参见 [cli/cli#10093](https://github.com/cli/cli/issues/10093)。

基分支可用 `--base` 指定；未提供时使用 `gh-merge-base` git 分支配置，仍未配置时使用仓库默认分支。配置命令为 `git config branch.{current}.gh-merge-base {base}`。

在正文中引用议题可建立关联：正文提到 `Fixes #123` 或 `Closes #123` 时，对应议题会在拉取请求合并后自动关闭。

用 `--attach` 上传图片或视频，附件追加到正文末尾；正文中对附件的引用（如 `![alt](./login.png)`）会被改写为指向已上传的资产。每条命令最多附加 50 个文件。图片的替代文本跟在路径 `#` 之后（如 `--attach './login.png#The login error state'`），未给出时使用文件名；正文中已写的引用保留其原有替代文本；视频渲染为播放器、没有替代文本。部分附件上传失败时，拉取请求仍会以成功的附件创建，命令以非零状态退出，但新拉取请求的 URL 仍打印到标准输出。

默认允许基仓库维护者向拉取请求的头部分支推送新提交，用 `--no-maintainer-edit` 关闭。把拉取请求加入 projects 需要 `project` scope 授权，可运行 `gh auth refresh -s project`。

## 选项

### `--draft`

短旗标 `-d`。格式：`--draft`。把拉取请求标记为草稿。

### `--title`

短旗标 `-t`。格式：`--title <string>`。拉取请求的标题。

### `--body`

短旗标 `-b`。格式：`--body <string>`。拉取请求的正文。

### `--body-file`

短旗标 `-F`。格式：`--body-file <file>`。从 `file` 读取正文文本（用 `"-"` 从标准输入读取）。

### `--base`

短旗标 `-B`。格式：`--base <branch>`。希望代码合入的 `branch`（基分支）。

### `--head`

短旗标 `-H`。格式：`--head <branch>`。包含拉取请求提交的 `branch`（默认为当前分支）。

### `--editor`

短旗标 `-e`。格式：`--editor`。跳过提示并打开文本编辑器撰写标题与正文：第一行是标题，其余文本是正文。

### `--web`

短旗标 `-w`。格式：`--web`。打开网页浏览器创建拉取请求。

### `--fill-verbose`

格式：`--fill-verbose`。用提交信息（msg+body）作为描述。

### `--fill`

短旗标 `-f`。格式：`--fill`。用提交信息填充标题与正文。

### `--fill-first`

格式：`--fill-first`。用首个提交的信息填充标题与正文。

### `--reviewer`

短旗标 `-r`。格式：`--reviewer <handle>`。按 `handle` 请求个人或团队评审。

### `--assignee`

短旗标 `-a`。格式：`--assignee <login>`。按 `login` 指派人，用 `"@me"` 指派自己。

### `--label`

短旗标 `-l`。格式：`--label <name>`。按 `name` 添加标签。

### `--project`

短旗标 `-p`。格式：`--project <title>`。按 `title` 把拉取请求加入项目。

### `--milestone`

短旗标 `-m`。格式：`--milestone <name>`。按 `name` 把拉取请求加入里程碑。

### `--no-maintainer-edit`

格式：`--no-maintainer-edit`。禁用维护者修改拉取请求的能力。

### `--recover`

格式：`--recover <string>`。从一次失败的 create 运行中恢复输入。

### `--template`

短旗标 `-T`。格式：`--template <file>`。作为正文起始文本的模板 `file`。

### `--dry-run`

格式：`--dry-run`。打印详细信息而不创建拉取请求，但仍可能推送 git 变更。

### `--attach`

格式：`--attach <file>`。附加图片或视频 `file`，格式为 `'<file>#<图片替代文本>'`，可重复给出，每条命令最多 50 个。

## 环境变量

- `GH_REPO`：本命令在实现上单独读取该变量作为仓库覆盖（`--repo` 未给出时生效），见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--editor` 与 `--web` 二选一，同时给出会报错。
- `--fill`、`--fill-first`、`--fill-verbose` 三者两两互斥。
- `--template` 不能与 `--body` 或 `--body-file` 同用。
- 非交互且未用 `--web` 时，必须提供 `--title` 与 `--body`（或 `--fill`、`--fill-first`、`--fill-verbose`）。
- `--draft`、`--reviewer`、`--no-maintainer-edit`、`--dry-run`、`--attach` 都不能与 `--web` 同用；`--attach` 也不能与 `--dry-run` 同用。
- `--recover` 仅在交互模式下可用。
- 不带任何过滤条件的仓库上下文来自当前目录的 git 仓库，用 `-R` 或 `GH_REPO` 指定其他仓库。

## 示例

```sh
$ gh pr create --title "The bug is fixed" --body "Everything works again"
$ gh pr create --reviewer monalisa,hubot  --reviewer myorg/team-name
$ gh pr create --project "Roadmap"
$ gh pr create --base develop --head monalisa:feature
$ gh pr create --template "pull_request_template.md"
$ gh pr create --attach './login.png#The login error state'
$ gh pr create --attach ./before.png --attach ./after.png
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、交互流程、互斥检查与附件处理见 [pkg/cmd/pr/create/create.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/create/create.go)。
- `--attach` 旗标的注册与 50 个附件的上限见 [internal/attachments/flags.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/internal/attachments/flags.go)。
