---
title: gh repo gitignore view
command:
  - repo
  - gitignore
  - view
---

## 简介

查看某个可用的仓库 .gitignore 模板。

`<template>` 是区分大小写的 .gitignore 模板名；可用模板清单见 [gh repo gitignore list](cli:command:repo/gitignore/list)。

## 参数

### `TEMPLATE`

格式：`<template>`。要查看的 .gitignore 模板名，区分大小写。

## 使用提醒

- 模板名无效时报错，并提示运行 `gh repo gitignore list` 查看可选项。
- 重定向输出可直接生成 .gitignore 文件，见下方示例。

## 示例

```sh
# 查看 Go 的 .gitignore 模板
gh repo gitignore view Go

# 查看 Python 的 .gitignore 模板
gh repo gitignore view Python

# 用 Go 模板创建新的 .gitignore 文件
gh repo gitignore view Go > .gitignore

# 用 Python 模板创建新的 .gitignore 文件
gh repo gitignore view Python > .gitignore
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与无效模板名的错误提示见 [pkg/cmd/repo/gitignore/view/view.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/gitignore/view/view.go)。
