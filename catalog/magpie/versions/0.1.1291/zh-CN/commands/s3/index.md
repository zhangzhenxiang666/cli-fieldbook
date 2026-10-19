---
title: magpie s3
command:
  - s3
---

通过一个 S3 兼容桶(AWS S3、Cloudflare R2、Backblaze B2、MinIO、NAS……),让每台电脑上的 magpie 设置保持一致。

## 简介

裸形式 `magpie s3` 显示同步是否开着、目标在哪、最近一次同步的结果:哪种同步在进行、桶地址、endpoint/region/path-style/access key 等已保存信息、正在同步哪些部分(providers 是否带 API key、settings、profiles、agent 模型、library、用量)、最近一次同步的时间或错误,以及被同步替换的副本保留在哪里。

同步把 magpie 的可携带设置(providers、设置、profiles、agent 模型与 library)合并到一个封存文件里,放在桶的 `<prefix>/magpie/` 下,在多台电脑之间保持一致;它不克隆工作树,也不同步任意文件。同一时间只有一类同步(WebDAV、S3 或 GitHub)处于开启状态。

子命令:

| 子命令 | 作用 |
|---|---|
| [`s3 on`](cli:command:s3/on) | 在一个 S3 桶上开启同步并立即同步一次 |
| [`s3 set`](cli:command:s3/set) | 修改已开启同步的设置 |
| [`s3 now`](cli:command:s3/now) | 立即同步一次 |
| [`s3 auto`](cli:command:s3/auto) | 网关自动同步的间隔 |
| [`s3 restore`](cli:command:s3/restore) | 以桶内容为准恢复本机 |
| [`s3 undo`](cli:command:s3/undo) | 撤销上一次 restore |
| [`s3 upload`](cli:command:s3/upload) | 用本机设置覆盖桶上不是备份的文件 |
| [`s3 dismiss`](cli:command:s3/dismiss) | 清除上次同步提示的替换记录 |
| [`s3 off`](cli:command:s3/off) | 关闭同步,桶里的文件保留 |

## 使用提醒

- 三种同步后端共用一套子命令结构(on/set/now/auto/restore/undo/upload/dismiss/off),行为一致,只是目标不同。
- 封存口令(passphrase)在每台电脑上相同:文件在本机用它封存,服务器永远只见封存后的文件。丢失它文件无法打开。访问密钥的 secret 只配合所给的 endpoint 与 access key 使用,不出现在命令行。
- 需要输入 secret 或口令时,可以从 stdin 管道输入:secret 一行,口令一行。
- 一类同步开着时,`magpie s3 on` 会把同步迁到桶(原来的 WebDAV 地址、用户与密码保留,`magpie webdav on` 单独使用即可迁回)。
- 窗口大小、代理、网关端口、局域网共享等只关乎一台电脑的设置不随同步走,每台机器保留自己的。
- 一次完整的本机快照用 [`backup`](cli:command:backup);把某次同步替换掉的副本恢复回来用 [`restore`](cli:command:restore)。

## 示例

```sh
magpie s3
magpie s3 on s3://my-bucket/magpie endpoint=https://<account>.r2.cloudflarestorage.com access-key-id=…
magpie s3 on s3://backups endpoint=http://nas.local:9000 path-style=yes access-key-id=…
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 子命令分发与 `s3Usage` 常量见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go);三种后端共用 `syncCmd`。
- 同步与备份的内部结构(合并语义、单机保留项)见 [sync-backup.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/sync-backup.md)。
