---
title: playwright-cli install
command:
  - install
---

初始化工作区。

## 简介

`install` 初始化当前工作区的 playwright-cli 配置（`.playwright/` 目录）；`--skills` 同时安装官方 agent skills 文档（取值 `claude`（缺省）或 `agents`），`--global`/`-g` 把 skills 装到用户主目录而不是工作区。

## 选项

### `--skills`

格式：`--skills <VALUE>`。安装 skills，取值 `claude`（缺省）或 `agents`。

### `--global`

短旗标 `-g`。格式：`--global`。把 skills 安装到主目录而不是工作区；必须与 `--skills` 同用。

## 使用提醒

`--global` 不带 `--skills` 时直接报错。

## 示例

```sh
playwright-cli install
playwright-cli install --skills=claude
playwright-cli install --skills=agents --global
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
- 工作区初始化与 skills 安装的转发实现见 [program.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-client/program.ts) 与 [installSkills.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/utils/installSkills.ts)。
