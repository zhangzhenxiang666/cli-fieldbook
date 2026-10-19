---
title: magpie github now
command:
  - github
  - now
---

立即同步一次,完成后显示同步状态。

## 简介

不等自动间隔,马上执行一次同步,然后打印 [`magpie github`](cli:command:github) 同样的状态输出。同步未开启时报错并提示开启命令。

网关(应用、[`web`](cli:command:web) 或 [`serve`](cli:command:serve))在运行时本来就会按 [`github auto`](cli:command:github/auto) 设的间隔自动同步;`now` 用于手动触发。

## 使用提醒

- 网关没在运行时,只有 `now` 这类手动同步会发生。

## 示例

```sh
magpie github now
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go) 的 `syncCmd` `now` 分支与 `syncNow`。
