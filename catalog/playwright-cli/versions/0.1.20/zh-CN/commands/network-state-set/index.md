---
title: playwright-cli network-state-set
command:
  - network-state-set
---

设置浏览器网络状态为在线或离线。

## 简介

`network-state-set` 模拟在线/离线状态切换，用于测试页面的离线处理逻辑。

## 参数

### `state`

必需，写作 `<state>`。目标状态：`offline` 模拟离线，`online` 恢复联网。

## 示例

```sh
playwright-cli network-state-set offline
playwright-cli network-state-set online
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
