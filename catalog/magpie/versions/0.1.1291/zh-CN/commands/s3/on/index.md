---
title: magpie s3 on
command:
  - s3
  - on
---

在一个 S3 兼容桶上开启同步,并立即同步一次。

## 简介

让每台电脑上的 providers、设置、profiles、agent 模型与 library 通过一个 S3 兼容桶(AWS S3、Cloudflare R2、Backblaze B2、MinIO、NAS……)保持一致:封存文件放在桶的 `<prefix>/magpie/` 下。开启后立即同步一次,地址或密钥有错当场暴露。

会交互式询问 access key 的 secret 与封存口令(passphrase),输入不回显,不接受命令行传值。可以从 stdin 管道输入:secret 一行,口令一行。

在已有自己设置的电脑上首次开启:有差异的部分以服务器为准,本机原来的内容保留在同步文件夹里 magpie 文件旁边,`magpie s3` 会说明这一点。

## 参数

### `address`

桶地址,形如 `s3://<bucket>` 或 `s3://<bucket>/<prefix>`。必须是 S3 地址;`https://` 或 `github://` 开头的地址会分别提示改用 [`webdav on`](cli:command:webdav/on) 或 [`github on`](cli:command:github/on)。

### `pairs`

可选的 `k=v` 设置,可给多个:

- `access-key-id=<访问键 ID>`:必填(源码在地址解析后强制要求,缺失报错)。
- `endpoint=<服务器>`:`https://…`;不给则 AWS。R2 用 `https://<account>.r2.cloudflarestorage.com`。
- `region=<区域>`:不给则 us-east-1,R2 上用 `auto`;AWS 在区域不同时会说明。
- `path-style=yes|no`:`yes` 桶在路径里(`https://host/bucket/…`),MinIO 与多数自建服务器要;`no` 桶在主机名(`https://bucket.host/…`)。IP 地址总是 yes。
- `bucket=<桶>`、`prefix=<前缀>`:单独改地址的桶或前缀部分。
- `secret=`(空值):触发交互式询问新 secret。
- `passphrase=`(空值):触发交互式询问新口令。
- `keys=yes|no`:`no` 时 providers 不带 API key 同步,每台电脑保留自己的 key。
- `agents=yes|no`:`no` 时不同步 agent 模型。
- `library=yes|no`:`no` 时不同步 library。
- `usage=yes|no`:`yes` 时本机用量也上传,一天一个封存文件,Usage 页会汇总各台电脑的用量。

## 使用提醒

- 新开启时默认同步 providers(带 API key)、settings、profiles 与 agent 模型(源码中新配置默认 `Keys: true, Agents: true`)。
- 若另一类同步(WebDAV 或 GitHub)开着,`s3 on` 会把同步迁到桶:口令与同步内容开关保留,原服务器信息也保留,之后 `magpie webdav on` 单独使用即可迁回。
- secret 只配合所给的 endpoint 与 access key 使用;更换任一会重新询问。
- 其他字段名会报错并列出合法字段:address、bucket、prefix、endpoint、region、access-key-id、secret、passphrase、path-style、keys、agents、library、usage。

## 示例

```sh
magpie s3 on s3://my-bucket/magpie endpoint=https://<account>.r2.cloudflarestorage.com access-key-id=…
magpie s3 on s3://backups endpoint=http://nas.local:9000 path-style=yes access-key-id=…
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 参数解析、字段校验与迁移逻辑见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go) 的 `syncSet`(含 s3 必填 access key 的检查)。
- 用法原文见同文件 `s3Usage` 常量。
