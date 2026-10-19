---
title: magpie library
command:
  - library
---

library —— 查看库(library)写给每个 agent 的内容:共享指示、MCP 服务器与技能。别名 `lib`。

## 简介

库是 magpie 集中保存、再写进每个 agent 自己文件里的共享内容:各 agent 在会话前读到的指示(instructions)、可调用的 MCP 服务器、可加载的技能(skills),以及钩子、子代理与 RTK。magpie 以各 agent 自己的格式写入,并且只收回自己写入的部分,文件里的其他内容保持原状。

不带子命令运行时,打印库的当前状态,分三节:

- **Instructions**:共享指示的行数与接收它的 agent;还没有时提示 `magpie library instructions set <file>`;若 magpie 写入某 agent 文件的部分被手工改动,会以 `!` 标出。
- **MCP servers**:每个服务器的名称、URL 或命令,以及接收它的 agent;还会列出"在你的 agent 里、但不在库里"的服务器,和 agent 自行添加、保持原样的服务器。
- **Skills**:每个技能的名称与接收它的 agent;技能文件夹丢失时以 `!` 标出。

结尾给出库的保存目录。管理入口:

- 重新写入:[`library sync`](cli:command:library/sync)
- 共享指示:[`library instructions`](cli:command:library/instructions)
- MCP 服务器:[`library mcp`](cli:command:library/mcp)
- 技能:[`library skill`](cli:command:library/skill)
- RTK:[`library rtk`](cli:command:library/rtk)

## 使用提醒

- 每次改动都是一次"变更":锁住库、写入每个目标 agent、再保存;改动前的 agent 文件会备份,保留最近 30 次变更。
- 给某 agent 写入失败不会中断其他 agent,失败项逐条列在结果里。
- 一个 agent 若没有放置某类内容的位置,会被拒绝(`Takes` 校验),不会被视为已接收;拒绝信息会列出这里能接收它的 agent。

## 源码补充

- 命令分发、`libraryUsage` 与状态输出见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
- 库的架构、目标判定与变更流程见官方文档 [library.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/library.md)。
