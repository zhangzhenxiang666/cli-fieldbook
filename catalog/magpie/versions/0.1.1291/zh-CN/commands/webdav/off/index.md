---
title: magpie webdav off
command:
  - webdav
  - off
---

关闭 WebDAV 同步;服务器上的文件保留。

## 简介

停止同步,输出确认"WebDAV sync is off; the file on the server stays"。服务器上的封存文件不动,之后 `magpie webdav on` 可以重新开启。

当前开着的是另一类同步(S3 或 GitHub)时,本命令会报错并提示用对应命令(`magpie s3 off` 或 `magpie github off`)关闭,防止误关——但目标地址会被保留,对应命令单独使用即可迁回。

## 使用提醒

- 本机设置不受影响;关闭只是停止双向同步。

## 示例

```sh
magpie webdav off
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go) 的 `syncCmd` `off` 分支(含"另一类同步开着时"的防误关检查)。
