---
title: gh repo gitignore
command:
  - repo
  - gitignore
---

## 简介

列出与查看仓库可用的 .gitignore 模板。模板列表与内容经 GitHub API 按默认主机获取。

## 子命令导览

- [gh repo gitignore list](cli:command:repo/gitignore/list)：列出可用的 .gitignore 模板。
- [gh repo gitignore view](cli:command:repo/gitignore/view)：查看某个 .gitignore 模板的内容。

## 使用提醒

- 模板名区分大小写，取值见 [gh repo gitignore view](cli:command:repo/gitignore/view)。

## 示例

```sh
# 列出可用模板
gh repo gitignore list

# 查看 Go 模板并用它生成 .gitignore
gh repo gitignore view Go > .gitignore
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [pkg/cmd/repo/gitignore/gitignore.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/gitignore/gitignore.go)。
