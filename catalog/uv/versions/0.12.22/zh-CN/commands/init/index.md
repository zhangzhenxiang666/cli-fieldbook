---
title: uv init
command:
  - init
---

## 简介

创建新的[项目](../../concepts/projects.md)，遵循 `pyproject.toml` 规范。若目标位置已存在 `pyproject.toml`，uv 将报错退出。

若目标路径的任一父目录存在 `pyproject.toml`，新项目会被加入父项目的 workspace（除非提供 `--no-workspace`）。部分项目状态是按需创建的：项目虚拟环境（`.venv`）与 lockfile（`uv.lock`）会在首次同步时才惰性生成。

默认创建应用（app）项目；可用 `--app`、`--lib`、`--script` 选择项目类型，或用 `--bare` 只生成最小文件集。

## 参数

### `PATH`

项目或脚本的路径。初始化应用或库时默认为当前工作目录；初始化脚本（`--script`）时必填。接受相对与绝对路径。

若目标路径的任一父目录存在 `pyproject.toml`，项目将被加入父项目的 workspace，除非提供 `--no-workspace`。

## 选项

### `--help`

短旗标 `-h`。显示当前命令的简明帮助。传入 `--help` 时显示长帮助。

### `--name`

格式：`--name <NAME>`。项目名称，默认取目录名。与 `--script` 互斥。

### `--bare`

只创建 `pyproject.toml`，不创建 `README.md`、`src/` 目录树、`.python-version` 等额外文件。`[build-system]` 表仅在同时使用 `--package` 或 `--build-backend` 时创建；与 `--script` 组合时，脚本只包含内联元数据头。

### `--virtual`

创建虚拟（非包）项目而非可打包的项目。已弃用，将在未来版本移除；与 `--package` 互斥。该选项在帮助中隐藏。

### `--package`

把项目设置为构建为 Python 包：为项目定义 `[build-system]`。这是默认行为。

### `--no-package`

不把项目设置为包：创建不可作为模块导入的平铺目录结构，且不含 `[build-system]` 表；适合不打算作为包分发的应用。与 `--lib`、`--build-backend` 互斥。

### `--app`

创建应用项目，面向 Web 服务、脚本与命令行接口。应用默认会打包；用 `--no-package` 可创建不打包的应用。别名 `application`；与 `--lib`、`--script` 互斥。

### `--lib`

创建库项目：预期构建并作为 Python 包分发的项目。别名 `library`；与 `--app`、`--script` 互斥。

### `--script`

创建脚本：带内嵌元数据（依赖与 Python 版本要求，按 PEP 723 规范）的独立文件，可直接用 [uv run](cli:command:run) 执行。默认添加对系统 Python 版本的要求，用 `--python` 指定其他版本要求。与 `--app`、`--lib`、`--package`、`--build-backend`、`--description` 互斥。

### `--description`

格式：`--description <DESCRIPTION>`。设置项目描述。与 `--script` 互斥。

### `--no-description`

不写项目描述。与 `--script` 互斥。

### `--vcs`

格式：`--vcs <VCS>`。为项目初始化版本控制系统，默认初始化 Git 仓库（`git`）；用 `--vcs none` 显式跳过版本控制初始化。与 `--script` 互斥。

### `--build-backend`

格式：`--build-backend <BUILD_BACKEND>`。为项目初始化指定的构建后端，隐含 `--package`。与 `--script`、`--no-package` 互斥。对应环境变量 `UV_INIT_BUILD_BACKEND`。

### `--backend`

无效的旧选项名，仅用于提示改用 `--build-backend`。该选项在帮助中隐藏。

### `--no-readme`

不创建 `README.md` 文件。

### `--author-from`

格式：`--author-from <AUTHOR_FROM>`。是否填写 `pyproject.toml` 的 `authors` 字段，取值 `auto`（默认，尝试从 Git 等来源推断作者信息）、`git`（仅从 Git 配置推断）或 `none`（不推断）。

### `--no-pin-python`

不为项目创建 `.python-version` 文件。默认会创建包含所发现 Python 解释器次版本的 `.python-version`，使后续 uv 命令使用该版本。

### `--pin-python`

为项目创建 `.python-version` 文件，这是默认行为。该选项在帮助中隐藏。

### `--no-workspace`

避免发现 workspace 并创建独立项目。默认 uv 会在当前目录及父目录搜索 workspace。别名 `--no-project`。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。用于确定项目支持的最低 Python 版本的解释器，请求格式见 [uv python](cli:command:python)。对应环境变量 `UV_PYTHON`。

## 环境变量

`--python` 对应 `UV_PYTHON`；`--build-backend` 对应 `UV_INIT_BUILD_BACKEND`。全局环境变量参见根命令页。

## 使用提醒

- 目标位置已存在 `pyproject.toml` 时命令会失败；`--virtual` 已弃用，勿在新脚本中依赖。
- 默认会在父目录发现 workspace 并把新项目登记为成员；需要独立项目时使用 `--no-workspace`。
- `.venv` 与 `uv.lock` 在首次 [uv sync](cli:command:sync) / [uv run](cli:command:run) 之前不会生成。

## 示例

在当前目录创建默认的应用项目：

```console
$ uv init
```

在指定目录创建库项目并固定 Python 版本要求：

```console
$ uv init --lib --python 3.12 my-library
```

创建带 PEP 723 内联元数据的独立脚本：

```console
$ uv init --script example.py
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义于 `ProjectCommand::Init` 与 `InitArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。

## 差异与兼容性

`--virtual` 与 `--backend` 属于兼容性遗留：前者已弃用并将在未来版本移除，后者仅是错误拼写的引导提示。其余选项无 pip / virtualenv 对应物；创建虚拟环境本身请用 [uv venv](cli:command:venv)。
