---
title: gh release edit
command:
  - release
  - edit
---

编辑既有的 release。

## 简介

要修改的属性全部通过选项指定，至少须给出一个选项，否则报错。可修改标题、说明、tag、目标分支、草稿/prerelease/"Latest" 标记等；成功后输出该 release 的 URL。

修改说明可用 `--notes` 直接给文本，或用 `--notes-file` 从文件（`-` 表示标准输入）读取；两者同时给出时以 `--notes-file` 为准。`--draft`、`--prerelease`、`--latest` 为三态旗标，可用 `=false` 显式取消对应状态（例如把草稿 release 的 `--draft` 设为 `false` 即将其发布）。

不通过 `--tag` 提供新 tag 名时，请求会显式携带当前 tag 名，以免 API 把 release 的 tag 移除。

## 参数

### `TAG`

格式：`<tag>`，必填。要编辑的 release 的 tag 名；草稿 release 按其待定 tag 查找。

## 选项

### `--draft`

格式：`--draft`。把 release 保存为草稿而不发布；`--draft=false` 发布原为草稿的 release。

### `--prerelease`

格式：`--prerelease`。把 release 标记为 prerelease；`--prerelease=false` 取消该标记。

### `--latest`

格式：`--latest`。显式把 release 标记为 "Latest"；`--latest=false` 显式取消。

### `--notes`

短旗标 `-n`。格式：`--notes <string>`。release 说明。

### `--title`

短旗标 `-t`。格式：`--title <string>`。release 标题。

### `--discussion-category`

格式：`--discussion-category <string>`。发布草稿时在指定分类中发起讨论。

### `--target`

格式：`--target <branch>`。目标分支或完整 commit SHA（默认为仓库主分支）。

### `--tag`

格式：`--tag <string>`。tag 的名称，用于把 release 改到新的 tag。

### `--notes-file`

短旗标 `-F`。格式：`--notes-file <file>`。从 `file` 读取 release 说明（`-` 表示从标准输入读取）。

### `--verify-tag`

格式：`--verify-tag`。若 git tag 在远端仓库中尚不存在则中止；仅在同时用 `--tag` 改名时才执行该校验。

## 使用提醒

- 一个选项都不带运行会直接报错；只想改一项也至少给出对应的一个选项。
- `--notes` 与 `--notes-file` 同用时以 `--notes-file` 为准。
- 目标仓库用继承选项 `-R`/`--repo` 切换。

## 示例

```sh
# 发布此前为草稿的 release
gh release edit v1.0 --draft=false

# 用文件内容更新 release 说明
gh release edit v1.0 --notes-file /path/to/release_notes.md
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、三态旗标与参数组装见 [pkg/cmd/release/edit/edit.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/edit/edit.go)，API 调用见同目录 [http.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/edit/http.go)。
- release 查找（含草稿待定 tag）见 [pkg/cmd/release/shared/fetch.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/shared/fetch.go)。
