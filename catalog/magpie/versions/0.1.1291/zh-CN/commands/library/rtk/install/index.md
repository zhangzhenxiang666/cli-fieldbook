---
title: magpie library rtk install
command:
  - library
  - rtk
  - install
---

library rtk install —— 安装 RTK。

## 简介

安装 RTK(macos 上 Homebrew,Windows 上 winget,或 RTK 自己的脚本)。完成后打印与 [`magpie library rtk`](cli:command:library/rtk) 相同的状态视图。

## 使用提醒

- 装好后若 RTK 不在 PATH 上,agent 的钩子按名称调用不到它;用 [`library rtk path`](cli:command:library/rtk/path) 处理。
- 已安装时重复运行按其安装方式重装/更新。

## 示例

```sh
magpie library rtk install
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 入口与安装提示见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
- `InstallRTK` 的安装途径见官方文档 [library.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/library.md)。
