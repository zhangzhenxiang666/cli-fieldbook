---
title: magpie profiles
command:
  - profiles
---

列出已保存的 profile,标记当前生效的那个。

## 简介

逐行显示每个 profile 的名称与内容概要;与当前各 agent 实际设置一致的那个前面显示 `✓`。尚无任何 profile 时提示 `no profiles yet · magpie save <name>`。

## 使用提醒

- 保存新 profile 用 [`save`](cli:command:save),应用用 [`use`](cli:command:use),删除用 [`rm`](cli:command:rm)。
- `save`、`use`、`rm`、`profiles` 是同一分发的四个独立顶层命令,不是本命令的子命令。

## 源码补充

- 列表与生效标记见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go) 的 `profiles()` 中 `profiles` 分支。
