---
title: magpie group restore
command:
  - group
  - restore
---

找回被你移除的 magpie 自动发现的组。

## 简介

`magpie group restore <id>` 撤销 [`group rm`](cli:command:group/rm) 对自动组(形如 `auto-<model>`)的隐藏:去掉 providers.json 里的 `hidden` 记录。若该组的模型当前仍被两个及以上 provider 提供,组立即回来并显示详情;否则命令会说明:等模型再次被两个 provider 提供时组自动出现。别名:`magpie group unhide`。

## 参数

### `id`

组 id。

## 使用提醒

- 只对自动发现的组有意义:你自建的组被 rm 后是真正删除,restore 无法恢复(需要重建);未移除的组 restore 会报 "isn't removed"。

## 示例

```sh
magpie group restore auto-claude-opus-5-5
```

以上示例为说明性内容,未实际运行。

## 源码补充

- `restoreGroup` 与仅剩记录的情形(`removedOnly`)见 [groups_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/groups_cli.go)。
