---
title: magpie github off
command:
  - github
  - off
---

关闭 GitHub 同步;仓库里的加密文件与提交历史保留。

## 简介

停止同步,输出确认"GitHub sync is off; the encrypted file and its commit history stay"。仓库里的加密文件与提交历史不动,之后 `magpie github on` 可以重新开启。

当前开着的是另一类同步(WebDAV 或 S3)时,本命令会报错并提示用对应命令(`magpie webdav off` 或 `magpie s3 off`)关闭,防止误关——但目标地址会被保留,对应命令单独使用即可迁回。

## 使用提醒

- 本机设置不受影响;关闭只是停止双向同步。

## 示例

```sh
magpie github off
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go) 的 `syncCmd` `off` 分支(含"另一类同步开着时"的防误关检查)。
