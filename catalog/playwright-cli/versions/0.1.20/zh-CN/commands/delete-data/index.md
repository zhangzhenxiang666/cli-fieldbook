---
title: playwright-cli delete-data
command:
  - delete-data
---

删除会话的持久用户数据。

## 简介

`delete-data` 删除 `-s` 指定会话（缺省 `default`）的用户数据目录，用于彻底重置持久会话（[open --persistent](cli:command:open)）留下的 profile 数据。会话不存在时正常返回并报告原本不存在。

## 使用提醒

- 删除的是用户数据目录（cookie、存储、缓存等），不只是停止会话；操作不可逆。
- 未使用持久 profile 的会话没有可删除的数据。

## 示例

```sh
playwright-cli -s=mysession close
playwright-cli -s=mysession delete-data
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
- 客户端删除数据的实现见 [program.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-client/program.ts)。
