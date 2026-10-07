---
title: gh org
command:
  - org
---

管理 GitHub 组织。

## 简介

`gh org` 提供与 GitHub 组织相关的命令，当前包含列出已认证用户所属组织的 `gh org list`；该子命令在帮助中归入 General commands 组。

## 子命令导览

- [gh org list](cli:command:org/list)：列出已认证用户所属的组织，别名 `ls`。

## 使用提醒

- 本组命令针对的是你所属的组织；创建或管理组织本身的设置不在 gh 的能力范围内。

## 示例

```sh
# 列出所属组织
gh org list
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 分组定义见 [pkg/cmd/org/org.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/org/org.go)。
