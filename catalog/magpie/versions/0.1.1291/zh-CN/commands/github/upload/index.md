---
title: magpie github upload
command:
  - github
  - upload
---

用本机设置强行覆盖仓库里"不是备份"的文件;旧文件先保留。

## 简介

正常同步会拒绝覆盖仓库里不像 magpie 备份的文件(空文件、被截断的、别的应用写入的)。`upload` 在确认要覆盖时使用:把本机设置写上去,旧文件保留在同步文件夹里。成功后输出"this computer's setup is on the server now"。

同步未开启时报错并提示开启命令。

## 使用提醒

- 只在明确想覆盖仓库里的文件时使用;先用 [`magpie github`](cli:command:github) 的状态输出确认仓库文件确实异常。

## 示例

```sh
magpie github upload
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go) 的 `syncCmd` `upload` 分支。
