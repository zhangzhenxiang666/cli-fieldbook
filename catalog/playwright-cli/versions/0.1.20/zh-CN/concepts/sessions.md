---
title: 会话与工作区
uses:
  - command:open
  - command:attach
  - command:list
---

playwright-cli 的全部页面操作都发生在**会话**（session）上：一个由后台守护进程维持的浏览器实例。本文说明会话的建立、命名、生命周期，以及工作区如何隔离会话。本文为源码补充，依据固定提交的 `cli-client/program.ts`、`cli-client/registry.ts` 与官方 skills 文档快照。

## 会话是什么

[open](cli:command:open) 启动会话时，客户端拉起一个后台守护进程，由它持有浏览器实例与页面状态；此后每条命令由客户端转发给该守护进程执行，命令之间浏览器不退出。这使 playwright-cli 可以像交互会话一样逐步驱动页面，而不是每条命令冷启动一次浏览器。

[attach](cli:command:attach) 建立的是同类会话，区别是浏览器不是新启动的，而是连接既有浏览器（CDP 端点、browser server 端点、浏览器扩展或绑定名）。结束连接用 [detach](cli:command:detach)（外部浏览器继续运行），自启动的会话用 [close](cli:command:close)。

## 会话命名与当前会话

每条命令通过 `-s=<name>`（或 `--session=<name>`）选择会话，缺省名为 `default`。未显式给出时也可用环境变量 `PLAYWRIGHT_CLI_SESSION` 指定。attach 的会话名缺省取目标名（如 `--cdp=msedge` 得到名为 `msedge` 的会话）。

```sh
playwright-cli -s=work open https://example.com --persistent
playwright-cli -s=work click e6
playwright-cli -s=work close
```

## 工作区隔离

会话按**工作区**（workspace，客户端所在目录）隔离：[list](cli:command:list) 缺省只列出当前工作区的会话，`--all` 跨工作区列出。同一台机器上不同项目的会话互不可见，避免误关。

## 生命周期与清理

- 空闲超时：[open](cli:command:open) 的 `--idle-timeout` 控制空闲多久自动关闭；无头缺省 1 小时，有头缺省永不，`0` 禁用。
- [close-all](cli:command:close-all)：关闭当前工作区全部会话。
- [kill-all](cli:command:kill-all)：会话状态损坏时的兜底，按进程特征强杀全部相关进程。
- [delete-data](cli:command:delete-data)：删除持久会话（`--persistent`/`--profile`）的用户数据目录，彻底重置。
- 机器重启后守护进程不在，需要重新 `open`；持久 profile 的数据仍在。

## 会话清单

[list](cli:command:list) 报告每个会话的名称、状态、浏览器类型、是否有头、是否持久、是否为 attached，以及与当前客户端的兼容性；配合 `--json` 供脚本消费。已无法连接的条目会在列出时被顺带清理。

以上示例为说明性内容，未实际运行。

## 源码补充

- 会话启动、停止与转发的客户端实现见 [program.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-client/program.ts)。
- 会话注册表（工作区键、会话文件、`PLAYWRIGHT_CLI_SESSION` 解析）见 [registry.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-client/registry.ts)。
