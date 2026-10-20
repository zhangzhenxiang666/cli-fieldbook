---
title: magpie plugin update
command:
  - plugin
  - update
---

把每个已装插件更新到最新版本(别名 `upgrade`)。

## 简介

逐个安装各插件的最新版本;完成后若有内建订阅应移交到新版社区插件,自动完成移交,并列出插件清单。

## 使用提醒

- 本地路径安装的插件(`./my.middleware.js`)不在更新范围——它们随文件本身变化。

## 源码补充

- 实现见 [plugins_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/plugins_cli.go)。
