---
title: gh release
command:
  - release
---

管理 GitHub release。

## 简介

`gh release` 提供一组子命令，覆盖 release 的创建、查看、编辑、删除，以及资产的上传、下载与删除，另含基于 attestation 的校验命令。除另有说明外，各子命令默认作用于当前目录对应的仓库（由 git 远程解析得到），并遵循 [环境变量](../../reference/environment.md) 中的通用认证配置。

帮助输出把子命令分为 "General commands"（`list`、`create`）与 "Targeted commands"（其余子命令）两组，本页导览按此顺序排列。

## 子命令导览

- [gh release list](cli:command:release/list)：列出仓库中的 release，可过滤草稿与 prerelease，支持 JSON 导出。别名 `ls`。
- [gh release create](cli:command:release/create)：创建新 release，可同时上传资产。别名 `new`。
- [gh release view](cli:command:release/view)：查看 release 详情，未指定 tag 时查看最新的 release。
- [gh release edit](cli:command:release/edit)：编辑既有 release 的标题、说明、tag 等属性。
- [gh release upload](cli:command:release/upload)：向既有 release 上传资产文件。
- [gh release download](cli:command:release/download)：下载 release 资产或源码归档。
- [gh release delete](cli:command:release/delete)：删除 release，可选连同 git tag 一起删除。
- [gh release delete-asset](cli:command:release/delete-asset)：删除 release 中的单个资产。
- [gh release verify](cli:command:release/verify)：校验 release 的 attestation（证明）。
- [gh release verify-asset](cli:command:release/verify-asset)：校验给定文件确实来自某个 release。

## 选项

### `--repo`

短旗标 `-R`。格式：`--repo <[HOST/]OWNER/REPO>`。按 `[HOST/]OWNER/REPO` 格式选择另一个仓库。该选项以持久旗标形式注册在 `gh release` 上，对所有子命令生效。

## 使用提醒

- 按名称定位 release 的子命令（`view`、`edit`、`upload`、`delete` 等）除已发布的 release 外，也能按待定 tag 找到草稿 release。
- 仓库启用 release 不可变性（immutability）后，已发布 release 的 git tag 与资产不可修改或删除，`create`、`edit`、`delete` 等命令会受其约束；详见 [gh release create](cli:command:release/create)。
- 未经认证时命令会以退出代码 `4` 失败，约定见[退出代码](../../reference/exit-codes.md)。

## 示例

```sh
# 列出当前仓库的 release
gh release list

# 为 tag v1.2.3 创建 release 并上传资产
gh release create v1.2.3 ./dist/*

# 查看并下载最新的 release
gh release view
gh release download --pattern '*.deb'
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令树与 `--repo` 持久旗标注册见 [pkg/cmd/release/release.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/release.go)；"General commands"/"Targeted commands" 分组由 `cmdutil.AddGroup` 定义。
- 持久旗标机制见 [pkg/cmdutil/repo_override.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/repo_override.go)。
