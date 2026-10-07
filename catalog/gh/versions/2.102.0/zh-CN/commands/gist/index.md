---
title: gh gist
command:
  - gist
---

管理 GitHub gist：创建、列出、查看、编辑、删除与重命名。

## 简介

`gh gist` 是 gist 管理命令的分组入口，自身不直接执行操作；不带子命令运行时仅显示帮助。本组命令访问的都是当前认证账号名下的 gist，使用前需已完成认证，见 [`gh auth login`](cli:command:auth/login)。

按源码帮助注记，gist 作为参数给出时支持两种形式：

- gist ID，例如 `5b0e0062eb8e9654adad7bb1d81cc75f`；
- URL，例如 `https://gist.github.com/OWNER/5b0e0062eb8e9654adad7bb1d81cc75f`。

新建的 gist 默认为机密（secret）状态；只有显式指定 `--public`（见 [`gh gist create`](cli:command:gist/create)）才会公开列出。

## 子命令导览

- [gh gist clone](cli:command:gist/clone)：把 gist 克隆为本地 git 仓库。
- [gh gist create](cli:command:gist/create)：从文件或标准输入创建 gist，别名 `gh gist new`。
- [gh gist list](cli:command:gist/list)：列出当前账号的 gist，支持正则过滤，别名 `gh gist ls`。
- [gh gist view](cli:command:gist/view)：查看 gist 内容或文件列表，也可在浏览器中打开。
- [gh gist edit](cli:command:gist/edit)：编辑自己拥有的 gist：更新描述、修改文件内容、增删文件。
- [gh gist delete](cli:command:gist/delete)：删除 gist。
- [gh gist rename](cli:command:gist/rename)：重命名 gist 中的文件。

## 使用提醒

- 编辑、删除、重命名只能作用于自己拥有的 gist，操作他人 gist 会报错。
- 认证与主机选择由环境变量控制（如 `GH_TOKEN`、`GH_HOST`），见[环境变量](../../reference/environment.md)。

## 示例

```sh
# 交互式创建 gist
gh gist create

# 列出自己的机密 gist
gh gist list --secret

# 在浏览器中打开指定 gist
gh gist view 5b0e0062eb8e9654adad7bb1d81cc75f --web
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 分组定义与 gist 参数格式注记见 [pkg/cmd/gist/gist.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/gist/gist.go)。
