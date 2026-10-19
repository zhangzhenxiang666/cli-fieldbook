---
title: magpie webdav upload
command:
  - webdav
  - upload
---

用本机设置强行覆盖服务器上"不是备份"的文件;服务器上的旧文件先保留。

## 简介

正常同步会拒绝覆盖服务器上不像 magpie 备份的文件(空文件、被截断的、别的应用写入的)。`upload` 在确认要覆盖时使用:把本机设置写上去,服务器原文件保留在同步文件夹里。成功后输出"this computer's setup is on the server now"。

同步未开启时报错并提示开启命令。

## 使用提醒

- 只在明确想覆盖服务器文件时使用;先用 [`magpie webdav`](cli:command:webdav) 的状态输出确认服务器文件确实异常。

## 示例

```sh
magpie webdav upload
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go) 的 `syncCmd` `upload` 分支。
