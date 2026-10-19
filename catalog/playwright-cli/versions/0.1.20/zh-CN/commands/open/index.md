---
title: playwright-cli open
command:
  - open
---

启动一个持久浏览器会话，并打开给定 URL（缺省 `about:blank`）。

## 简介

`open` 建立新的浏览器会话：客户端会先停止同名的既有会话（若存在），再启动会话守护进程，然后隐式执行一次 [goto](cli:command:goto)（URL 缺省为 `about:blank`）并返回首个页面快照。此后的命令都作用于该会话，直到 [close](cli:command:close) 或机器关停。

默认以无头模式启动 Chromium，配置文件默认为 `.playwright/cli.config.json`，浏览器 profile 默认是内存型的（会话结束即弃）；`--persistent` 或 `--profile` 改用持久用户数据目录。`--device`/`--mobile` 可设备仿真，`--headed` 切换为有头窗口。

## 参数

### `url`

可选，写作 `[url]`。启动后要导航到的 URL；省略时打开 `about:blank`。

## 选项

### `--browser`

格式：`--browser <VALUE>`。使用的浏览器或 Chrome 通道，可选值如 `chrome`、`firefox`、`webkit`、`msedge`（源码类型为自由字符串，未做枚举约束）。

### `--config`

格式：`--config <VALUE>`。配置文件路径，缺省为 `.playwright/cli.config.json`。

### `--device`

格式：`--device <VALUE>`。仿真特定设备，例如 `"iPhone 15"`。

### `--headed`

格式：`--headed`。以有头模式运行浏览器（默认无头）。

### `--idle-timeout`

格式：`--idle-timeout <VALUE>`。空闲指定毫秒数后自动关闭会话：无头默认 1 小时，有头默认永不关闭；传 `0` 禁用。

### `--mobile`

格式：`--mobile`。仿真通用移动设备（Chromium 用 Pixel 10，WebKit 用 iPhone 17）。移动页面通常更轻，可减小快照体积。

### `--persistent`

格式：`--persistent`。使用持久浏览器 profile（默认 profile 在内存中，会话结束即弃）。

### `--profile`

格式：`--profile <VALUE>`。持久用户数据目录的路径。

## 使用提醒

- 同名会话存在时会被先停止再替换，未保存的页面状态会丢失。
- 启动序列（检查既有会话、停止、拉起守护进程）没有按会话串行化：避免对同一会话并发执行两个 `open`，或与 [delete-data](cli:command:delete-data) 同时执行，否则可能相互停掉对方刚建立的会话或误删其 profile。
- 持久会话的用户数据可用 [delete-data](cli:command:delete-data) 清除。
- 会话名用全局 `-s` 指定：`playwright-cli -s=mysession open <url>`。

## 示例

```sh
# 无头打开页面
playwright-cli open https://example.com/

# 指定浏览器与设备
playwright-cli open --browser=firefox
playwright-cli open --device="iPhone 15"

# 有头 + 持久 profile
playwright-cli open --headed --persistent
playwright-cli open --profile=/path/to/profile https://example.com/

# 指定配置文件
playwright-cli open --config=my-config.json
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令与选项声明见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
- 启动流程（停止既有会话、启动守护进程、隐式 `goto`）见 [program.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-client/program.ts)。
