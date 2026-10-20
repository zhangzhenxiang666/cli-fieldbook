---
title: magpie update mirror
command:
  - update
  - mirror
---

查看或固定每次更新(含应用自身的更新)下载时经由的 GitHub 镜像前缀。

## 简介

设置持久镜像后,之后每次更新(包括应用自己发起的)都经由该前缀下载;`off` 恢复 GitHub 直连。不带参数时显示当前设置。

## 参数

### `prefix`

`[<prefix>|off]`。镜像前缀,置于 github.com 下载地址之前;`off`(或 `none`)恢复 GitHub 直连。不带参数时显示当前设置。

## 使用提醒

- 镜像只改变下载来源;无论走不走镜像,每个更新仍对照 usemagpie.ai 的 SHA-256 校验和。
- 只想某一次更新走镜像,用 [`update`](cli:command:update) 的 `--mirror` 一次性选项。

## 示例

```sh
magpie update mirror https://mirror.example.com
magpie update mirror off
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 镜像设置的读取、校验与保存见 [update_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/update_cli.go)。
