---
title: magpie rm
command:
  - rm
---

删除一个已保存的 profile。

## 简介

按名称删除 [`save`](cli:command:save) 保存的 profile,成功后显示 `✓ deleted profile <name>`。

## 参数

### `name`

要删除的 profile 名称,来自 [`profiles`](cli:command:profiles) 列表。

## 使用提醒

- 本命令只删除 profile,不改各 agent 的当前设置;正在生效的设置保持不变。
- 删除 provider 用 [`provider rm`](cli:command:provider/rm),删除搜索 API 用 [`search rm`](cli:command:search/rm),与本命令无关。

## 示例

```sh
magpie rm daily
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 删除见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go) 的 `profiles()` 中 `rm` 分支。
