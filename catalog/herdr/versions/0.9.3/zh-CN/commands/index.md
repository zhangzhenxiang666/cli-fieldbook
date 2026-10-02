---
title: herdr
command: []
---

## 简介

面向 AI 编程 Agent 的终端工作区管理器。

## 选项

### `--session`

使用或创建命名持久会话；可用于本地启动和会话范围的命令。

### `--machine`

将受支持的 API 命令路由到已保存且启用的 SSH machine。不能与其他启动选项混用。

### `--remote`

通过 SSH 连接远程 Herdr TUI；不是任意 CLI 子命令的远程执行开关。

### `--remote-keybindings`

远程 TUI 使用 local 或 server 快捷键；默认 local。

### `--handoff`

为更新或远程连接显式启用实验性 live handoff。

### `--default-config`

输出此二进制内置的默认 TOML 配置并退出。

### `--skill`

输出内置的 Agent 操作说明文件并退出。

### `--version`

打印版本并退出。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

不带子命令时进入交互式 TUI。后台 server 管理终端，detach 不等于停止 server。

这是按统一 spec 补齐的完整命令索引。实际根帮助由 main.rs 手写，未列全 terminal、plugin 等命令；不是根帮助的逐字终端转储。

优先使用 herdr pane read --help 这种“完整命令路径紧接 --help”的形式。没有通用的 herdr help `<COMMAND>`。

全局选项放在子命令之前；不要假定每个手写解析器都支持 --option=value。示例统一使用 --option VALUE。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S02](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/main.rs) [S03](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli.rs)
