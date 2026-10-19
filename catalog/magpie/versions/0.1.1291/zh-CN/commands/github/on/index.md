---
title: magpie github on
command:
  - github
  - on
---

在一个已有 GitHub 仓库上开启同步,并立即同步一次。

## 简介

把加密的设置存进所给仓库,让每台电脑上的 providers、设置、profiles、agent 模型与 library 保持一致。仓库必须已经存在并且是私有的;首次同步会初始化空仓库的默认分支,其他分支必须已存在。开启后立即同步一次,地址或 token 有错当场暴露。

会交互式询问 GitHub token 与封存口令(passphrase),输入不回显,不接受命令行传值;token 只为这个仓库保存,需要 Contents 的读写权限。可以从 stdin 管道输入:token 一行,口令一行。

## 参数

### `address`

仓库地址,形如 `github://<owner>/<repo>` 或 `github://<owner>/<repo>/<folder>`。必须是 GitHub 地址;`https://` 或 `s3://` 开头的地址会分别提示改用 [`webdav on`](cli:command:webdav/on) 或 [`s3 on`](cli:command:s3/on)。

### `pairs`

可选的 `k=v` 设置,可给多个:

- `branch=<分支>`:同步写到哪个分支;不给则用仓库默认分支。
- `token=`(空值):触发交互式询问新 token。
- `passphrase=`(空值):触发交互式询问新口令。
- `keys=yes|no`:`no` 时 providers 不带 API key 同步,每台电脑保留自己的 key。
- `agents=yes|no`:`no` 时不同步 agent 模型。
- `library=yes|no`:`no` 时不同步 library。
- `usage=yes|no`:`yes` 时本机用量也上传,一天一个封存文件,Usage 页会汇总各台电脑的用量。

## 使用提醒

- 新开启时默认同步 providers(带 API key)、settings、profiles 与 agent 模型(源码中新配置默认 `Keys: true, Agents: true`)。
- 若另一类同步(WebDAV 或 S3)开着,`github on` 会把同步迁到仓库(与另两类共用同一实现);原服务器信息保留,对应命令单独使用即可迁回。
- 其他字段名会报错并列出合法字段:address、branch、token、passphrase、keys、agents、library、usage。

## 示例

```sh
magpie github on github://me/my-magpie-backup
magpie github on github://team/shared/magpie branch=sync
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 参数解析与字段校验见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go) 的 `syncSet`;仓库与分支要求见同文件 `githubUsage` 常量。
- `github://` 地址解析见 [sync-backup.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/sync-backup.md) 的 `github.go` 一节。
