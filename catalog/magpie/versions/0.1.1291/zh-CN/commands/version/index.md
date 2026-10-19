---
title: magpie version
command:
  - version
---

打印 magpie 版本号;与 `magpie --version`、`magpie -v` 相同。本入口存在于源码分发但未列入官方 usage 主体。

## 简介

`magpie version` 输出 `magpie <版本号>` 一行。排查问题、确认升级结果时使用;检查并安装新版本是 [`magpie update`](cli:command:update) 的职责。

## 源码补充

- 见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)(`case "-v", "--version", "version": fmt.Println("magpie", version)`)。
