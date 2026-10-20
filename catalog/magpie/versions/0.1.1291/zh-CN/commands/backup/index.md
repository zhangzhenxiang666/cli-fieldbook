---
title: magpie backup
command:
  - backup
---

把 provider、key、设置、profile、agent 模型与 library 打包进一个文件,用口令封存。

## 简介

收集全部 provider(按选项决定是否含 API key)、设置、profile、各 agent 的模型设置,以及 library(MCP 服务器与技能),写入一个用口令(passphrase)封存的备份文件。保存后打印各部分的数量统计。

口令在终端中不回显、需输入两次确认;通过管道提供时读取 stdin 的下一行。备份文件权限为 `0600`。

订阅登录不在备份里:需要在另一台机器上重新登录(见 [`accounts add`](cli:command:accounts/add))。

## 参数

### `file`

备份文件路径;省略时使用默认文件名。

## 选项

### `--no-keys`

备份不含各 provider 的 API key:恢复后需要逐个补 key(见 [`provider key`](cli:command:provider/key))。

### `--no-library`

备份不含 library(共享指令、MCP 服务器与技能)。

## 使用提醒

- 口令务必保存:没有口令备份文件无法打开。
- 恢复用 [`restore`](cli:command:restore);多台机器之间保持同步更方便的方式是 WebDAV/S3/GitHub 同步(见 [`webdav`](cli:command:webdav)、[`s3`](cli:command:s3)、[`github`](cli:command:github))。

## 示例

```sh
magpie backup --no-keys magpie-backup.mpb
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 收集、封存、口令交互与权限设置见 [backup_cmd.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/backup_cmd.go) 的 `backupCmd()`。
