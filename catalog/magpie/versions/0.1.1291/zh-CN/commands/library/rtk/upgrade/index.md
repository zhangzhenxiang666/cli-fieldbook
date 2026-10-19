---
title: magpie library rtk upgrade
command:
  - library
  - rtk
  - upgrade
---

library rtk upgrade —— 把 RTK 升级到最新发布版。

## 简介

按当初安装 RTK 的方式(Homebrew、winget 或 RTK 自己的脚本)把它带到最新发布版;已是最新时报告"up to date"。

## 使用提醒

- 升级后个别 agent 可能要求新版 RTK 才能写入其钩子(如 OpenCode 2 只加载 rtk 0.52 及以上写的插件);此时状态列表会提示更新 RTK。

## 示例

```sh
magpie library rtk upgrade
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 入口见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
- 版本比较与升级途径见官方文档 [library.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/library.md)。
