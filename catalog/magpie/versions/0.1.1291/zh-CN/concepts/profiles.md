---
title: profiles 与备份
uses:
  - command:save
  - command:use
  - command:profiles
  - command:rm
  - command:backup
  - command:restore
---

# profiles 与备份

两套机制都为了"整套配置可以整体存取",但粒度与用途不同:profiles 是随时切换的轻量快照,backup 是跨机迁移的封存档案。

## profiles:当前agent 设置的快照

- [`magpie save <name>`](cli:command:save):把每个 agent 的当前设置存为一个 profile;
- [`magpie use <name>`](cli:command:use):整体应用;
- [`magpie profiles`](cli:command:profiles) 列出,[`magpie rm <name>`](cli:command:rm) 删除。

适合"工作日一套模型、周末另一套"这类频繁切换;不含密钥。

## backup:providers、密钥与 library 的封存档案

[`magpie backup`](cli:command:backup) 把 providers、密钥、设置、profiles、agent 模型与 library 打进一个文件,用口令(passphrase)封存:

- `--no-keys` 排除 API key,`--no-library` 排除 library;
- [`magpie restore`](cli:command:restore) 在本机恢复,`--no-agents` 跳过 agent 设置;
- 文件用口令封存,口令丢失无法恢复;订阅登录凭据不在备份里,恢复后需重新登录。

## 多机同步:backup 的自动化形态

WebDAV / S3 / GitHub 同步(见 [`magpie webdav`](cli:command:webdav)、[`magpie s3`](cli:command:s3)、[`magpie github`](cli:command:github))相当于"放在远处的封存备份 + 定时双向同步":每台机器用同一口令,网关按 `auto` 间隔自己同步。与一次性 backup 的取舍:

- 同步适合长期多机;backup 适合搬迁与 archival;
- 两者共用口令封存格式,首次同步时本机与远端的差异以远端为准,本机内容保留在同步文件夹旁。

## 来源

- 同步与备份的实现:docs/subsystems/sync-backup.md(固定提交)
- 命令行为:internal/cli/builtin_cli.go、backup_cmd.go、webdav_cli.go(固定提交)
