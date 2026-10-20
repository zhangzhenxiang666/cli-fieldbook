---
title: magpie restore
command:
  - restore
---

把一个备份文件恢复到本机。

## 简介

打开 [`backup`](cli:command:backup) 生成的口令封存文件,恢复其中的 provider、设置、profile、agent 设置与 library,并打印各项统计(新增/替换的 provider 数、profile 数、变更的 agent 设置数等)。

口令在终端中不回显;通过管道提供时读取 stdin 的下一行。

恢复后可能附带提示:

- `Needs a key`:备份不含这些 provider 的 key(--no-keys 生成的备份),需用 [`provider key`](cli:command:provider/key) 补上;
- 备份中的设置引用了本机未登录的订阅:备份携带设置而不携带登录,需用 [`accounts add`](cli:command:accounts/add) 登录后才能使用;
- 插件添加结果、library 分发问题,以及因 agent 不在本机或模型暂不可达而跳过的设置。

## 参数

### `file`

备份文件路径,必填。

## 选项

### `--no-agents`

不恢复各 agent 的设置,只恢复 provider、设置、profile(及 library)。

### `--no-library`

不恢复 library。

## 使用提醒

- agent 不在本机、或其模型尚不可达时,对应设置被跳过并保持原状,输出中会列出。

## 源码补充

- 打开、按部分恢复与各类提示见 [backup_cmd.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/backup_cmd.go) 的 `restoreCmd()`。
