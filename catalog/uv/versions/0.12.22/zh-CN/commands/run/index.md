---
title: uv run
command:
  - run
---

## 简介

运行命令或脚本，并确保其在合适的 Python 环境中执行。在[项目](../../concepts/projects.md)中，uv 会先创建并按 lockfile 同步项目环境，再执行命令；在项目外，则使用当前目录或父目录中发现的虚拟[环境](../../concepts/environments.md)，否则使用所发现解释器的环境。

以 `.py` 结尾的路径或 HTTP(S) URL 会按脚本处理（`uv run file.py` 等价于 `uv run python file.py`），URL 会先临时下载；含 PEP 723 内联依赖元数据的脚本会在隔离的临时环境中安装依赖后运行，传入 `-` 时从 stdin 读取并按脚本处理。

uv 的选项必须放在命令之前（如 `uv run --verbose foo`），可用 `--` 显式分隔命令与 uv 选项。

## 参数

### `ARGS`

要运行的命令及其参数。若命令是 `.py` 脚本路径，则由 Python 解释器执行；跟在命令之后的参数不再被解析为 uv 的选项。

## 选项

### `--help`

短旗标 `-h`。显示当前命令的简明帮助。传入 `--help` 时显示长帮助。

### `--extra`

格式：`--extra <EXTRA>`。包含指定 extra 的可选依赖，可多次传入或用逗号分隔。仅在项目中可用；与 `--all-extras` 互斥。

### `--all-extras`

包含全部可选依赖。与 `--extra` 互斥。仅在项目中可用。

### `--no-extra`

格式：`--no-extra <NO_EXTRA>`。在启用了 `--all-extras` 的情况下排除指定的可选依赖，可多次传入。

### `--no-all-extras`

不包含任何可选依赖，`--all-extras` 的反义项。该选项在帮助中隐藏。

### `--module`

短旗标 `-m`。将命令作为 Python 模块运行，等价于 `python -m <module>`。与 `--script`、`--gui-script` 互斥。

### `--editable`

将本以非可编辑方式安装的依赖（包括项目与任何 workspace 成员）以可编辑方式安装。该选项在帮助中隐藏。

### `--no-editable`

将可编辑依赖（包括项目与任何 workspace 成员）以非可编辑方式安装。对应环境变量 `UV_NO_EDITABLE`。

### `--no-editable-package`

格式：`--no-editable-package <NO_EDITABLE_PACKAGE>`。将指定的可编辑包以非可编辑方式安装，可用空格分隔多个包。

### `--inexact`

不移除环境中的多余包。默认 `uv run` 只做满足需求的最小变更；该选项是 `--exact` 的反义项（别名 `--no-exact`），在帮助中隐藏。

### `--exact`

执行精确同步，移除环境中的多余包。默认 `uv run` 仅做满足需求的最小变更，不会移除多余包。

### `--env-file`

格式：`--env-file <ENV_FILE>`。从 `.env` 文件加载环境变量，可多次传入，后续文件中的值覆盖先前文件。对应环境变量 `UV_ENV_FILE`。

### `--no-env-file`

不从 `.env` 文件读取环境变量。对应环境变量 `UV_NO_ENV_FILE`。

### `--with`

短旗标 `-w`。格式：`--with <WITH>`。在附带指定包的环境中运行命令，可用逗号分隔多个需求。在项目中使用时，这些依赖会层叠到项目环境之上的独立临时环境中，允许与项目声明的依赖冲突。

### `--with-editable`

格式：`--with-editable <WITH_EDITABLE>`。以可编辑方式安装给定路径并附带运行，其余语义同 `--with`。

### `--with-requirements`

格式：`--with-requirements <WITH_REQUIREMENTS>`。附带给定文件中列出的包，支持 `requirements.txt`、带内联元数据的 `.py` 文件与 `pylock.toml`，可用逗号分隔多次传入；其余语义同 `--with`。不允许使用 `pyproject.toml`、`setup.py` 或 `setup.cfg`。

### `--isolated`

在隔离的虚拟环境中运行命令。对应环境变量 `UV_ISOLATED`。通常会复用项目环境以提升性能；此选项强制为项目使用全新环境，严格要求依赖与需求声明隔离（项目仍以可编辑方式安装）。与 `--with` 等配合时，额外依赖仍会层叠到第二个环境中。

### `--active`

