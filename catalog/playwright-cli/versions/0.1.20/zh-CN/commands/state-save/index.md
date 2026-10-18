---
title: playwright-cli state-save
command:
  - state-save
---

把当前存储（认证）状态保存到文件。

## 简介

`state-save` 导出当前页面的存储状态（cookie 与 localStorage）为 JSON 文件，供 [state-load](cli:command:state-load) 或 Playwright 测试复用。省略文件名时自动命名。

## 参数

### `filename`

可选，写作 `[filename]`。保存存储状态的文件名。

## 使用提醒

存储状态包含会话凭据，按敏感数据处理。

## 示例

```sh
playwright-cli state-save
playwright-cli state-save auth.json
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
