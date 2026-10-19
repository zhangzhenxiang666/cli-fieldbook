---
title: magpie library instructions
command:
  - library
  - instructions
---

library instructions —— 打印写给 agent 的共享指示。

## 简介

输出当前的共享指示文本;还没有设置时输出为空。共享指示是库写入各 agent 指示文件的内容,magpie 的部分写在两行标记之间,文件里的其余部分属于用户,不会被改动。

子命令:

- [`library instructions set`](cli:command:library/instructions/set):用文件或标准输入替换指示文本。
- [`library instructions agents`](cli:command:library/instructions/agents):设置接收指示的 agent。

## 使用提醒

- 输出末尾缺换行时会补一个,保证终端显示整齐。
- 各 agent 收到指示的前提是其指示文件对库开放(由 `Takes` 校验);不满足的 agent 会在 [`library sync`](cli:command:library/sync) 的结果里逐条报出。

## 源码补充

- 命令入口与输出见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
- 指示写入的位置与标记行机制见官方文档 [library.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/library.md)。
