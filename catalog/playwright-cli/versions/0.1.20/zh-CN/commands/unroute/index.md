---
title: playwright-cli unroute
command:
  - unroute
---

移除匹配模式的路由（或全部路由）。

## 简介

`unroute` 移除此前用 [route](cli:command:route) 注册的模拟路由：给模式时移除匹配该模式的路由，省略时移除全部。

## 参数

### `pattern`

可选，写作 `[pattern]`。要移除的 URL 模式；省略时移除全部路由。

## 示例

```sh
playwright-cli unroute "**/*.jpg"
playwright-cli unroute
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
