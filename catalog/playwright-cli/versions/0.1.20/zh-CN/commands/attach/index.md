---
title: playwright-cli attach
command:
  - attach
---

连接一个已在运行的浏览器，建立可操作的会话。

## 简介

`attach` 不启动新浏览器，而是连接既有浏览器：四种目标来源互斥，最多给出一个——位置参数的绑定浏览器名、`--cdp`、`--endpoint` 或 `--extension`。连接成功后隐式执行一次 [snapshot](cli:command:snapshot) 返回页面快照。

会话名在未显式指定时按目标名解析（绑定名 / CDP 通道名 / 扩展通道名），否则用默认会话名。`--extension` 连接 Playwright 浏览器扩展，可带通道值（如 `--extension=chrome`）；`--cdp` 既接受 `http://localhost:9222` 这类端点 URL，也接受已知通道名（`chrome`、`msedge`）。

## 参数

### `name`

可选，写作 `[name]`。要连接的绑定浏览器名。

## 选项

### `--cdp`

格式：`--cdp <VALUE>`。经 CDP 端点 URL 连接既有浏览器；值为已知通道名（`chrome`、`msedge`）时按该通道连接本机正在运行的浏览器。

### `--endpoint`

格式：`--endpoint <VALUE>`。要连接的 Playwright browser server 端点。

### `--extension`

格式：`--extension <VALUE>`。连接浏览器扩展；可带浏览器名（如 `--extension=chrome`）。

### `--config`

格式：`--config <VALUE>`。配置文件路径，缺省为 `.playwright/cli.config.json`。

### `--session`

格式：`--session <VALUE>`。会话名，缺省为绑定浏览器名或 `default`。

### `--idle-timeout`

格式：`--idle-timeout <VALUE>`。空闲指定毫秒数后脱离；被连接的浏览器默认永不脱离。

## 使用提醒

- 四种目标（位置参数名、`--cdp`、`--endpoint`、`--extension`）互斥，给出多于一个会报错。
- 结束时用 [detach](cli:command:detach) 分离（外部浏览器继续运行），而不是 [close](cli:command:close)。

## 示例

```sh
# 连接 Playwright 浏览器扩展
playwright-cli attach --extension=chrome

# 按通道名连接本机正在运行的 Chrome / Edge
playwright-cli attach --cdp=chrome
playwright-cli attach --cdp=msedge

# 经 CDP 端点连接
playwright-cli attach --cdp=http://localhost:9222
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令与选项声明见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
- 目标互斥校验、会话名解析与隐式 `snapshot` 见 [program.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-client/program.ts)。
