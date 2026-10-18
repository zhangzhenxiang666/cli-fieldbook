---
title: playwright-cli tracing-stop
command:
  - tracing-stop
---

停止追踪记录。

## 简介

`tracing-stop` 结束 [tracing-start](cli:command:tracing-start) 开始的追踪并保存 trace 文件。

## 示例

```sh
playwright-cli tracing-start
playwright-cli tracing-stop
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