优先使用活动虚拟环境而非项目的虚拟环境。若项目虚拟环境正处于活动状态或没有活动环境，此选项无效果。

### `--no-active`

优先使用项目的虚拟环境而非活动环境，这是默认行为。该选项在帮助中隐藏。

### `--no-sync`

不同步虚拟环境。对应环境变量 `UV_NO_SYNC`。隐含 `--frozen`：项目依赖被忽略，lockfile 不会更新（环境无论如何都不会同步）。

### `--locked`

断言 `uv.lock` 保持不变。对应环境变量 `UV_LOCKED`。要求 lockfile 是最新的；若 lockfile 缺失或需要更新，uv 将报错退出。与 `--frozen`、`--upgrade` 互斥。

### `--no-locked`

禁用 locked 模式，覆盖 `UV_LOCKED`。该选项在帮助中隐藏。

### `--frozen`

在不更新 `uv.lock` 的情况下运行。对应环境变量 `UV_FROZEN`。不检查 lockfile 是否最新，而是以 lockfile 中的版本为准；lockfile 缺失时报错退出，`pyproject.toml` 中尚未写入 lockfile 的依赖变更不会出现在环境中。与 `--locked`、`--upgrade` 互斥。

### `--no-frozen`

禁用 frozen 模式，覆盖 `UV_FROZEN`。该选项在帮助中隐藏。

### `--script`

短旗标 `-s`。将给定路径作为 Python 脚本运行：无论扩展名如何，都尝试按 PEP 723 脚本解析。与 `--module`、`--gui-script` 互斥。

### `--gui-script`

将给定路径作为 Python GUI 脚本运行：按 PEP 723 解析并用 `pythonw.exe` 执行，无论扩展名如何。仅 Windows 可用；与 `--script`、`--module` 互斥。

### `--all-packages`

在安装了全部 workspace 成员的环境中运行命令：workspace 环境（`.venv`）会更新为包含全部成员，通过 `--extra`、`--group` 等指定的 extras 与依赖组会应用到所有成员。与 `--package` 互斥。

### `--package`

格式：`--package <PACKAGE>`。在 workspace 中特定包的环境中运行命令。成员不存在时 uv 报错退出；与 `--all-packages` 互斥。

### `--no-project`

避免发现项目或 workspace。对应环境变量 `UV_NO_PROJECT`。不搜索当前目录及父目录中的项目，而是在由 `--with` 需求填充的隔离临时环境中运行；若存在活动虚拟环境或在当前/父目录中发现虚拟环境，则视为没有项目而直接使用该环境。别名 `--no-workspace`；与 `--package` 互斥。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。指定运行环境使用的 Python 解释器；若所发现的环境满足解释器请求，则直接使用该环境。请求格式见 [uv python](cli:command:python)。对应环境变量 `UV_PYTHON`。

### `--show-resolution`

在环境发生变更时显示解析器与安装器输出。对应环境变量 `UV_SHOW_RESOLUTION`。默认省略这些输出，`--verbose` 下启用。该选项在帮助中隐藏。

### `--max-recursion-depth`

格式：`--max-recursion-depth <MAX_RECURSION_DEPTH>`。允许 `uv run` 递归调用的次数上限，达到上限时 uv 报错退出。当前递归深度通过环境变量跟踪，清除环境变量会使 uv 无法检测递归深度。该选项在帮助中隐藏；对应环境变量 `UV_RUN_MAX_RECURSION_DEPTH`。

### `--python-platform`

格式：`--python-platform <PYTHON_PLATFORM>`。以目标三元组（如 `x86_64-unknown-linux-gnu` 或 `aarch64-apple-darwin`）指定安装依赖所面向的平台。macOS 默认最低版本 `13.0`（可用 `MACOSX_DEPLOYMENT_TARGET` 调整），iOS 默认 `13.0`（`IPHONEOS_DEPLOYMENT_TARGET`），Android 默认 API 级别 24（`ANDROID_API_LEVEL`）。警告：选定的 wheel 面向目标平台，可能与当前平台不兼容；从源码构建的分发则面向当前平台构建。此选项面向高级用例。

### `--dev`

包含开发依赖组，`--group dev` 的别名。对应环境变量 `UV_DEV`。仅在项目中可用。该选项在帮助中隐藏。

### `--no-dev`

