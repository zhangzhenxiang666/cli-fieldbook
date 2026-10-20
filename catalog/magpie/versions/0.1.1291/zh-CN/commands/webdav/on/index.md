---
title: magpie webdav on
command:
  - webdav
  - on
---

在一个 WebDAV 地址上开启同步,并立即同步一次。

## 简介

让每台电脑上的 providers、设置、profiles、agent 模型与 library 通过一个 WebDAV 文件夹保持一致:服务器上会在所给文件夹里建一个名为 `magpie` 的文件夹。开启后立即同步一次,地址或密码有错当场暴露。

需要登录时会交互式询问密码(给了 `user=` 时)与封存口令(passphrase),输入不回显,不接受命令行传值。可以从 stdin 管道输入:密码一行,口令一行。

在已有自己设置的电脑上首次开启:有差异的部分以服务器为准,本机原来的内容保留在同步文件夹里 magpie 文件旁边,`magpie webdav` 会说明这一点。

## 参数

### `address`

WebDAV 服务器地址,形如 `https://dav.example.com/dav/`。必须是 WebDAV 地址:`s3://` 或 `github://` 开头的地址会分别提示改用 [`s3 on`](cli:command:s3/on) 或 [`github on`](cli:command:github/on)。

### `pairs`

可选的 `k=v` 设置,可给多个:

- `user=<用户名>`:服务器登录用户。
- `password=`(空值):触发交互式询问新密码;`user=` 单独使用表示服务器不要求登录。
- `passphrase=`(空值):触发交互式询问新口令。
- `keys=yes|no`:`no` 时 providers 不带 API key 同步,每台电脑保留自己的 key。
- `agents=yes|no`:`no` 时不同步 agent 模型。
- `library=yes|no`:`no` 时不同步 library。
- `usage=yes|no`:`yes` 时本机用量也上传,一天一个封存文件,Usage 页会汇总各台电脑的用量。

## 使用提醒

- 新开启时默认同步 providers(带 API key)、settings、profiles 与 agent 模型(源码中新配置默认 `Keys: true, Agents: true`)。
- 若另一类同步(S3 或 GitHub)开着,`webdav on` 会把同步迁到 WebDAV 文件夹:口令与同步内容开关保留,原服务器信息也保留,之后 `magpie s3 on` 单独使用即可迁回。
- 密码只发送给所给的服务器和用户;更换任一会重新询问。
- 其他字段名会报错并列出合法字段:address、user、password、passphrase、keys、agents、library、usage。

## 示例

```sh
magpie webdav on https://dav.jianguoyun.com/dav/ user=me@example.com
magpie webdav on https://dav.example.com/dav/ keys=no usage=yes
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 参数解析、字段校验与迁移逻辑见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go) 的 `syncSet`。
- 用法原文见同文件 `webdavUsage` 常量。
