---
title: magpie s3 undo
command:
  - s3
  - undo
---

把上一次 [`s3 restore`](cli:command:s3/restore) 替换掉的本机设置放回来。

## 简介

restore 在替换前会把本机当时的设置整体保留;`undo` 将其复原,并输出放回了哪些部分。没有可复原的内容时输出"nothing differed: nothing was replaced"。

同步未开启时报错并提示开启命令。

## 使用提醒

- 只撤销最近一次 restore;restore 之后本机又做的修改会被这次 undo 覆盖。

## 示例

```sh
magpie s3 undo
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go) 的 `syncCmd` `restore, undo` 分支。