禁用开发依赖组，`--no-group dev` 的别名；要改为禁用全部默认组见 `--no-default-groups`。对应环境变量 `UV_NO_DEV`。仅在项目中可用。

### `--only-dev`

仅包含开发依赖组，省略项目及其依赖；`--only-group dev` 的别名，隐含 `--no-default-groups`。

### `--group`

格式：`--group <GROUP>`。包含指定依赖组的依赖，可多次传入。仅在项目中可用。

### `--no-group`

格式：`--no-group <NO_GROUP>`。禁用指定的依赖组，可多次传入（可用空格分隔）；总是优先于默认组、`--all-groups` 与 `--group`。对应环境变量 `UV_NO_GROUP`。

### `--no-default-groups`

忽略默认依赖组（`tool.uv.default-groups` 中定义的组）；仍可用 `--group` 包含特定组。对应环境变量 `UV_NO_DEFAULT_GROUPS`。

### `--only-group`

格式：`--only-group <ONLY_GROUP>`。仅包含指定依赖组的依赖，省略项目及其依赖；可多次传入，隐含 `--no-default-groups`。

### `--all-groups`

包含全部依赖组的依赖；可用 `--no-group` 排除特定组。

### `--index`

格式：`--index <INDEX>`。在默认索引之外使用的索引，接受 PEP 503 兼容仓库或同构布局的本地目录。多个 `--index` 时先传入者优先，且全部优先于 `--default-index`（默认 PyPI）；可用 `./`、`../`（Unix）区分相对路径与索引名。对应环境变量 `UV_INDEX`。

### `--default-index`

格式：`--default-index <DEFAULT_INDEX>`。默认包索引（默认 `https://pypi.org/simple`），接受 PEP 503 兼容仓库或本地目录；优先级低于所有 `--index`。对应环境变量 `UV_DEFAULT_INDEX`。

### `--index-url`

短旗标 `-i`。格式：`--index-url <INDEX_URL>`。已弃用，改用 `--default-index`。包索引 URL，接受 PEP 503 兼容仓库或本地目录，优先级低于 `--extra-index-url`。对应环境变量 `UV_INDEX_URL`。

### `--extra-index-url`

格式：`--extra-index-url <EXTRA_INDEX_URL>`。已弃用，改用 `--index`。在 `--index-url` 之外使用的额外索引 URL；多次传入时先传入者优先。对应环境变量 `UV_EXTRA_INDEX_URL`。

### `--find-links`

短旗标 `-f`。格式：`--find-links <FIND_LINKS>`。除索引外用于查找候选分发的位置：若为路径，须为顶层含 wheel（`.whl`）或源码分发（如 `.tar.gz`、`.zip`）的目录；若为 URL，页面须为指向这些文件的平面链接列表。对应环境变量 `UV_FIND_LINKS`。

### `--no-index`

忽略注册表索引（如 PyPI），仅依赖直接 URL 依赖与 `--find-links` 提供的来源。

### `--upgrade`

短旗标 `-U`。允许包升级，忽略现有 lockfile 中的固定版本，隐含 `--refresh`。与 `--locked`、`--frozen` 互斥。

### `--no-upgrade`

禁用升级，`--upgrade` 的反义项。该选项在帮助中隐藏。

### `--upgrade-package`

短旗标 `-P`。格式：`--upgrade-package <UPGRADE_PACKAGE>`。允许升级指定包，忽略 lockfile 中的固定版本，隐含 `--refresh-package`；可多次传入。

### `--upgrade-group`

格式：`--upgrade-group <UPGRADE_GROUP>`。允许升级某个依赖组中的全部包，忽略 lockfile 中的固定版本；可多次传入。

### `--reinstall`

重装全部包，无论是否已安装，隐含 `--refresh`。别名 `--force-reinstall`。

### `--no-reinstall`

不重装包，`--reinstall` 的反义项。该选项在帮助中隐藏。

### `--reinstall-package`

格式：`--reinstall-package <REINSTALL_PACKAGE>`。重装指定的包，隐含 `--refresh-package`；可多次传入。

### `--index-strategy`

格式：`--index-strategy <INDEX_STRATEGY>`。多索引解析策略，默认 `first-index`：在包可用的第一个索引处停止并仅在该索引内解析，以防"依赖混淆"攻击。对应环境变量 `UV_INDEX_STRATEGY`。

### `--keyring-provider`

