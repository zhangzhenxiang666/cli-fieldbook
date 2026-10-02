---
title: jj
command: []
---

## 简介

Jujutsu：与 Git 兼容的版本控制工具。

## 选项

### `--help`

显示帮助；-h 为短帮助，--help 为长帮助。

### `--version`

显示版本。

### `--repository`

指定要操作的仓库路径；未指定时，从当前目录向上查找最近的 .jj。

### `--ignore-working-copy`

既不为当前工作目录制作快照，也不更新工作目录。读到的 @ 可能落后于磁盘；这不是禁止修改仓库历史的只读开关。

### `--no-integrate-operation`

正常生成操作，但不将其整合为当前操作头，也不更新工作目录；输出新 operation ID，可用 --at-op 检查，再用 jj op integrate 整合。这不是通用 dry-run：命令可能拒绝该选项或产生仓库外副作用。v0.45.1 的 git push 明确拒绝此选项，须使用 push --dry-run。

### `--ignore-immutable`

绕过不可变提交的重写保护；根提交仍不能重写。不会改变 immutable_heads() 或模板中的 immutable 判断。

### `--at-operation`

以指定操作的仓库状态运行；别名 --at-op。接受无歧义 operation ID 前缀及操作表达式。隐含 --ignore-working-copy；并不限制命令为只读。

### `--debug`

开启调试日志；与隐藏的 jj debug 子命令组不同。

### `--color`

控制着色：always 始终、never 从不、auto 自动、debug 输出样式标签用于调试。

### `--quiet`

隐藏辅助说明，保留命令主要结果、警告和错误；没有通用 -q 短形式。

### `--no-pager`

禁用分页器，直接输出。

### `--config`

为本次调用追加配置，可重复。NAME 使用 TOML 点分键，VALUE 使用 TOML 值；注意 shell 与 TOML 两层引号。

### `--config-file`

为本次调用加载额外配置文件，可重复；不会把它等同于 config set/edit 的写入目标 --file。

## 使用提醒

全局参数见 [Global Options](../concepts/global-options.md)。

**注意：** 未指定子命令时，由 ui.default-command 决定实际执行的命令，内置默认是 log。用户 aliases 可以增加入口，因而不存在跨所有用户配置的有限“全部别名”清单。

源码：[cli/src/commands/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/mod.rs)。
