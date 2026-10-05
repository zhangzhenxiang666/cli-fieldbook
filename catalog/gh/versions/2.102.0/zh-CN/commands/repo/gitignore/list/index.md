---
title: gh repo gitignore list
command:
  - repo
  - gitignore
  - list
---

## 简介

列出可用的仓库 .gitignore 模板。别名 `ls`。

以表格输出 GITIGNORE 一列，经分页器显示。

## 使用提醒

- 本命令不接受位置参数，也没有本地选项。
- 查看具体模板的内容用 [gh repo gitignore view](cli:command:repo/gitignore/view)。

## 示例

```sh
# 列出可用的 .gitignore 模板
gh repo gitignore list
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 表格与 API 调用见 [pkg/cmd/repo/gitignore/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/gitignore/list/list.go)。
