---
title: magpie library skill
command:
  - library
  - skill
---

library skill —— 管理写给各 agent 的技能(skills)。

## 简介

技能是一个带 `SKILL.md` 的文件夹,来源可以是 GitHub、本机文件夹(以链接方式,改文件夹即改技能)或技能市场;技能从应用的 Library 页面安装。每个 agent 得到库的链接或一份带标记的副本。子命令:

- [`library skill agents`](cli:command:library/skill/agents):设置接收某个技能的 agent。
- [`library skill rm`](cli:command:library/skill/rm):移除技能(单个或全部)。
- [`library skill update`](cli:command:library/skill/update):从 GitHub 重新拉取。
- [`library skill how`](cli:command:library/skill/how):链接或副本方式。
- [`library skill use-library`](cli:command:library/skill/use-library) / [`library skill keep-own`](cli:command:library/skill/keep-own):解决 agent 自有同名技能与库技能的冲突。

## 使用提醒

- 只运行 `magpie library skill`(不带子命令)会打印用法错误;查看库里已有的技能用 [`magpie library`](cli:command:library) 的 Skills 一节。
- 技能副本在写入后被编辑过,下一次 [`library sync`](cli:command:library/sync) 会先把改动收进库。
- 由 skills CLI(`npx skills`)管理的技能只被分组展示,更新走它自己(`npx skills update`)。

## 源码补充

- 命令分发与 `libraryUsage` 见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
- 技能来源、副本标记与更新机制见官方文档 [library.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/library.md)。
