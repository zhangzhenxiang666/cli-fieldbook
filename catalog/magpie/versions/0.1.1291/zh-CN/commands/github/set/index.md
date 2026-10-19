---
title: magpie github set
command:
  - github
  - set
---

修改已开启的 GitHub 同步的设置;未给出的项保持原样。

## 简介

在同步已开启的前提下改配置。支持的字段与 [`github on`](cli:command:github/on) 相同:address、branch、keys、agents、library、usage,`token=` 与 `passphrase=` 触发重新询问。

GitHub 同步未开启时执行 `set` 会报错并提示先用 `magpie github on` 开启;当前开着的是另一类同步(WebDAV 或 S3)时也会报错并指向对应命令。

## 参数

### `pairs`

一个或多个 `k=v`:

- `address=<github://owner/repo[/folder]>`:换仓库。
- `branch=<分支>`:换分支。
- `token=`、`passphrase=`:交互式询问新 token/口令。
- `keys=yes|no`、`agents=yes|no`、`library=yes|no`、`usage=yes|no`:同步内容开关。

## 使用提醒

- token 只为所给的仓库保存;换了仓库会重新询问。
- 字段值 `yes|no` 之外的会报错。

## 示例

```sh
magpie github set branch=sync
magpie github set keys=no
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 分发与字段解析见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go) 的 `syncCmd` 与 `syncSet`。
