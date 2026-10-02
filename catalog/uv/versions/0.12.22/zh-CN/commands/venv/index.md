---
title: uv venv
command:
  - venv
---

## 简介

创建虚拟环境。

默认在工作目录创建名为 `.venv` 的虚拟环境，可用位置参数指定其他路径。在项目中，可用 `UV_PROJECT_ENVIRONMENT` 环境变量更改默认环境名（仅从项目根目录运行时生效）。若目标路径已存在虚拟环境，将被移除并新建一个空环境。

使用 uv 时无需激活虚拟环境：uv 会在工作目录或任意父目录中寻找名为 `.venv` 的虚拟环境。命令另有别名 `virtualenv` 与 `v`。

## 参数

### `PATH`

格式：`[PATH]`。要创建的虚拟环境路径；相对路径以工作目录为基准，默认为工作目录下的 `.venv`。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。虚拟环境使用的 Python 解释器；创建虚拟环境时，uv 不会在虚拟环境中查找解释器。对应环境变量 `UV_PYTHON`。

### `--system`

在查找 Python 解释器时忽略虚拟环境。这是默认行为，该选项无效果；为兼容提供。该选项在帮助中隐藏；对应环境变量 `UV_SYSTEM_PYTHON`。

### `--no-system`

仅为兼容提供，无效果：创建虚拟环境时 uv 从不在虚拟环境中查找解释器。该选项在帮助中隐藏。

### `--no-project`

不发现项目或 workspace。默认 uv 会搜索当前目录及父目录中的项目，以确定虚拟环境默认路径并检查 Python 版本约束。别名 `--no-workspace`；对应环境变量 `UV_NO_PROJECT`。

### `--seed`

向虚拟环境安装种子包（`pip`、`setuptools`、`wheel` 中的一个或多个），对应环境变量 `UV_VENV_SEED`。注意 Python 3.12+ 的环境中不包含 `setuptools` 与 `wheel`。

### `--clear`

短旗标 `-c`。先移除目标路径既有的文件或目录再创建新环境，对应环境变量 `UV_VENV_CLEAR`。默认目标路径非空时命令报错退出。

### `--force`

允许 `--clear` 移除非虚拟环境的目录。这会删除目标路径下的全部文件与目录。

### `--no-clear`

目标路径存在既有文件或目录时不提示，直接报错退出。默认在终端可用时会提示是否清空非空目录。该选项在帮助中隐藏。

### `--allow-existing`

保留目标路径既有的文件或目录，直接在其上写入而不先清空。警告：既有虚拟环境与新环境链接到不同 Python 解释器时，可能导致意外行为。

### `--prompt`

格式：`--prompt <PROMPT>`。为虚拟环境提供替代的提示符前缀。默认取决于是否向 `uv venv` 提供了路径：提供了路径（如 `uv venv project`）时用目录名，未提供时用当前目录名；提供 `.` 时无论是否指定路径都用当前目录名。

### `--system-site-packages`

让虚拟环境可以访问系统 site-packages 目录。与 pip 不同：以该选项创建的环境上运行 `uv pip list`、`uv pip install` 等命令时，uv 不会计入系统 site-packages；该选项只影响运行时访问，不改变 uv 命令的行为。

### `--relocatable`

使虚拟环境可迁移，对应环境变量 `UV_VENV_RELOCATABLE`。可迁移环境可在不破坏入口点与激活脚本的前提下移动或分发；仅对标准 `console_scripts` 与 `gui_scripts` 有保证。作为可迁移的代价（写入相对而非绝对路径），入口点与脚本本身不可迁移——复制到环境外将无法运行。

### `--no-relocatable`

不使虚拟环境可迁移；仅在启用 `relocatable-envs-default` 预览特性时用于关闭默认行为。该选项在帮助中隐藏。

### `--link-mode`

格式：`--link-mode <LINK_MODE>`。从全局缓存安装包（这里仅用于安装种子包）时使用的链接方式；macOS 与 Linux 默认 `clone`（写时复制），Windows 默认 `hardlink`。慎用 symlink：清除缓存会使已安装包失效。对应环境变量 `UV_LINK_MODE`。

### `--index`

格式：`--index <INDEX>`。除默认索引外使用的索引（用于安装种子包），接受 PEP 503 兼容仓库或同构布局的本地目录。多个 `--index` 时先传入者优先，且均优先于 `--default-index`。对应环境变量 `UV_INDEX`。

### `--default-index`

格式：`--default-index <DEFAULT_INDEX>`。默认包索引（默认为 PyPI）；优先级低于全部 `--index` 指定的索引。对应环境变量 `UV_DEFAULT_INDEX`。

### `--index-url`

短旗标 `-i`。格式：`--index-url <INDEX_URL>`。已弃用，改用 `--default-index`：包索引 URL，优先级低于 `--extra-index-url`。对应环境变量 `UV_INDEX_URL`。

### `--extra-index-url`

