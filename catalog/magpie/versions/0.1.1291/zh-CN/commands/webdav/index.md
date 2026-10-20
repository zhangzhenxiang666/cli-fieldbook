---
title: magpie webdav
command:
  - webdav
---

通过一个 WebDAV 文件夹,让每台电脑上的 magpie 设置保持一致(别名 `magpie dav`)。

## 简介

裸形式 `magpie webdav` 显示同步是否开着、目标在哪、最近一次同步的结果:哪种同步在进行、服务器地址与已保存的登录信息、正在同步哪些部分(providers 是否带 API key、settings、profiles、agent 模型、library、用量)、最近一次同步的时间或错误,以及被同步替换的副本保留在哪里。

同步把 magpie 的可携带设置(providers、设置、profiles、agent 模型与 library)合并到一台服务器上,在多台电脑之间保持一致;它不克隆工作树,也不同步任意文件。同一时间只有一类同步(WebDAV、S3 或 GitHub)处于开启状态。

子命令:

| 子命令 | 作用 |
|---|---|
| [`webdav on`](cli:command:webdav/on) | 在一个 WebDAV 地址上开启同步并立即同步一次 |
| [`webdav set`](cli:command:webdav/set) | 修改已开启同步的设置 |
| [`webdav now`](cli:command:webdav/now) | 立即同步一次 |
| [`webdav auto`](cli:command:webdav/auto) | 网关自动同步的间隔 |
| [`webdav restore`](cli:command:webdav/restore) | 以服务器内容为准恢复本机 |
| [`webdav undo`](cli:command:webdav/undo) | 撤销上一次 restore |
| [`webdav upload`](cli:command:webdav/upload) | 用本机设置覆盖服务器上不是备份的文件 |
| [`webdav dismiss`](cli:command:webdav/dismiss) | 清除上次同步提示的替换记录 |
| [`webdav off`](cli:command:webdav/off) | 关闭同步,服务器上的文件保留 |

## 使用提醒

- 三种同步后端共用一套子命令结构(on/set/now/auto/restore/undo/upload/dismiss/off),行为一致,只是目标不同;细节见各子命令页。
- 封存口令(passphrase)在每台电脑上相同:文件在本机用它封存,服务器永远只见封存后的文件。丢失它文件无法打开。密码(password)只发给所给的服务器和用户,不出现在命令行。
- 需要输入密码或口令时,可以从 stdin 管道输入:密码一行,口令一行。
- 一类同步开着时,`magpie webdav on` 会把同步迁到 WebDAV 文件夹(原来的服务器信息保留,`magpie s3 on` 单独使用即可迁回)。
- 窗口大小、代理、网关端口、局域网共享等只关乎一台电脑的设置不随同步走,每台机器保留自己的。
- 一次完整的本机快照用 [`backup`](cli:command:backup);把某次同步替换掉的副本恢复回来用 [`restore`](cli:command:restore)。

## 示例

```sh
magpie webdav
magpie webdav on https://dav.jianguoyun.com/dav/ user=me@example.com
magpie webdav set agents=no library=no
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 子命令分发与 `webdavUsage` 常量见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go);三种后端共用 `syncCmd`。
- 同步与备份的内部结构(合并语义、单机保留项)见 [sync-backup.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/sync-backup.md)。
