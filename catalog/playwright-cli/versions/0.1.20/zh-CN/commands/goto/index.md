---
title: playwright-cli goto
command:
  - goto
---

导航当前会话页面到指定 URL。

## 简介

`goto` 让当前页面前往给定 URL，命令完成后返回新页面的状态快照（URL、标题与可交互元素的引用）。这是会话内导航的基本命令；[open](cli:command:open) 在启动会话时也会隐式执行一次本命令。

## 参数

### `url`

必需，写作 `<url>`。要导航到的 URL。

## 使用提醒

- URL 含多个查询参数（带 `&`）时注意 shell 引用；Windows `cmd.exe` 需转义 `^&`。
- 导航是同步完成的：命令返回即表示页面已加载（或加载失败已报错）。

## 示例

```sh
playwright-cli goto https://playwright.dev
playwright-cli -s=work goto "https://example.com/?a=1&b=2"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
