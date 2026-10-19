---
title: magpie plugin
command:
  - plugin
---

管理插件:OpenCode 的 provider 插件、pi 的包与网关中间件(别名 `plugins`)。

## 简介

插件分几类:provider 插件负责某家订阅的登录与请求(社区维护,如 opencode-gemini-auth、pi-antigravity)、pi 包、以及网关 hook/中间件(如 ./my-plugin.js、./alias.middleware.js、./recall.hooks.ts)。magpie 的内建功能(Sessions、Library、路由组等)也以插件形式存在,可开关(见 [`plugin builtin`](cli:command:plugin/builtin))。

不带子命令(或 `list`)列出已装插件:各自的加载状态、provider、中间件与工具;无插件时给出添加提示。

## 选项

### `--json`

以 JSON 输出(`plugins`、`loaded`、`providers`、`middleware` 四组),适合脚本处理。

## 使用提醒

- 子命令一览:安装 [`add`](cli:command:plugin/add)、移除 [`rm`](cli:command:plugin/rm)、更新 [`update`](cli:command:plugin/update)、开关 [`on`](cli:command:plugin/on)/[`off`](cli:command:plugin/off)、参数 [`options`](cli:command:plugin/options)、指派 [`use`](cli:command:plugin/use)、登录 [`login`](cli:command:plugin/login)/[`logout`](cli:command:plugin/logout)、订阅迁移 [`move`](cli:command:plugin/move)、内建管理 [`builtin`](cli:command:plugin/builtin)、预设 [`preset`](cli:command:plugin/preset)、配置汇总 [`dump`](cli:command:plugin/dump)。

## 源码补充

- 分发与 pluginUsage 见 [plugins_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/plugins_cli.go)。
