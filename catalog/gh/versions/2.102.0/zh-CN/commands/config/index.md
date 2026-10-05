---
title: gh config
command:
  - config
---

管理 gh 的配置。`gh config` 自身是分组命令，提供查看与修改配置键的子命令。

## 简介

显示或修改 gh 的配置设置。当前受支持的配置键如下（括号内为合法取值与默认值，均保持原拼写）：

- `git_protocol`：git clone 与 push 操作使用的协议（`{https | ssh}`，默认 `https`）。
- `editor`：撰写文本使用的编辑器程序。
- `prompt`：开关终端中的交互提示（`{enabled | disabled}`，默认 `enabled`）。
- `prefer_editor_prompt`：开关基于编辑器的交互提示偏好（`{enabled | disabled}`，默认 `disabled`）。
- `pager`：标准输出发送到的终端分页程序。
- `http_unix_socket`：发起 HTTP 连接所经 Unix 套接字的路径。
- `browser`：打开 URL 使用的 web 浏览器。
- `clipboard`：是否把一次性 OAuth 设备码复制到剪贴板（`{enabled | disabled}`，默认 `enabled`；仅全局，不可按主机设置）。
- `color_labels`：在支持真彩的终端是否以 RGB 十六进制色码显示标签（`{enabled | disabled}`，默认 `disabled`）。
- `accessible_colors`：是否使用可定制的 4 位无障碍配色（`{enabled | disabled}`，默认 `disabled`）。
- `accessible_prompter`：是否使用无障碍交互提示器（`{enabled | disabled}`，默认 `disabled`）。
- `spinner`：是否用旋转动画作为进度指示（`{enabled | disabled}`，默认 `enabled`）。
- `telemetry`：遥测为启用、停用还是仅记录（`{enabled | disabled | log}`，默认 `enabled`）。
- `api_host`：实验性：为 GitHub 主机发起 API 请求时使用的主机名；注意这不是安全边界，发往规范主机的请求仍保持认证（仅按主机设置）。

## 子命令导览

- [`gh config get`](cli:command:config/get)：打印给定配置键的值。
- [`gh config set`](cli:command:config/set)：为给定配置键设置新值。
- [`gh config list`](cli:command:config/list)：列出配置键及其当前值。
- [`gh config clear-cache`](cli:command:config/clear-cache)：清除 gh 的缓存目录。

## 使用提醒

- 配置存储在 gh 的配置文件中，配置文件路径与环境变量见[环境变量](../../reference/environment.md)；别名一节由 [`gh alias`](cli:command:alias) 组管理。
- 设置 `api_host` 时必须给 `--host`；设置 `clipboard` 时不能给 `--host`。

## 示例

```sh
# 列出全部配置
gh config list

# 把 git 协议改为 ssh（针对 github.com 主机）
gh config set git_protocol ssh --host github.com
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 分组定义见 [pkg/cmd/config/config.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/config/config.go)；帮助中的配置键清单由 [internal/config/config.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/internal/config/config.go) 的 `Options` 表动态生成。
