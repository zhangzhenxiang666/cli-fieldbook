---
title: magpie quota wait
command:
  - quota
  - wait
---

阻塞直到某个订阅(其任一账户)或某个账户恢复额度,供脚本续接被停下的工作。

## 简介

等待期间自己读各厂商的额度(不需要网关在跑):在最接近已知最早恢复时刻的前后重读——最短 1 分钟、最长 10 分钟一次;进度写在 stderr。额度恢复时退出 0 并打印是哪个账户。

典型用法是配合重试循环,让停下的任务继续:

```sh
until codex exec "…"; do magpie quota wait codex || break; done
```

## 参数

### `target`

等待的对象:provider 的 id 或名称(等待其全部账户中任何一个恢复)、账户的邮箱或登录名,或 `<provider>/<account>`(两个 provider 有同名账户时消歧)。

## 选项

### `--timeout`

`--timeout <d>`(`-t`)。最长等待时长,如 `30m`、`6h`;超时以退出码 1 结束。

### `--quiet`

`--quiet`(`-q`)。不打印等待进度与结果。

## 使用提醒

- 退出码:0 恢复;1 `--timeout` 超时;2 目标名不认识(或该 provider 没有可读额度的订阅);130 Ctrl+C。
- provider 的某个账户若在 magpie 中被关掉或已登出,不计入等待。
- 不认识的名称报错时会提示用 `magpie quota` 列出可选对象。

## 示例

```sh
magpie quota wait codex --timeout 2h
magpie quota wait claude/me@example.com --quiet
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 轮询循环、退避与退出码见 [quota_wait.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/quota_wait.go)。
