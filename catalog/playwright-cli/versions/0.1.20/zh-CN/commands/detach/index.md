---
title: playwright-cli detach
command:
  - detach
---

脱离当前连接的外部浏览器。

## 简介

`detach` 结束与外部浏览器的连接，但外部浏览器本身继续运行。仅对经 [attach](cli:command:attach) 建立的会话有意义：对自启动的会话执行本命令会报"未处于连接状态"的错误（此时应使用 [close](cli:command:close)）。

## 使用提醒

- 会话不存在或会话并非 attached 时本命令报错。

## 示例

```sh
playwright-cli attach --cdp=msedge
playwright-cli -s=msedge detach
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
- 客户端校验 attached 状态的实现见 [program.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-client/program.ts)。
