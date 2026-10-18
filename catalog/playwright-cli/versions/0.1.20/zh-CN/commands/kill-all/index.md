---
title: playwright-cli kill-all
command:
  - kill-all
---

强制终止全部浏览器进程。

## 简介

`kill-all` 对残留/僵尸的守护与浏览器进程按进程特征匹配后强杀（SIGKILL），用于会话状态损坏时的兜底清理。

## 使用提醒

本命令按进程命令行特征匹配并强制终止，可能波及用户自己启动的 Playwright 相关进程；仅在会话清理失效时使用。

## 示例

```sh
playwright-cli kill-all
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
- 进程匹配与终止的实现见 [program.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-client/program.ts)。
