---
title: 浏览器与设备仿真
uses:
  - command:open
  - command:install-browser
---

[open](cli:command:open) 的选项决定会话用哪种浏览器、以何种形态运行。本文汇总浏览器选择、有头/无头、设备仿真与 profile 持久化。本文依据固定提交 `cli-daemon/commands.ts` 的声明与官方 skills 文档快照。

## 浏览器与通道

`--browser` 接受 `chrome`、`firefox`、`webkit`、`msedge`（源码类型为自由字符串，还接受其他通道名）。浏览器二进制缺失时用 [install-browser](cli:command:install-browser) 安装（选项与经典 `playwright install` 一致）。

## 无头与有头

缺省无头运行（不显示窗口，适合自动化）；`--headed` 有头运行，适合需要观察或人工介入的场景。

## 设备仿真

- `--device="iPhone 15"`：仿真特定设备的视口、缩放与 user agent。
- `--mobile`：仿真通用移动设备（Chromium 用 Pixel 10，WebKit 用 iPhone 17）。移动页面通常更轻，能减小快照体积、降低成本。

## profile 与持久化

缺省 profile 在内存中：会话结束即弃，浏览器状态（cookie、存储）不保留。需要跨会话保留时：

- `--persistent`：使用持久用户数据目录（自动位置）。
- `--profile=<dir>`：显式指定用户数据目录。

持久会话的数据用 [delete-data](cli:command:delete-data) 彻底清除。登录态等认证数据更适合用 [state-save](cli:command:state-save)/[state-load](cli:command:state-load) 以文件形式管理，见[存储状态](storage-state.md)。

## 配置文件

`--config=<path>` 指定配置文件，缺省 `.playwright/cli.config.json`；浏览器启动参数（如 WebMCP 旗标）写在其中 `browser.launchOptions.args`。当前生效的完整配置可用隐藏命令 [config-print](cli:command:config-print) 查看。

以上示例为说明性内容，未实际运行。
