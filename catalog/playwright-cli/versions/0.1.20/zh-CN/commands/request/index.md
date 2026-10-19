---
title: playwright-cli request
command:
  - request
---

查看单个网络请求的完整详情。

## 简介

`request` 按 [requests](cli:command:requests) 的编号返回单个请求的完整详情（请求头、请求体、响应头与响应体）。

## 参数

### `index`

必需，写作 `<index>`。请求编号：[requests](cli:command:requests) 列表中列出的 1 起始序号。

## 选项

### `--filename`

格式：`--filename <VALUE>`。把结果保存到文件而不是在响应中返回；不提供时以文本返回。

## 示例

```sh
playwright-cli requests
playwright-cli request 5
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
