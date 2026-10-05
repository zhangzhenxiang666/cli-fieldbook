---
title: gh version
command:
  - version
---

显示 gh 的版本与构建信息。

## 简介

本命令是隐藏命令，不出现在 `gh help` 的命令列表中，但可直接运行。输出包括版本号、构建日期（若可用）以及对应版本的 changelog 链接；版本号无法识别时，链接指向最新 release 页面。

## 参数

本命令不接受位置参数。

## 使用提醒

- 本命令不需要认证即可运行。
- 版本号也可用根命令的 `--version` 旗标查看。

## 示例

```sh
# 查看版本与构建信息
gh version
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与版本字符串、changelog 链接的格式化逻辑见 [pkg/cmd/version/version.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/version/version.go)。
