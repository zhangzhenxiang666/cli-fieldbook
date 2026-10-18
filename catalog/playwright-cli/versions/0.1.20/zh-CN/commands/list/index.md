---
title: playwright-cli list
command:
  - list
---

列出浏览器会话。

## 简介

`list` 列出当前工作区的浏览器会话（名称、状态、浏览器类型、是否有头、是否持久、是否连接等）；`--all` 列出全部工作区的会话及已注册的 browser server 与通道会话。已无法连接的会话条目会被顺带清理。

## 选项

### `--all`

格式：`--all`。跨全部工作区列出会话。

## 示例

```sh
playwright-cli list
playwright-cli list --all
playwright-cli list --json
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
- 客户端收集会话信息的实现见 [program.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-client/program.ts)。
