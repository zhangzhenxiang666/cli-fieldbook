---
title: magpie update check
command:
  - update
  - check
---

只检查是否有新版本并报告,不安装。

## 简介

打印结果:已是最新(或当前为源码构建及其对应最新发布版),或新版本号与下载地址。不下载、不改动任何文件。

## 使用提醒

- 也可带 [`update`](cli:command:update) 的 `--proxy`、`--mirror` 选项。

## 源码补充

- check 分支见 [update_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/update_cli.go)。
