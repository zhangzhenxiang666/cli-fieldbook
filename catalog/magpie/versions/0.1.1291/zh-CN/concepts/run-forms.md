---
title: 运行形态
uses:
  - command:tui
  - command:web
  - command:serve
  - command:daemon
---

# 运行形态

magpie 的界面与网关可以分开理解:网关必须有东西在跑,界面按场景挑选。五种形态共享同一份配置。

| 形态 | 命令 | 适合 |
|---|---|---|
| 桌面应用(窗口 + 菜单栏) | `magpie` | macOS/Windows/Linux 日常使用 |
| 仅菜单栏 | [`magpie tray`](cli:command:tray) | 不占 Dock |
| 终端 TUI | [`magpie tui`](cli:command:tui) | 无桌面/SSH;打开期间兼跑网关 |
| 浏览器页面 | [`magpie web`](cli:command:web) | WSL、远程服务器:浏览器里用完整界面 |
| 纯网关 | [`magpie serve`](cli:command:serve) | 服务器、容器:无界面只跑网关 |

## 网关的常驻:daemon

[`magpie daemon install`](cli:command:daemon/install) 把 `magpie serve` 装成系统服务(macOS launchd、Linux systemd --user):开机自启、停了自动拉起,界面想开就开、不开也不影响路由。

## Web 形态的细节

- 每次运行生成新密钥;`MAGPIE_WEB_KEY`(16 位以上字母数字及 `-._~`)固定一个,登入 400 天;
- 反向代理后用 `MAGPIE_WEB_URL=https://…` 让它打印走代理的链接;
- `--gateway` 纯网关模式页面(无 Agents/Sessions/Library);
- `--tls-cert`/`--tls-key` 直接以 https 对外。

## 快速面板与自启

- [`magpie panel`](cli:command:panel):菜单栏图标的快速面板,再按关闭;
- [`magpie autostart on`](cli:command:autostart):登录时自动启动(菜单栏形态)。

## 来源

- 各形态入口与参数:internal/cli/main.go、web_cli.go、daemon_cli.go(固定提交)
- 部署场景:README.zh-CN.md(固定提交)