格式：`--extra-index-url <EXTRA_INDEX_URL>`。已弃用，改用 `--index`：除 `--index-url` 外使用的额外索引 URL。对应环境变量 `UV_EXTRA_INDEX_URL`。

### `--find-links`

短旗标 `-f`。格式：`--find-links <FIND_LINKS>`。除索引外搜索候选分发的位置；路径须为顶层存放 `.whl` 或 sdist 的目录，URL 页面须为指向包文件的平面链接列表。对应环境变量 `UV_FIND_LINKS`。

### `--no-index`

忽略注册表索引（如 PyPI），仅依赖直接 URL 依赖与 `--find-links` 提供的来源。

### `--index-strategy`

格式：`--index-strategy <INDEX_STRATEGY>`。多索引解析策略；默认 `first-index`，在包首次出现的索引内限定解析以防依赖混淆攻击。对应环境变量 `UV_INDEX_STRATEGY`。

### `--keyring-provider`

格式：`--keyring-provider <KEYRING_PROVIDER>`。尝试用 `keyring` 为索引 URL 认证；目前仅支持 `subprocess`（通过 `keyring` CLI），默认 `disabled`。对应环境变量 `UV_KEYRING_PROVIDER`。

### `--exclude-newer`

格式：`--exclude-newer <EXCLUDE_NEWER>`。仅考虑给定日期前上传的候选包；接受 RFC 3339 时间戳、同格式本地日期、友好时长（如 `1 week`）或 ISO 8601 时长。对应环境变量 `UV_EXCLUDE_NEWER`。

### `--exclude-newer-package`

格式：`--exclude-newer-package <EXCLUDE_NEWER_PACKAGE>`。特定包的上传日期过滤，格式 `PACKAGE=DATE`；可多次传入。

### `--refresh`

刷新全部缓存数据。

### `--no-refresh`

不刷新缓存数据，`--refresh` 的反义项。该选项在帮助中隐藏。

### `--refresh-package`

格式：`--refresh-package <REFRESH_PACKAGE>`。刷新特定包的缓存数据；可多次传入。

### `--no-seed`

virtualenv 兼容选项：uv 默认就不安装种子包，传入时仅发出警告，无效果。该选项在帮助中隐藏。

### `--no-pip`

virtualenv 兼容选项：uv 默认就不安装 `pip`，传入时仅发出警告，无效果。该选项在帮助中隐藏。

### `--no-setuptools`

virtualenv 兼容选项：uv 默认就不安装 `setuptools`，传入时仅发出警告，无效果。该选项在帮助中隐藏。

### `--no-wheel`

virtualenv 兼容选项：uv 默认就不安装 `wheel`，传入时仅发出警告，无效果。该选项在帮助中隐藏。

## 环境变量

常用映射：`UV_PYTHON`（解释器）、`UV_PROJECT_ENVIRONMENT`（项目内默认环境路径）、`UV_VENV_SEED`（种子包）、`UV_VENV_CLEAR`（清空）、`UV_VENV_RELOCATABLE`（可迁移）、`UV_NO_PROJECT`（不发现项目）、`UV_SYSTEM_PYTHON`、`UV_LINK_MODE`、以及 `UV_INDEX`/`UV_DEFAULT_INDEX`/`UV_INDEX_URL`/`UV_EXTRA_INDEX_URL`/`UV_FIND_LINKS`/`UV_EXCLUDE_NEWER` 等索引与解析相关变量。命令行传入的选项优先于环境变量。

## 差异与兼容性

- 与 virtualenv 不同，uv 默认不向环境安装 `pip`、`setuptools`、`wheel`；需要时显式使用 `--seed`。
- `--no-seed`、`--no-pip`、`--no-setuptools`、`--no-wheel` 仅为兼容 virtualenv 命令行而接受，无效果并发出警告；`--system`/`--no-system` 同为无效果的兼容项。
- `--system-site-packages` 只授予运行时访问；uv 自身的命令不会把系统 site-packages 计入（pip 会）。
- 使用 uv 无需激活虚拟环境；激活脚本仍会正常生成，供其他工具使用。

## 使用提醒

- 目标路径已有虚拟环境时会直接移除并重建；路径非空但不是虚拟环境时，默认报错，需 `--clear`（配合 `--force` 才能移除非虚拟环境目录）。
- 在项目内运行时，uv 会依据 `requires-python` 检查所选解释器；不希望发现项目时用 `--no-project`。
- 需要 `pip` 时用 `--seed`，或改用 [uv pip](cli:command:pip) 接口。

## 示例

在当前目录创建 `.venv`：

```console
$ uv venv
```

指定解释器与路径创建虚拟环境：

```console
$ uv venv -p 3.12 .venv-312
```

创建包含 `pip` 的虚拟环境：

```console
$ uv venv --seed
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令定义于 `Commands::Venv` 与 `VenvArgs`；virtualenv 兼容选项（`--no-seed` 等）定义于 `VenvCompatArgs`，传入无效果项时发出警告（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)、[crates/uv-cli/src/compat.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/compat.rs)）。
