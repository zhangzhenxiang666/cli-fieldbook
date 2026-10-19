---
title: magpie s3 set
command:
  - s3
  - set
---

修改已开启的 S3 同步的设置;未给出的项保持原样。

## 简介

在同步已开启的前提下改配置。支持的字段与 [`s3 on`](cli:command:s3/on) 相同:address、bucket、prefix、endpoint、region、access-key-id、path-style、keys、agents、library、usage,`secret=` 与 `passphrase=` 触发重新询问。

S3 同步未开启时执行 `set` 会报错并提示先用 `magpie s3 on` 开启;当前开着的是另一类同步(WebDAV 或 GitHub)时也会报错并指向对应命令。

## 参数

### `pairs`

一个或多个 `k=v`:

- `address=<s3://桶[/<前缀>]>`、`bucket=<桶>`、`prefix=<前缀>`:换目标。
- `endpoint=<服务器>`、`region=<区域>`、`access-key-id=<访问键 ID>`:换连接与登录。
- `path-style=yes|no`、`keys=yes|no`、`agents=yes|no`、`library=yes|no`、`usage=yes|no`:开关。
- `secret=`、`passphrase=`:交互式询问新 secret/口令。

## 使用提醒

- secret 只配合所给的 endpoint 与 access key 使用;`endpoint` 或 `access-key-id` 变了会重新询问。
- 字段值 `yes|no` 之外的会报错。

## 示例

```sh
magpie s3 set region=ap-northeast-1
magpie s3 set keys=no usage=yes
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 分发与字段解析见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go) 的 `syncCmd` 与 `syncSet`。
