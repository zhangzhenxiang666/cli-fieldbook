---
title: playwright-cli
command: []
---

Playwright 官方终端 CLI：围绕持久浏览器会话执行打开页面、交互、截图、网络观察、录制与状态管理等操作。

## 简介

`playwright-cli` 以"会话"为组织单位：先用 [open](cli:command:open) 启动（或 [attach](cli:command:attach) 连接）一个由后台守护进程维持的浏览器会话，之后的交互、存储、网络与录制命令都作用于该会话的当前页面，每次命令执行后自动附带页面状态快照。会话在命令之间保持存活，可以多会话并存并用 `--session` 区分。

命令分两类处理：会话管理类命令（`open`、`attach`、`close`、`detach`、`list`、`close-all`、`delete-data`、`kill-all`、`install`、`install-browser`、`show`）由客户端在本地直接处理；其余命令转发给会话守护进程，映射为对应的 Playwright 浏览器工具执行。

安装方式为全局安装 npm 包 `@playwright/cli`（`npm install -g @playwright/cli`）；本地项目装有 Playwright 时也可经 `npx playwright cli` 使用同套命令。

## 选项

### `--help`

短旗标 `-h`。格式：`--help [command]`。打印帮助：不带命令名时打印总帮助（按分组列出全部公开命令与全局选项），带命令名时打印该命令的用法、参数与选项。

### `--json`

格式：`--json`。以 JSON 结构化输出响应，供脚本消费。

### `--raw`

格式：`--raw`。只输出结果值本身，剥离页面状态、生成代码与快照等附加段落，便于管道传递给其他工具。不产生输出的命令在 raw 模式下返回空。

### `--session`

短旗标 `-s`。格式：`-s=<name>`。指定命令作用的会话名，缺省为 `default`。未通过 `-s` 显式给出时，也可用环境变量 `PLAYWRIGHT_CLI_SESSION` 指定。

### `--version`

短旗标 `-v`。格式：`-v, --version`。打印版本（`@playwright/cli` 包版本）后退出。

## 使用提醒

- 不带任何命令调用时打印总帮助；`--help <command>` 打印单命令帮助。
- 未知命令、未知选项与超量位置参数都会被客户端拒绝并列出可用项。
- 会话由守护进程维持：机器重启或 `kill-all` 后需要重新 `open`。
- 全局选项在每个命令前给出，例如 `playwright-cli -s=work goto <url>`；也可写 `--session=work`。

## 示例

```sh
# 查看版本与总帮助
playwright-cli --version
playwright-cli --help

# 在默认会话中打开页面并交互
playwright-cli open https://playwright.dev
playwright-cli snapshot
playwright-cli close

# 使用命名会话
playwright-cli -s=work open https://example.com --persistent
playwright-cli -s=work click e3
playwright-cli -s=work close

# 结构化输出
playwright-cli list --json
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 全局选项解析、本地命令分派与 `-s`/`-g` 别名归一见 [program.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-client/program.ts)。
- 帮助文本（Usage 行、分组与全局选项）的生成逻辑见 [helpGenerator.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/helpGenerator.ts)。
- 命令表与各命令声明见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
