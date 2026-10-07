---
title: gh release create
command:
  - release
  - create
---

为仓库创建新的 GitHub release。别名 `new`。

## 简介

可以在命令行给出一组资产文件随 release 一起上传；要为资产定义显示 label，在文件名后追加以 `#` 起始的文本（如 `asset.zip#My display label`）。

若同名的 git tag 尚不存在，会自动从默认分支的最新状态创建 tag；用 `--target` 让自动建 tag 指向其他分支或 commit，用 `--verify-tag` 在远端尚无该 tag 时中止创建。release 创建完成后，可在本地执行 `git fetch --tags origin` 拉取新 tag。要从 annotated tag 创建 release，先用 git 在本地建 tag 并推送到 GitHub，再运行本命令；`--notes-from-tag` 会取 annotated tag 的注释作为 release 说明，若 tag 不是 annotated，则改用关联 commit 的信息。

`--generate-notes` 通过 GitHub Release Notes API 自动生成说明；未显式给出标题时，标题也会自动生成。使用自动生成说明时，`--notes` 给出的附加说明会前置于自动生成的部分。

默认情况下，即使自上个 release 以来没有任何新提交，也会照常创建 release（可能产生内容重复的 release）；`--fail-on-no-commits` 在没有新提交时使命令失败，但仓库尚无任何 release 时不受影响。

不带任何参数运行时进入交互流程：从最近若干 tag 中选择或输入新 tag 名，再在编辑器中撰写说明（可选以自动生成说明、commit 记录或 git tag 信息为模板）。非交互模式下必须给出 tag，否则报错。

### 不可变 release

仓库启用 release 不可变性（immutability）后，将强制以下保护：与 release 关联的 git tag 不能修改或删除；release 资产不能修改或删除。不可变性仅在 release 发布后生效——草稿 release 及其 tag 仍可修改或删除。`create` 附带资产时分为多次 API 调用：先以草稿创建 release、上传资产、再发布，因此不可变保护同样只在最终发布后才开始生效。

## 参数

### `TAG`

格式：`[<tag>]`，可选。release 使用的 git tag 名。省略时进入交互选择；非交互模式下必须给出。

### `FILENAME|PATTERN`

格式：`[<filename>... | <pattern>...]`，可选。随 release 上传的资产文件或 glob 模式，可给出多个；文件名后追加 `#` 起始的文本可定义该资产的显示 label。

## 选项

### `--draft`

短旗标 `-d`。格式：`--draft`。把 release 保存为草稿而不发布。

### `--prerelease`

短旗标 `-p`。格式：`--prerelease`。把 release 标记为 prerelease。

### `--target`

格式：`--target <branch>`。目标分支或完整 commit SHA（默认为仓库主分支）。仅在需要自动创建 tag 时生效。

### `--title`

短旗标 `-t`。格式：`--title <string>`。release 标题。

### `--notes`

短旗标 `-n`。格式：`--notes <string>`。release 说明。

### `--notes-file`

短旗标 `-F`。格式：`--notes-file <file>`。从 `file` 读取 release 说明（`-` 表示从标准输入读取）。

### `--discussion-category`

格式：`--discussion-category <string>`。在指定分类中发起讨论。

### `--generate-notes`

格式：`--generate-notes`。通过 GitHub Release Notes API 为 release 自动生成标题与说明。

### `--notes-start-tag`

格式：`--notes-start-tag <string>`。生成 release 说明时作为起点的 tag。

### `--latest`

格式：`--latest`。把该 release 标记为 "Latest"（默认按日期与版本自动判断）；`--latest=false` 显式不标记为最新。

### `--verify-tag`

格式：`--verify-tag`。若 git tag 在远端仓库中尚不存在则中止。

### `--notes-from-tag`

格式：`--notes-from-tag`。从 tag 注释或该 tag 关联 commit 的信息中获取说明。

### `--fail-on-no-commits`

格式：`--fail-on-no-commits`。自上个 release 以来没有提交时失败（对首个 release 无影响）。

## 使用提醒

- 非交互运行且未给出 tag 时报错；交互模式下未给出说明来源时会打开编辑器。
- `--notes-from-tag` 不能与 `--generate-notes`、`--notes-start-tag` 或 `--repo` 同用（前者互斥报错，后者因需要读取本地 tag 信息而不支持）。
- `--discussion-category` 不能与 `--draft` 同用，草稿 release 不支持讨论。
- 本地存在同名 annotated tag 但尚未推送时，命令会提示先推送该 tag，或用 `--target` 显式指向其他目标另行建 tag。
- 带资产创建非草稿 release 时，若同名 tag 已存在已发布 release 会报错；命令先以草稿创建、上传完成后再发布，任一步失败都会清理掉草稿。
- 创建失败且提示可能缺少 `workflow` scope 时，按提示执行 `gh auth refresh -h <主机名> -s workflow` 补授权限。
- 成功后输出新 release 的 URL。

## 示例

```sh
# 交互式创建 release
gh release create

# 交互式地基于指定 tag 创建 release
gh release create v1.2.3

# 非交互式创建 release
gh release create v1.2.3 --notes "bugfix release"

# 使用 GitHub Release Notes API 自动生成说明
gh release create v1.2.3 --generate-notes

# 使用文件中的 release 说明
gh release create v1.2.3 -F release-notes.md

# 以 tag 注释或关联 commit 信息作为说明
gh release create v1.2.3 --notes-from-tag

# 不把 release 标记为最新
gh release create v1.2.3 --latest=false

# 上传目录下全部 tarball 作为资产
gh release create v1.2.3 ./dist/*.tgz

# 上传带显示 label 的资产
gh release create v1.2.3 '/path/to/asset.zip#My display label'

# 创建 release 并发起讨论
gh release create v1.2.3 --discussion-category "General"

# 仅当自上个 release 以来有新提交时才创建
gh release create v1.2.3 --fail-on-no-commits
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、交互流程、互斥检查与"草稿—上传—发布"编排见 [pkg/cmd/release/create/create.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/create/create.go)，API 调用见同目录 [http.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/create/http.go)。
- 资产参数解析（`#label` 语法）与并发上传（固定并发 5）见 [pkg/cmd/release/shared/upload.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/shared/upload.go)。
