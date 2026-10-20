---
title: magpie save
command:
  - save
---

把当前每个 agent 的设置快照保存为一个 profile。

## 简介

对全部 agent 的当前设置(以及 library 的开启范围)做一次快照,以给定名称保存。之后可用 [`use`](cli:command:use) 随时恢复整套设置,用 [`profiles`](cli:command:profiles) 查看已保存的列表,用 [`rm`](cli:command:rm) 删除。

同名保存会覆盖已有的同名 profile。

## 参数

### `name`

profile 的名称。保存后显示 `✓ saved profile <name>`;快照包含 library 时附注其内容概要。

## 使用提醒

- profile 只保存 magpie 写入 agent 配置的设置,不包含 API key 与订阅登录;跨机器迁移完整配置用 [`backup`](cli:command:backup)。
- 典型用法:为"日常""重度写作""省钱"等不同模型组合各存一个 profile,一键切换。

## 示例

```sh
magpie save daily
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 快照与保存见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go) 的 `profiles()` 中 `save` 分支。
