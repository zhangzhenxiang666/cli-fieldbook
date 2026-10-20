---
title: magpie s3 upload
command:
  - s3
  - upload
---

用本机设置强行覆盖桶里"不是备份"的文件;桶里的旧文件先保留。

## 简介

正常同步会拒绝覆盖桶里不像 magpie 备份的文件(空文件、被截断的、别的应用写入的)。`upload` 在确认要覆盖时使用:把本机设置写上去,桶里原文件保留在同步文件夹里。成功后输出"this computer's setup is on the server now"。

同步未开启时报错并提示开启命令。

## 使用提醒

- 只在明确想覆盖桶里的文件时使用;先用 [`magpie s3`](cli:command:s3) 的状态输出确认桶里文件确实异常。

## 示例

```sh
magpie s3 upload
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go) 的 `syncCmd` `upload` 分支。
