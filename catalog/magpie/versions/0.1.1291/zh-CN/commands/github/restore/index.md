---
title: magpie github restore
command:
  - github
  - restore
---

以仓库里的内容为准,替换本机对应的设置部分;本机原内容先保留。

## 简介

把仓库里封存文件的各部分下载并替换到本机。执行前先把本机当前设置保存起来,`magpie github undo` 可以整体复原。没有差异时输出"nothing differed: nothing was replaced"。

同步未开启时报错并提示开启命令。

## 使用提醒

- 这是一次整体替换,不是逐项选择;只想改个别设置请直接用相应命令。
- 替换前本机设置被保留,用 [`github undo`](cli:command:github/undo) 放回,或用 [`github dismiss`](cli:command:github/dismiss) 清除提示。
- 登录状态(订阅账号的 sign-in)不随同步走:同步带来的是设置,本机要用还需 [`accounts add`](cli:command:accounts/add) 登录。

## 示例

```sh
magpie github restore
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go) 的 `syncCmd` `restore` 分支。
