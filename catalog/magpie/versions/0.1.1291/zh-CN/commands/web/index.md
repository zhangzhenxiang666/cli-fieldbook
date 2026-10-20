---
title: magpie web
command:
  - web
---

在浏览器里打开应用窗口,并同时承担网关服务;适合 WSL、SSH 连到的服务器等没有桌面环境的机器。

## 简介

`magpie web` 在本机启动一个 HTTP 服务,渲染与应用窗口相同的界面。默认只监听 `127.0.0.1:3430`,并在启动后自动打开浏览器;页面链接自带一把本次运行的密钥(`/?k=…`),凭密钥保持登录。

若 magpie 的系统服务([`magpie daemon`](cli:command:daemon))已在服务此页面,本命令直接给出那个页面的链接而不是再起一个。

## 选项

### `--addr`

`--addr host:port`。页面监听地址,默认 `127.0.0.1:3430`(与网关端口相邻)。也接受 `--addr=host:port` 形式。

### `--lan`

监听 `0.0.0.0`,让局域网内其他电脑可以打开页面。此时链接会以明文 HTTP 传输(除非同时给 TLS 证书),任何拿到链接的人都能查看与修改 magpie 设置及其密钥,注意风险。

### `--no-open`

不自动打开浏览器,只打印页面链接。

### `--gateway`

页面以 gateway 模式显示(不含 Agents、Sessions、Library 页面);Settings › General 也可以切换该模式。

### `--tls-cert`

`--tls-cert <file>`。PEM 证书文件,与 `--tls-key` 成对给出,让页面与网关以 `https://` 对外服务。只给其一或文件无法加载时拒绝启动。

### `--tls-key`

`--tls-key <file>`。PEM 私钥文件,与 `--tls-cert` 成对使用。

## 使用提醒

- 每次运行生成新密钥;设置环境变量 `MAGPIE_WEB_KEY`(至少 16 个字母、数字或 `-` `.` `_` `~`)可跨运行保持同一把,登录状态保持 400 天。
- 反向代理后面运行时,设 `MAGPIE_WEB_URL=https://<代理地址>`,magpie 会打印经过代理的链接。
- 已有其他 magpie 服务网关时,这个页面展示同一份设置与账号,并在那一个停止后接管网关。
- Ctrl-C 停止。

## 示例

```sh
magpie web --addr 0.0.0.0:3430 --no-open
magpie web --tls-cert cert.pem --tls-key key.pem
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 参数解析、默认地址与密钥逻辑见 [web_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/web_cli.go)。
- TLS 参数校验见 [tls_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/tls_cli.go)。
