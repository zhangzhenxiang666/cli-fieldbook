---
title: magpie plugin move
command:
  - plugin
  - move
---

把一个内建订阅的账户迁到它的社区插件上运行(别名 `migrate`)。

## 简介

magpie 的内建订阅逐步退役,改由社区插件承载。`move` 把指定订阅的账户与请求处理迁到对应社区插件:本机没有 Bun(插件运行时)时先自动下载;迁移成功后显示该订阅现在运行在哪个包上。

没有对应插件的订阅会报"has no plugin to move to"。

## 参数

### `subscription`

`<subscription>`。要迁移的订阅名。

## 示例

```sh
magpie plugin move factory
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- 迁移是单向的:内建实现已退役,不存在"迁回内建"(见 [`magpie plugin move-back`](cli:command:plugin/move-back));
- 迁移后账户登录、额度与故障转移行为不变,只是承载者换成插件。

## 源码补充

- 可迁移性检查与迁移流程见 [plugins_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/plugins_cli.go)。
