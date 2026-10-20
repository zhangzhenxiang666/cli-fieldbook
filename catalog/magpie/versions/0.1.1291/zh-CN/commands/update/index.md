---
title: magpie update
command:
  - update
---

安装最新发布版:应用替换其 bundle,终端构建替换其二进制。

## 简介

检查是否有新版本;有则下载并安装。已是最新时打印 `✓ magpie <版本> is the latest`;从源码构建的 magpie 不自行替换,只报告最新发布版号。

安装方式随来源自动区分:macOS 应用更新 bundle(不可写时以管理员权限重装);Homebrew 安装的提示 `brew upgrade magpie`;容器内提示拉取新镜像(`docker pull ghcr.io/yetone/magpie:latest`)后重建容器。

## 选项

### `--proxy`

`--proxy <url>`。本次更新经由的代理,http(s):// 或 socks5://。

### `--mirror`

`--mirror <prefix>`。本次下载经由的 GitHub 镜像前缀;无论走不走镜像,校验和仍对照 usemagpie.ai 的 SHA-256。

## 使用提醒

- 只想知道有没有新版、不安装,用 [`check`](cli:command:update/check);要固定走某个镜像,用 [`mirror`](cli:command:update/mirror);应用自己定期检查,用 [`auto`](cli:command:update/auto)。
- macOS 上更新后需退出并重开 magpie 才生效;若 `magpie` 命令是旧复制的副本,输出会提示重新运行安装脚本或手动链接。

## 示例

```sh
magpie update --proxy socks5://127.0.0.1:1080
magpie update --mirror https://mirror.example.com
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 检查、下载与按来源分派的安装见 [update_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/update_cli.go)。
