---
title: 环境变量
---

gh 通过一组环境变量控制认证、上下文与输出行为。本页整理自固定提交的帮助主题 `gh help environment`（[pkg/cmd/root/help_topic.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/root/help_topic.go)）；变量名保持原拼写。

## 认证与主机

- `GH_TOKEN`、`GITHUB_TOKEN`（按优先级）：命令目标为 `github.com` 或其 `ghe.com` 子域名时使用的认证令牌；设置后不再提示登录，并优先于已存储的凭据。
- `GH_ENTERPRISE_TOKEN`、`GITHUB_ENTERPRISE_TOKEN`（按优先级）：目标为 GitHub Enterprise Server 主机时使用的认证令牌。
- `GH_HOST`：为未显式指定主机名、也无法从本地 Git 仓库推断的命令指定 GitHub 主机名；若该主机此前认证过则使用已存凭据，否则需按目标设置 `GH_TOKEN` 或 `GH_ENTERPRISE_TOKEN`。

## 仓库与工具上下文

- `GH_REPO`：以 `[HOST/]OWNER/REPO` 形式为原本作用于本地仓库的命令指定仓库。
- `GH_EDITOR`、`GIT_EDITOR`、`VISUAL`、`EDITOR`（按优先级）：撰写文本使用的编辑器。
- `GH_BROWSER`、`BROWSER`（按优先级）：打开链接使用的浏览器。
- `GH_PATH`：指定 gh 可执行文件路径；在 cygwin 终端等无法自行定位的场景有用。gh 调用扩展时也会设置它，便于扩展回调同一个 gh。
- `GH_EXTENSION`：gh 调用扩展时设为 `1`，扩展据此区分自身是被 `gh <扩展名>` 调用还是独立运行。

## 调试与输出

- `GH_DEBUG`：设为真值时在标准错误启用详细输出；设为 `api` 时额外记录 HTTP 流量。
- `DEBUG`（已弃用）：设为 `1`、`true` 或 `yes` 时启用详细输出。
- `GH_PAGER`、`PAGER`（按优先级）：标准输出的分页程序，如 `less`。
- `GLAMOUR_STYLE`：渲染 Markdown 使用的样式，见 [glamour 样式列表](https://github.com/charmbracelet/glamour#styles)。
- `NO_COLOR`：设为任意值时不输出 ANSI 颜色转义序列。
- `CLICOLOR`：设为 `0` 关闭彩色输出。
- `CLICOLOR_FORCE`：设为非 `0` 值时，即使输出被管道重定向也保留 ANSI 颜色。
- `GH_COLOR_LABELS`：设为任意值时，在支持真彩的终端以 RGB 十六进制色码显示标签。
- `GH_ACCESSIBLE_COLORS`（preview）：设为真值时使用可定制的 4 位无障碍配色。
- `GH_FORCE_TTY`：设为任意值时即使输出被重定向也采用终端式输出；值为数字时按可用列数解析，为百分比时按当前视口列数的比例解析。
- `GH_MDWIDTH`：Markdown 渲染换行的默认最大宽度；实际取终端宽度、该值与未指定时的 120 三者最小值，例如 [`gh pr view`](cli:command:pr/view) 会用到。
- `GH_SPINNER_DISABLED`：设为真值时以文本进度指示替代旋转动画。
- `GH_ACCESSIBLE_PROMPTER`（preview）：设为真值时启用对语音合成与点字屏读更友好的交互提示。

## 更新提示、配置与遥测

- `GH_NO_UPDATE_NOTIFIER`：设为任意值关闭 gh 的更新通知（每 24 小时检查一次新版本，发现新版本时在标准错误提示）。
- `GH_NO_EXTENSION_UPDATE_NOTIFIER`：设为任意值关闭扩展的更新通知（执行扩展时每 24 小时检查一次）。
- `GH_CONFIG_DIR`：配置文件目录；未指定时依次取 `$XDG_CONFIG_HOME/gh`（设置了 `XDG_CONFIG_HOME` 时）、`$AppData/GitHub CLI`（Windows 且设置了 `AppData` 时）或 `$HOME/.config/gh`。
- `GH_PROMPT_DISABLED`：设为任意值时禁用终端交互提示。
- `GH_TELEMETRY`：设为 `log` 时把遥测数据打印到标准错误而不发送；设为 `false` 或 `0` 关闭遥测；优先于 `DO_NOT_TRACK`。
- `DO_NOT_TRACK`：设为 `true` 或 `1` 关闭遥测；`GH_TELEMETRY` 已设置时忽略本变量。

## 使用提醒

- 令牌类变量只影响读取顺序，不会写入配置；持久凭据仍由 [`gh auth login`](cli:command:auth/login) 管理。
- 与仓库上下文相关的变量（`GH_REPO`、`GH_HOST`）可被 `-R/--repo`、`--hostname` 等显式旗标覆盖，见各命令页。
