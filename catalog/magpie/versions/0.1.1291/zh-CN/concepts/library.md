---
title: library
uses:
  - command:library
---

# library

library 是 magpie 写进**每个** agent 的共享内容:统一的项目指示(instructions)、MCP 服务器与 skills。装一次,全部 agent 都有;agent 自己没写的部分不会被覆盖。

## 三个部分

- **instructions**:一段共享的系统指示,`magpie library instructions` 查看/设置(`set <file|->` 支持从 stdin),`instructions agents` 控制哪些 agent 收到;
- **MCP 服务器**:[`magpie library mcp add <name> <url|command args…>`](cli:command:library/mcp/add) 注册,统一写进各 agent 的 MCP 配置;
- **skills**:从应用的 Library 页安装,`magpie library skill` 系列管理(更新、链接或副本方式、与 agent 自有同名技能的冲突处理,见 [`magpie library skill`](cli:command:library/skill))。

## 同步与生效

内容变化后用 [`magpie library sync`](cli:command:library/sync) 重新写进各 agent(agent 新装或配置被手改后也需要)。library 内容随多机同步与备份走(见 [profiles 与备份](profiles.md))。

## RTK

[`magpie library rtk`](cli:command:library/rtk) 是特例:它改写的是 agent 执行 shell 命令的方式——经 RTK(rtk-ai.app)转发以压缩输出、节省 token,按 agent 开关。

## 来源

- library 子系统:docs/subsystems/library.md(固定提交)
- 命令行为:internal/cli/library_cli.go(固定提交)
