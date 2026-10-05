---
title: gh label
command:
  - label
---

管理 GitHub 仓库的标签：列出、创建、克隆、编辑与删除。

## 简介

`gh label` 是标签管理命令的分组入口，自身不直接执行操作；不带子命令运行时仅显示帮助。

本组子命令默认作用于当前仓库：从本地 git 远端解析得到，也可用 `GH_REPO` 环境变量或下方 `-R/--repo` 旗标显式指定，见[环境变量](../../reference/environment.md)。标签颜色统一要求为 6 位十六进制色值（如 `E99695`）。

## 子命令导览

- [gh label list](cli:command:label/list)：列出仓库中的标签，别名 `gh label ls`。
- [gh label create](cli:command:label/create)：在仓库中创建新标签。
- [gh label clone](cli:command:label/clone)：把一个仓库的全部标签复制到另一个仓库。
- [gh label edit](cli:command:label/edit)：修改标签的名称、描述或颜色。
- [gh label delete](cli:command:label/delete)：删除仓库中的标签。

## 选项

### `--repo`

短旗标 `-R`。格式：`--repo <[HOST/]OWNER/REPO>`。以 `[HOST/]OWNER/REPO` 形式选择另一个目标仓库。本旗标注册在 `gh label` 分组命令上并持久生效，全部子命令都可使用。

## 使用提醒

- 当前目录不是 git 仓库且未显式指定仓库时，命令会因无法确定目标仓库而报错。
- 删除、覆盖标签会直接影响仓库的议题与拉取请求分类，操作前建议先 [`gh label list`](cli:command:label/list) 确认。

## 示例

```sh
# 列出当前仓库的标签
gh label list

# 在指定仓库中创建标签
gh label create bug --repo cli/cli
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 分组定义见 [pkg/cmd/label/label.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/label/label.go)；`--repo` 持久旗标的注册见 [pkg/cmdutil/repo_override.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/repo_override.go)。
