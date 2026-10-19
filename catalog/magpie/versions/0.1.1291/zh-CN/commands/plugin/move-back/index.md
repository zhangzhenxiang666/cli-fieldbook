---
title: magpie plugin move-back
command:
  - plugin
  - move-back
---

迁回内建订阅的命令,已退役:内建订阅本身已由社区插件取代(别名 `moveback`、`unmigrate`;隐藏入口,未列入官方 usage 主体)。

## 简介

固定提交源码中该子命令只剩一条错误信息:"magpie's built-in subscriptions are retired: their community plugins run them"。执行总是报错,不做任何迁移。保留它只为让老用法得到明确答复;订阅一律运行在社区插件上(见 [`magpie plugin move`](cli:command:plugin/move))。

## 参数

### `subscription`

`<subscription>`。任意订阅名;不影响结果(总是报错)。

## 源码补充

- 退役错误信息见 [plugins_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/plugins_cli.go)。