格式：`--keyring-provider <KEYRING_PROVIDER>`。尝试用 `keyring` 为索引 URL 做认证；目前仅支持 `subprocess`（通过 `keyring` CLI 处理认证），默认 `disabled`。对应环境变量 `UV_KEYRING_PROVIDER`。

### `--resolution`

格式：`--resolution <RESOLUTION>`。在包需求的多个兼容版本间选择的策略，默认 `highest`（每个包的最新兼容版本）。对应环境变量 `UV_RESOLUTION`。

### `--prerelease`

格式：`--prerelease <PRERELEASE>`。预发布版本的考量策略，默认 `if-necessary`：优先稳定候选，仅在所有满足约束的稳定候选都被拒绝后才回退到预发布。对应环境变量 `UV_PRERELEASE`。

### `--prerelease-package`

格式：`--prerelease-package <PRERELEASE_PACKAGE>`。为特定包设置预发布策略，接受 `PACKAGE=MODE` 对（`MODE` 为 `--prerelease` 接受的任意值），可多次传入。

### `--pre`

允许预发布版本的兼容旗标。该选项在帮助中隐藏。

### `--fork-strategy`

格式：`--fork-strategy <FORK_STRATEGY>`。跨 Python 版本与平台为同一包选择多个版本的策略：默认为每个受支持的 Python 版本选择各包的最新版本，同时尽量减少跨平台的版本数量；`fewest` 则优先选择覆盖面更广的旧版本以最小化每个包的版本数。对应环境变量 `UV_FORK_STRATEGY`。

### `--config-setting`

短旗标 `-C`。格式：`--config-setting <CONFIG_SETTING>`。传给 PEP 517 构建后端的设置，以 `KEY=VALUE` 对给出，可多次传入。别名 `--config-settings`。

### `--config-settings-package`

格式：`--config-settings-package <CONFIG_SETTINGS_PACKAGE>`。为特定包传给 PEP 517 构建后端的设置，以 `PACKAGE:KEY=VALUE` 对给出，可多次传入。

### `--no-build-isolation`

构建源码分发时禁用隔离，假定 PEP 518 声明的构建依赖已安装。对应环境变量 `UV_NO_BUILD_ISOLATION`。

### `--build-isolation`

启用构建隔离，`--no-build-isolation` 的反义项。该选项在帮助中隐藏。

### `--no-build-isolation-package`

格式：`--no-build-isolation-package <NO_BUILD_ISOLATION_PACKAGE>`。为特定包禁用构建隔离，假定其 PEP 518 构建依赖已安装。

### `--exclude-newer`

格式：`--exclude-newer <EXCLUDE_NEWER>`。仅考虑给定日期之前上传的候选包；比较的是每个分发文件上传到索引的时间，而非版本的发布日期。接受 RFC 3339 时间戳（如 `2006-12-02T02:07:43Z`）、同格式本地日期、"友好"时长（如 `1 week`）或 ISO 8601 时长（如 `P7D`）；用 `false` 禁用。对应环境变量 `UV_EXCLUDE_NEWER`。

### `--exclude-newer-package`

格式：`--exclude-newer-package <EXCLUDE_NEWER_PACKAGE>`。为特定包设置上传日期上限，以 `PACKAGE=DATE` 对给出，日期格式同 `--exclude-newer`，可多次传入。

### `--link-mode`

格式：`--link-mode <LINK_MODE>`。从全局缓存安装包的链接方式，默认在 macOS 与 Linux 为 `clone`（写时复制）、在 Windows 为 `hardlink`。不鼓励 `symlink`：它使缓存与环境强耦合，清理缓存（`uv cache clean`）会因删除底层文件而破坏已安装的包。对应环境变量 `UV_LINK_MODE`。

### `--compile-bytecode`

安装后将 Python 文件编译为字节码。默认不编译（`.pyc` 在首次导入时惰性生成）；对启动时间敏感的场景（CLI 应用、Docker 容器）可用更长的安装时间换取更快的启动。执行同步类命令时会处理整个 site-packages 目录，包括未修改的包。别名 `--compile`。对应环境变量 `UV_COMPILE_BYTECODE`。

### `--no-compile-bytecode`

不编译字节码，`--compile-bytecode` 的反义项。该选项在帮助中隐藏。

### `--no-sources`

