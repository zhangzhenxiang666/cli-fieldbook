---
title: jj git clone
command:
  - git
  - clone
---

## 简介

克隆 Git 仓库并初始化 jj 工作区。

## 参数

### `SOURCE`

Git URL 或本地仓库路径；本地路径会规范化为绝对路径。

### `DESTINATION`

目标目录；默认从源地址末段推导。

## 选项

### `--remote`

初始远端名称；默认 origin。

### `--colocate`

使用并置布局：工作区中同时存在 .jj 和 .git；v0.45.1 默认开启，除非 git.colocate=false。

### `--no-colocate`

把 Git 后端放在 .jj 中，不在工作区根目录暴露 .git。

### `--depth`

限制克隆历史深度；形成浅克隆。

### `--branch`

只获取匹配分支；可重复。使用 Git 支持的有限 glob（支持 \*，不等同完整 fileset/glob）。

### `--tag`

只获取匹配标签；可重复，模式限制同 --branch。

### `--object-hash`

Git 对象哈希：sha1 或 sha256；必须与源仓库一致；默认由 git.object-hash 决定（内置 sha1）。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 默认获取远端分支，并以默认分支为工作副本父修订。指定分支过滤时，首个精确匹配分支可影响初始父修订。不要把 sha256 当作可对既有仓库随意切换的设置。

源码：[cli/src/commands/git/clone.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/clone.rs)。
