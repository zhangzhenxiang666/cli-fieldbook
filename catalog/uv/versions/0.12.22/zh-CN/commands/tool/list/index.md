---
title: uv tool list
command:
  - tool
  - list
---

## 简介

列出已安装的工具。

默认输出各工具的名称与版本；可用一组 `--show-*` 开关展开路径、版本规格、附带需求、extras 与 Python 版本等细节，用 `--outdated` 查看过时工具。命令别名 `ls`（该别名因本站登记协议的限制未列为独立条目，但在命令行可用）。

## 选项

### `--help`

短旗标 `-h`。显示简明帮助；传入 `--help` 时显示长帮助。

### `--show-paths`

显示每个工具的工具环境路径与已安装可执行文件的路径。

### `--show-version-specifiers`

显示安装各工具时使用的版本规格。

### `--show-with`

显示随各工具附带安装的额外需求（如经 `--with` 安装的包）。

### `--show-extras`

显示随各工具安装的 extras 需求。

### `--show-python`

显示各工具关联的 Python 版本。

### `--outdated`

列出过时的工具：在已安装版本旁显示最新可用版本；最新的工具不会出现在输出中。查询最新版本需要网络访问。

### `--no-outdated`

不做过时检查，`--outdated` 的反义项。该选项在帮助中隐藏。

### `--python-preference`

格式：`--python-preference <PYTHON_PREFERENCE>`。系统 Python 与受管理 Python 的优先级；本命令中该选项仅为屏蔽未使用的全局选项而保留，帮助中隐藏。

### `--no-python-downloads`

禁用 Python 的自动下载；本命令中该选项仅为屏蔽未使用的全局选项而保留，帮助中隐藏。

### `--exclude-newer`

格式：`--exclude-newer <EXCLUDE_NEWER>`。仅考虑给定时间之前上传的候选包（作用于 `--outdated` 查询的最新版本），比较对象是每个分发产物自身的上传时间。接受 RFC 3339 时间戳（如 `2006-12-02T02:07:43Z`）、同格式本地日期（如 `2006-12-02`）、友好时长（如 `24 hours`、`1 week`）或 ISO 8601 时长（如 `PT24H`、`P7D`）；传 `false` 禁用。对应环境变量 `UV_EXCLUDE_NEWER`。

### `--exclude-newer-package`

格式：`--exclude-newer-package <EXCLUDE_NEWER_PACKAGE>`。针对特定包的上传时间上限，格式 `PACKAGE=DATE`，日期写法同 `--exclude-newer`；可多次传入。

## 环境变量

本命令本地选项对应的主要 `UV_*` 变量：`UV_EXCLUDE_NEWER`。全局变量见[根命令](cli:command:)。

## 使用提醒

- 别名 `ls`：`uv tool ls` 与本命令等价（别名未在本站登记为独立条目）。
- `--outdated` 需要联网查询索引；离线时该开关不可用。
- 查看某个工具的详细安装选项（版本规格、附带需求等）组合使用各 `--show-*` 开关。

## 示例

查看工具及其路径与 Python 版本：

```console
$ uv tool list --show-paths --show-python
```

查看过时的工具：

```console
$ uv tool list --outdated
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义于 `ToolCommand::List`/`ToolListArgs`，日期过滤来自 `PackageExcludeNewerArgs` 共享组（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
