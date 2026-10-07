---
title: gh release view
command:
  - release
  - view
---

查看某个 GitHub release 的信息。

## 简介

未显式给出 tag 参数时，显示项目最新的 release。除已发布的 release 外，按 tag 查找时也能命中以待定 tag 保存的草稿 release。

终端下以富文本渲染：tag 名加粗，草稿或 prerelease 显示对应徽标，随后是作者与时间、渲染后的 Markdown 说明、资产表格（Name、Digest、Size）以及指向 GitHub 的链接。输出被重定向（非终端）时改用键值对的纯文本格式。`--web` 改为在浏览器中打开该 release；`--json` 可导出结构化结果，语法见 [JSON 输出与格式化](../../../reference/formatting.md)。

## 参数

### `TAG`

格式：`[<tag>]`，可选。要查看的 release tag 名；省略时查看最新的 release。

## 选项

### `--web`

短旗标 `-w`。格式：`--web`。在浏览器中打开该 release。

### `--json`

格式：`--json <strings>`。把结果导出为 JSON，参数为逗号分隔的字段列表。本命令支持的字段：`apiUrl`、`author`、`assets`、`body`、`createdAt`、`databaseId`、`id`、`isDraft`、`isPrerelease`、`isImmutable`、`name`、`publishedAt`、`tagName`、`tarballUrl`、`targetCommitish`、`uploadUrl`、`url`、`zipballUrl`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。按 jq 表达式过滤或重组 JSON 输出，须与 `--json` 同用。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板渲染 JSON 输出，须与 `--json` 同用。

## 使用提醒

- `--web` 不能与 `--json` 同用；`--jq`、`--template` 也不能脱离 `--json` 单独使用。
- 目标仓库用继承选项 `-R`/`--repo` 切换，适合查看非当前目录对应仓库的 release。

## 示例

```sh
# 查看最新的 release
gh release view

# 查看指定 tag 的 release
gh release view v1.2.3

# 在浏览器中打开
gh release view v1.2.3 --web

# 以 JSON 输出 tag 名、标题与资产
gh release view v1.2.3 --json tagName,name,assets
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与终端/纯文本两种渲染见 [pkg/cmd/release/view/view.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/view/view.go)。
- "最新的 release" 与草稿的查找逻辑（并行查询已发布 release 与草稿待定 tag）见 [pkg/cmd/release/shared/fetch.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/shared/fetch.go)。
