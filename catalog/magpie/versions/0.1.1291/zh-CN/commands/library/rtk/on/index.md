---
title: magpie library rtk on
command:
  - library
  - rtk
  - on
---

library rtk on —— 为某个 agent 打开 RTK。

## 简介

给指定 agent 安装 RTK 钩子:运行 RTK 自己的安装器(`rtk init -g …`)完成写入。agent 会被校验是否适配 RTK 钩子,不适配的报错。

## 参数

### `agent`

`<agent>`。要打开 RTK 的 agent。

## 使用提醒

- rtk 未安装时打开仍会写入钩子,但钩子调用不到 rtk;状态列表会警告"install it, or switch this off"。先运行 [`library rtk install`](cli:command:library/rtk/install)。
- 个别 agent 的钩子机制无法改写命令(其钩子只能允许或拒绝命令),永远无法打开。
- 改动可能需要重启该 agent 才生效,输出会列出。

## 示例

```sh
magpie library rtk on claude
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 入口与校验见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
- 安装器调用与各 agent 适配约束见官方文档 [library.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/library.md)。
