---
title: magpie github dismiss
command:
  - github
  - dismiss
---

清除上次同步留下的替换提示,然后显示同步状态。

## 简介

同步替换过内容时,状态输出会持续提示哪些部分被替换、副本保留在哪里,直到 [`github undo`](cli:command:github/undo) 复原或本命令清除提示。清除后状态输出恢复干净;被替换的副本文件仍留在同步文件夹里。

## 使用提醒

- dismiss 只是清除提示,不删除副本文件,也不改变任何设置。

## 示例

```sh
magpie github dismiss
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go) 的 `syncCmd` `dismiss` 分支。