解析依赖时忽略 `tool.uv.sources` 表，用于按符合标准、可发布的包元数据解析，而不使用 workspace、Git、URL 或本地路径来源。对应环境变量 `UV_NO_SOURCES`。

### `--no-sources-package`

格式：`--no-sources-package <NO_SOURCES_PACKAGE>`。不为指定包使用 `tool.uv.sources` 表中的来源，可用空格分隔多个包。

### `--no-build`

不构建源码分发。启用时复用此前构建的缓存 wheel，需要构建 sdist 的操作将报错退出；workspace 内的第一方包仍会构建；可编辑需求仍会构建，且其构建后端可能执行任意 Python 代码。对应环境变量 `UV_NO_BUILD`。

### `--build`

允许构建源码分发，`--no-build` 的反义项。该选项在帮助中隐藏。

### `--no-build-package`

格式：`--no-build-package <NO_BUILD_PACKAGE>`。不为指定的包构建源码分发；第一方包（如 workspace 中的项目）仍会构建。对应环境变量 `UV_NO_BUILD_PACKAGE`。

### `--no-binary`

不安装预构建 wheel：给定的全部包将构建源码后安装；解析器仍会使用预构建 wheel 提取包元数据（若可用）。对应环境变量 `UV_NO_BINARY`。

### `--binary`

安装预构建 wheel，`--no-binary` 的反义项。该选项在帮助中隐藏。

### `--no-binary-package`

格式：`--no-binary-package <NO_BINARY_PACKAGE>`。不为指定的包安装预构建 wheel。对应环境变量 `UV_NO_BINARY_PACKAGE`。

### `--refresh`

刷新全部缓存数据。

### `--no-refresh`

不刷新缓存数据，`--refresh` 的反义项。该选项在帮助中隐藏。

### `--refresh-package`

格式：`--refresh-package <REFRESH_PACKAGE>`。刷新指定包的缓存数据；可多次传入。

## 环境变量

本命令的多数选项有对应的环境变量：`UV_NO_SYNC`、`UV_LOCKED`、`UV_FROZEN`、`UV_ISOLATED`、`UV_NO_PROJECT`、`UV_PYTHON`、`UV_ENV_FILE`、`UV_NO_ENV_FILE`、`UV_NO_EDITABLE`、`UV_DEV`、`UV_NO_DEV`、`UV_NO_GROUP`、`UV_NO_DEFAULT_GROUPS`、`UV_INDEX`、`UV_DEFAULT_INDEX`、`UV_INDEX_URL`、`UV_EXTRA_INDEX_URL`、`UV_FIND_LINKS`、`UV_INDEX_STRATEGY`、`UV_KEYRING_PROVIDER`、`UV_RESOLUTION`、`UV_PRERELEASE`、`UV_FORK_STRATEGY`、`UV_EXCLUDE_NEWER`、`UV_NO_BUILD_ISOLATION`、`UV_LINK_MODE`、`UV_COMPILE_BYTECODE`、`UV_NO_SOURCES`、`UV_NO_BUILD`、`UV_NO_BINARY`、`UV_SHOW_RESOLUTION`、`UV_RUN_MAX_RECURSION_DEPTH` 等。

## 使用提醒

- 在项目中，`uv run` 默认会先更新 lockfile 并同步环境（除非 `--locked`、`--frozen` 或 `--no-sync`），随后才执行命令。
- 与 [uv tool run](cli:command:tool/run) 不同，`uv run` 面向项目环境中的命令与脚本；临时安装并运行工具请用后者。
- 运行 PEP 723 脚本时从脚本所在目录发现项目或 workspace；其他情况从当前工作目录发现。
- 用 `uv pip install` 手动装进环境的包不会被 `uv run` 的精确同步（`--exact`）保留为项目依赖。

## 示例

在项目环境中运行入口脚本：

```console
$ uv run python main.py
```

以隔离层叠的额外依赖运行命令（允许与项目依赖冲突）：

```console
$ uv run --with rich -- python -c "import rich"
```

按 PEP 723 脚本执行文件并附带详细输出：

```console
$ uv run --verbose --script example.py
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义于 `ProjectCommand::Run` 与 `RunArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；索引、解析器、构建与刷新类选项分别来自 `IndexArgs`、`ResolverInstallerArgs`、`BuildOptionsArgs`、`RefreshArgs` 等共享参数组。
