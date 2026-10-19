---
title: magpie github
command:
  - github
---

把加密的 magpie 设置存放在一个 GitHub 仓库里,让每台电脑保持一致。

## 简介

裸形式 `magpie github` 显示同步是否开着、目标在哪、最近一次同步的结果:哪种同步在进行、仓库地址与已保存的 token/分支信息、正在同步哪些部分(providers 是否带 API key、settings、profiles、agent 模型、library、用量)、最近一次同步的时间或错误,以及被同步替换的副本保留在哪里。

同步把 magpie 的可携带设置(providers、设置、profiles、agent 模型与 library)封存后写进一个已有 GitHub 仓库的加密文件;GitHub 只收到封存文件。同一时间只有一类同步(WebDAV、S3 或 GitHub)处于开启状态。

子命令:

| 子命令 | 作用 |
|---|---|
| [`github on`](cli:command:github/on) | 在一个 GitHub 仓库上开启同步并立即同步一次 |
| [`github set`](cli:command:github/set) | 修改已开启同步的设置 |
| [`github now`](cli:command:github/now) | 立即同步一次 |
| [`github auto`](cli:command:github/auto) | 网关自动同步的间隔 |
| [`github restore`](cli:command:github/restore) | 以仓库内容为准恢复本机 |
| [`github undo`](cli:command:github/undo) | 撤销上一次 restore |
| [`github upload`](cli:command:github/upload) | 用本机设置覆盖仓库里不是备份的文件 |
| [`github dismiss`](cli:command:github/dismiss) | 清除上次同步提示的替换记录 |
| [`github off`](cli:command:github/off) | 关闭同步,加密文件与提交历史保留 |

## 使用提醒

- 仓库必须已存在并且是私有仓库;token 需要 Contents 的读写权限。
- 封存口令(passphrase)在每台电脑上相同:文件在本机用它封存,GitHub 只收到封存文件。丢失它文件无法打开。
- 三种同步后端共用一套子命令结构(on/set/now/auto/restore/undo/upload/dismiss/off)与同一套实现(源码 `syncCmd`),迁移等行为一致。
- 一次完整的本机快照用 [`backup`](cli:command:backup);把某次同步替换掉的副本恢复回来用 [`restore`](cli:command:restore)。

## 示例

```sh
magpie github
magpie github on github://me/my-magpie-backup
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 子命令分发与 `githubUsage` 常量见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go);三种后端共用 `syncCmd`。
- GitHub 远端按 Contents API 的 blob SHA 做条件替换,见 [sync-backup.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/sync-backup.md)。
