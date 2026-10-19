---
title: playwright-cli config-print
command:
  - config-print
---

打印最终生效的配置（隐藏命令）。

## 简介

`config-print` 输出会话当前生效的完整配置：合并 CLI 选项、环境变量与配置文件后的最终结果。本命令在源码中标记为 hidden，不出现在帮助输出中。

## 使用提醒

- 输出为完整合并配置，未做脱敏：配置文件中的凭据类取值（代理认证、端点令牌等）会原样出现在终端与被记录的日志中，按敏感数据对待。

## 示例

```sh
playwright-cli config-print
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
