---
title: Python 版本
uses:
  - command:python
  - command:python/list
  - command:python/install
  - command:python/upgrade
  - command:python/find
  - command:python/pin
  - command:python/dir
  - command:python/update-shell
---

一个"Python 版本"由解释器可执行文件、标准库及配套文件组成。uv 既会发现系统里已有的 Python，也能自己下载安装。围绕 [uv python](cli:command:python) 的一组子命令负责列出、安装、查找与固定版本；本文说明请求语法、发现顺序与固定机制。

## 托管与系统 Python

uv 把 Python 分为两类：由 uv 下载安装的称为托管（managed）Python，其余全部称为系统（system）Python——包括操作系统自带和 pyenv 等其他工具管理的安装。默认行为（`python-preference = "managed"`）是优先使用已装的托管版本，但仍会先于"下载新的托管版本"使用系统版本。可选值还有 `only-managed`、`system`、`only-system`，分别对应 `--managed-python` 与 `--no-managed-python` 开关。

`python-downloads` 设置控制自动下载，默认 `automatic`（需要时自动下载），设为 `manual` 后只在 [uv python install](cli:command:python/install) 期间下载；任何 uv 命令也可用 `--no-python-downloads` 关闭。

## 请求语法

多数命令的 `--python` 选项（以及 `uv python` 子命令的位置参数）接受统一的请求语法，源码中 `python` 命令的长注释列出了完整格式：

- 版本：`3`、`3.12`、`3.12.3`
- 版本范围：`>=3.12,<3.13`
- 版本加短变体后缀：`3.13t`（free-threaded）、`3.12.0d`（debug）
- 版本加 `+variant`：`3.13+freethreaded`、`3.14+gil`、`3.12.0+debug`
- 实现名：`cpython` 或 `cp`（请求不区分大小写；PyPy 是 `pypy` / `pp`，GraalPy 是 `graalpy` / `gp`，另有 `pyodide`）
- 实现加版本：`cpython@3.12`、`cpython3.12`、`cp312`
- 实现加版本范围：`cpython>=3.12,<3.13`
- 完整分发标识：`cpython-3.12.3-macos-aarch64-none`

此外可以直接请求本机解释器：可执行文件路径（`/opt/homebrew/bin/python3`）、可执行文件名（`mypython3`）或安装目录（以路径分隔符结尾的目录）。

变体有两点值得注意：free-threaded 构建（`t` 后缀）在 3.13 需显式请求，3.14 起无需显式选择但仍偏好带 GIL 的构建，需要强制 GIL 变体时用 `+gil`；debug 构建仅在无其他匹配安装时使用，或经 `3.13d` 显式请求。预发布版本的 Python 同样默认不被选中，只在无稳定版匹配时使用。

## 发现顺序

寻找 Python 时，uv 先查虚拟环境：已激活的环境，或工作目录及父目录中的 `.venv`（其解释器仍要按请求校验兼容性）。不需要虚拟环境时再按顺序搜索安装：

1. `UV_PYTHON_INSTALL_DIR` 中的托管安装；
2. `PATH` 上的 `python`、`python3`、`python3.x`（Windows 上是 `python.exe`）；
3. Windows 上额外的注册表与 Microsoft Store 解释器。

搜索托管版本时优先较新版本；搜索系统版本时使用第一个兼容版本（未必最新）。每个发现的可执行文件都会被查询元数据以确认满足请求，查询失败即跳过。系统上找不到时，uv 会检查是否有兼容的托管版本可下载。不支持的实现会被跳过；显式请求不支持的实现则直接报错。[uv python find](cli:command:python/find) 显示按此规则选中的解释器路径（`--system` 可忽略虚拟环境）。

## 自动下载与安装

默认情况下无需手动安装：缺什么版本 uv 自动下载。显式安装用 [uv python install](cli:command:python/install)，接受上述请求语法（路径类请求除外），可一次请求多个版本；不带参数时验证已安装的托管版本或安装最新版本，存在 `.python-version` 文件时安装其中列出的版本，项目需要多个版本时也可定义 `.python-versions` 文件让 uv 全部安装。

托管的 CPython 分发来自 Astral 的 python-build-standalone 项目，PyPy 分发来自 PyPy 项目。可用版本列表随每个 uv 发布冻结，安装新版本可能需要先升级 uv。安装位置默认在 uv 数据目录（Unix 上如 `$HOME/.local/share/uv/python`，可用 `UV_PYTHON_INSTALL_DIR` 覆盖；[uv python dir](cli:command:python/dir) 查看，加 `--bin` 查看可执行文件目录）。

默认会同时把带次版本后缀的可执行文件（如 `python3.12`）装入 `PATH` 上的目录（Unix 上如 `~/.local/bin`）；`--default` 额外安装 `python` 与 `python3`（实验性）。uv 只覆盖自己管理的可执行文件；该目录不在 `PATH` 时可用 [uv python update-shell](cli:command:python/update-shell) 添加。[uv python list](cli:command:python/list) 列出已装版本与可下载版本，可用请求参数与 `--all-versions`、`--all-platforms`、`--only-installed` 过滤。

升级只对托管版本透明可用，且只在补丁版本间进行（次版本变更会影响解析，不透明升级）：[uv python upgrade](cli:command:python/upgrade) 升到最新补丁版本，旧补丁保留，使用该版本的虚拟环境自动跟随（除非当初显式请求了精确补丁版本）。PyPy 等替代实现暂不支持升级。

## .python-version 固定

`.python-version` 文件提供一个默认的 Python 版本请求，[uv python pin](cli:command:python/pin) 把它写入当前目录，`--global` 写入用户配置目录使其全局生效。文件内容可以是任何请求格式，但为了与其他工具互通，建议写版本号。

发现规则：uv 从工作目录逐级向上搜索 `.python-version`，找不到再看用户级配置目录；不会越过项目或 workspace 边界（用户配置目录除外），`--no-config` 可禁用发现。项目命令还会尊重 `pyproject.toml` 的 `requires-python`：在满足范围的版本中取第一个，除非 `.python-version` 或 `--python` 另有请求。
