---
title: magpie daemon web
command:
  - daemon
  - web
---

查看或开关 magpie 服务附带的 web 页面;可同时调整其监听地址。

## 简介

安装服务时用 `--web`([`magpie daemon install --web`](cli:command:daemon/install))可以让服务在网关之外同时服务 [`magpie web`](cli:command:web) 的页面,且页面密钥跨重启保持。本命令在服务已安装后管理这个页面:

- 不带参数:打印页面链接与状态;
- `on`:开启页面(可配 `--lan`/`--addr`);
- `off`:关闭页面。

服务未安装时,`on` 会直接连同服务一起装上;`off` 只提示先安装服务。

## 参数

### `state`

`[on|off]`。开启或关闭页面;省略时只显示当前状态(页面链接、密钥保持情况)。

## 选项

### `--lan`

页面监听 `0.0.0.0`,局域网可访问。

### `--addr`

`--addr host:port`。页面监听地址,默认 `127.0.0.1:3430`。给出 `--addr` 或 `--lan` 即意味着开启页面,不能与 `off` 同用。

## 示例

```sh
magpie daemon web on --lan
magpie daemon web off
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- 页面密钥优先取环境变量 `MAGPIE_WEB_KEY`,其次服务已保存的密钥,否则新生成——重装/重开页面不必重新登录。

## 源码补充

- 解析与安装逻辑见 [daemon_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/daemon_cli.go)(`case "web"` 与 `webOptions`)。
