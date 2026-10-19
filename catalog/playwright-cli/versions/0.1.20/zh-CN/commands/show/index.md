---
title: playwright-cli show
command:
  - show
---

打开 Playwright Dashboard。

## 简介

`show` 启动 Playwright Dashboard（可视化查看会话的界面）。默认后台启动守护进程；`--port` 给定时以前台 HTTP 服务运行（`0` 为随机端口）。`--annotate` 切入标注模式：用户在实时页面上画框并写注释，随后返回带标注的截图、快照与笔记，用于 UI 评审与设计反馈。

## 选项

### `--port`

格式：`--port <VALUE>`。在该端口前台启动 HTTP 服务（`0` 为随机端口）。

### `--host`

格式：`--host <VALUE>`。使用 `--port` 时绑定的主机，缺省 localhost。

### `--annotate`

格式：`--annotate`。把 Dashboard 切入标注模式（需要已打开的会话）。

### `--kill`

格式：`--kill`。终止 Dashboard 守护进程。

## 使用提醒

- `--host` 缺省绑定 localhost。绑定非回环地址时，该 HTTP 服务对网络可达的客户端开放，可能查看或操控会话中的浏览器；除非另行做了访问保护，保持 localhost。

## 示例

```sh
playwright-cli show
playwright-cli show --port=0
playwright-cli show --annotate
playwright-cli show --kill
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
- Dashboard 守护进程的启动、前台/后台与终止逻辑见 [program.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-client/program.ts)。
