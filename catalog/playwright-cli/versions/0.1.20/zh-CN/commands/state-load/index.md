---
title: playwright-cli state-load
command:
  - state-load
---

从文件加载浏览器存储（认证）状态。

## 简介

`state-load` 把此前保存的存储状态文件应用到当前会话：恢复其中的 cookie 与 localStorage，常用于复用登录态。状态文件用 [state-save](cli:command:state-save) 生成。

## 参数

### `filename`

必需，写作 `<filename>`。要加载的存储状态文件名。

## 示例

```sh
playwright-cli state-save auth.json
playwright-cli state-load auth.json
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
