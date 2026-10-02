---
title: jj git init
command:
  - git
  - init
---

## 简介

创建使用 Git 后端的 jj 仓库，或接管现有 Git 仓库。

## 参数

### `DESTINATION`

初始化目录；默认当前目录。

## 选项

### `--colocate`

创建并置仓库；内置默认 git.colocate=true。

### `--no-colocate`

创建非并置仓库，Git 后端保存在 .jj 中。

### `--object-hash`

sha1 或 sha256；默认读取 git.object-hash（内置 sha1）。

### `--git-repo`

使用已存在的 Git 仓库作为后端；与显式 --colocate 冲突；同目录已有 Git 仓库会进入并置路径。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 已有 Git 项目常用 jj git init --colocate。v0.45.1 的实际默认值以参数定义和 misc.toml 为准，不能沿用旧教程中“默认不并置”的结论。

源码：[cli/src/commands/git/init.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/init.rs)。
