---
title: magpie webdav set
command:
  - webdav
  - set
---

修改已开启的 WebDAV 同步的设置;未给出的项保持原样。

## 简介

在同步已开启的前提下改配置。支持的字段与 [`webdav on`](cli:command:webdav/on) 相同:address、user、keys、agents、library、usage(均为 `yes|no`),`password=` 与 `passphrase=` 触发重新询问。

WebDAV 同步未开启时执行 `set` 会报错并提示先用 `magpie webdav on` 开启;当前开着的是另一类同步(S3 或 GitHub)时也会报错并指向对应命令。

## 参数

### `pairs`

一个或多个 `k=v`:

- `address=<地址>`:换服务器。
- `user=<用户名>`:换登录用户。
- `password=`、`passphrase=`:交互式询问新密码/口令。
- `keys=yes|no`、`agents=yes|no`、`library=yes|no`、`usage=yes|no`:同步内容开关。

## 使用提醒

- 密码只发给所给的地址和用户;`address` 或 `user` 变了会重新询问。
- 字段值 `yes|no` 之外的会报错。

## 示例

```sh
magpie webdav set agents=no library=no
magpie webdav set address=https://dav.example.com/dav/
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 分发与字段解析见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go) 的 `syncCmd` 与 `syncSet`。
