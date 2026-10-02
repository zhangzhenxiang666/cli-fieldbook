---
title: skills
command: []
---

## 简介

开放 Agent Skills 生态的命令行工具，通常以 `npx skills` 运行，用于为各类编程 Agent 安装、使用、列出和管理技能（skills）。

不带参数运行时，在交互式终端显示横幅与常用命令提示；检测到正处于 AI Agent 环境时静默退出，不打印任何内容。

## 选项

### `--help`

显示主帮助。`-h` 为短形式。任何子命令后跟 `--help` 或 `-h` 时会在分发前短路：`remove`（含别名）显示移除命令的专属帮助，其余子命令显示主帮助。

### `--version`

显示版本号，`-v` 为短形式。版本号读取自随包发布的 `package.json`。

## 使用提醒

#### 命令别名

以下别名在源码分发逻辑中注册，其中部分未在 `--help` 输出中列出：`add` 另有 `a`、`i`、`install`；`remove` 另有 `rm`、`r`；`list` 另有 `ls`；`find` 另有 `search`、`f`、`s`；`update` 另有 `upgrade`、`check`。`check` 只是 `update` 的别名，不是独立的"仅检查"命令。

#### Agent 环境行为

在检测到的 AI Agent 环境中（通过 `@vercel/detect-agent` 判定），CLI 跳过交互提示并采用默认选择；涉及安装的命令会自动启用确认跳过并自动选择检测到的 Agent。Cursor 的 `CURSOR_TRACE_ID` 不视为 Agent 信号，需要 `CURSOR_AGENT` 或 `CURSOR_EXTENSION_HOST_ROLE=agent-exec` 等更强信号。

#### 退出码

未知命令打印提示并以退出码 1 结束；帮助与版本查询正常退出。

源码：[S01](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/cli.ts#L303-L419) [S02](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/detect-agent.ts#L73-L76)
