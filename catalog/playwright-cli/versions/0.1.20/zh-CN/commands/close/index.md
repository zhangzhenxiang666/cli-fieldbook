---
title: playwright-cli close
command:
  - close
---

关闭当前会话的浏览器。

## 简介

`close` 停止 `-s` 指定会话（缺省 `default`）的浏览器与守护进程。会话不存在时同样正常返回，只是报告原本未打开。对经 [attach](cli:command:attach) 连接的外部浏览器，结束时应使用 [detach](cli:command:detach) 而不是本命令。

## 使用提醒

- 内存型 profile 的页面状态随关闭丢失；持久 profile 的数据保留，可用 [delete-data](cli:command:delete-data) 清除。
- 要一次关闭全部会话用 [close-all](cli:command:close-all)。

## 示例

```sh
playwright-cli open https://example.com
playwright-cli close

# 关闭命名会话
playwright-cli -s=work close
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
- 客户端停止会话的实现见 [program.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-client/program.ts)。
