---
title: playwright-cli install-browser
command:
  - install-browser
---

安装浏览器。

## 简介

`install-browser` 安装会话所需的浏览器二进制；不带参数时安装默认浏览器集。本命令由客户端转发给随包分发的经典 `playwright install` 程序执行，选项语义与其一致。

## 参数

### `browser`

可选，写作 `[browser]`。要安装的浏览器。

## 选项

### `--with-deps`

格式：`--with-deps`。同时安装浏览器的系统依赖。

### `--dry-run`

格式：`--dry-run`。不实际安装，只打印将执行的信息。

### `--list`

格式：`--list`。列出全部 Playwright 安装中的浏览器。

### `--force`

格式：`--force`。强制重装已安装的浏览器。

### `--only-shell`

格式：`--only-shell`。安装 Chromium 时只装无头 shell。

### `--no-shell`

格式：`--no-shell`。安装 Chromium 时不装无头 shell。

## 示例

```sh
playwright-cli install-browser
playwright-cli install-browser chromium --with-deps
playwright-cli install-browser --list
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
- 转发到经典 install 程序的实现见 [program.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-client/program.ts)。
