---
title: playwright-cli requests
command:
  - requests
---

列出页面加载以来的全部网络请求。

## 简介

`requests` 列出会话页面自加载以来的网络请求，每条带序号，供 [request](cli:command:request) 系列命令按编号查看详情。默认不含成功的静态资源；`--clear` 清空列表。

## 选项

### `--static`

格式：`--static`。包含成功的静态资源（图片、字体、脚本等）；缺省不含。

### `--filter`

格式：`--filter <VALUE>`。只返回 URL 匹配该正则的请求（如 `/api/.*user`）。

### `--clear`

格式：`--clear`。清空网络请求列表（不返回请求）。

## 示例

```sh
playwright-cli requests
playwright-cli requests --static
playwright-cli requests --filter "/api/.*user"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
