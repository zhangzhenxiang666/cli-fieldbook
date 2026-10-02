---
title: uv add
command:
  - add
---

## 简介

向[项目](../../concepts/projects.md)添加依赖，写入 `pyproject.toml`。若某依赖已存在，将更新为其新的版本说明符；若新旧说明符带有不同的环境标记，则会为该依赖新增一条记录。

添加后会更新 lockfile 与项目环境；用 `--frozen` 跳过更新 lockfile，用 `--no-sync` 跳过更新环境。若任一请求的依赖找不到，uv 将报错退出——除非提供 `--frozen`，此时按原文添加依赖而不检查其是否存在或与项目兼容。

uv 会在当前目录及父目录搜索项目；找不到项目时报错退出。

## 参数

### `PACKAGES`

要添加的包，按 PEP 508 需求格式给出（如 `ruff==0.5.0`）；也可传入本地目录或 `pyproject.toml` 路径作为依赖来源。与 `--requirements` 同属"来源"参数组，至少提供其一。

## 选项

### `--help`

短旗标 `-h`。显示当前命令的简明帮助。传入 `--help` 时显示长帮助。

### `--requirements`

短旗标 `-r`。格式：`--requirements <REQUIREMENTS>`。添加给定文件中列出的包，支持 `requirements.txt`、带内联元数据的 `.py` 文件、`pylock.toml`、`pyproject.toml`、`setup.py` 与 `setup.cfg`。别名 `--requirement`。

### `--constraints`

短旗标 `-c`。格式：`--constraints <CONSTRAINTS>`。用给定的需求文件约束版本：约束文件是类似 `requirements.txt` 的文件，只控制安装的需求_版本_，不会写入项目的 `pyproject.toml`，但解析时会被遵守。等价于 pip 的 `--constraint`。别名 `--constraint`；对应环境变量 `UV_CONSTRAINT`。

### `--marker`

短旗标 `-m`。格式：`--marker <MARKER>`。为所有被添加的包应用此环境标记。

### `--dev`

把需求添加到开发依赖组，`--group dev` 的别名。对应环境变量 `UV_DEV`。与 `--optional`、`--group`、`--script` 互斥。

### `--optional`

格式：`--optional <OPTIONAL>`。把需求添加为指定 extra 的可选依赖，之后安装项目时可用 `--extra` 启用该组。要启用被添加依赖自身的 extra，见 `--extra`。与 `--dev`、`--group` 互斥。

### `--group`

格式：`--group <GROUP>`。把需求添加到指定的依赖组；这些需求不会进入项目发布的元数据。与 `--dev`、`--optional`、`--script` 互斥。

### `--editable`

以可编辑方式添加依赖。与 `--no-editable` 互相覆盖。

### `--no-editable`

不以可编辑方式添加需求。对应环境变量 `UV_NO_EDITABLE`。该选项在帮助中隐藏。

### `--no-editable-package`

格式：`--no-editable-package <NO_EDITABLE_PACKAGE>`。不以可编辑方式添加指定的需求。该选项在帮助中隐藏。

### `--raw`

按原样添加依赖（别名 `--raw-sources`）。默认 uv 会把 Git、本地、可编辑与直接 URL 需求的来源信息记录到 `tool.uv.sources`，并按最新兼容版本为依赖添加版本边界（如 `foo>=1.0.0`）；提供 `--raw` 时改为把来源需求直接写入 `project.dependencies`，且不加边界。与 `--editable`、`--rev`、`--tag`、`--branch` 互斥。

### `--bounds`

格式：`--bounds <BOUNDS>`。添加依赖时使用的版本说明符种类：未提供约束或 URL 时，默认按最新兼容版本添加下界（如 `>=1.2.3`）。提供 `--frozen` 时不做解析，依赖总是无约束添加。此选项处于预览阶段，任何未来版本都可能变更。

### `--rev`

格式：`--rev <REV>`。从 Git 添加依赖时使用的提交。与 `--tag`、`--branch` 同组互斥。

### `--tag`

格式：`--tag <TAG>`。从 Git 添加依赖时使用的标签。与 `--rev`、`--branch` 同组互斥。

### `--branch`

格式：`--branch <BRANCH>`。从 Git 添加依赖时使用的分支。与 `--rev`、`--tag` 同组互斥。

### `--lfs`

从 Git 添加依赖时是否使用 Git LFS。

### `--extra`

格式：`--extra <EXTRA>`。为被添加的依赖启用的 extras，可多次传入。要把依赖本身添加进项目的可选 extra，见 `--optional`。

### `--no-sync`

避免同步虚拟环境。对应环境变量 `UV_NO_SYNC`。

### `--locked`

断言 `uv.lock` 保持不变。对应环境变量 `UV_LOCKED`。要求 lockfile 是最新的；若 lockfile 缺失或需要更新，uv 将报错退出。与 `--frozen`、`--upgrade` 互斥。

### `--no-locked`

禁用 locked 模式，覆盖 `UV_LOCKED`。该选项在帮助中隐藏。

### `--frozen`

添加依赖而不重新锁定项目。对应环境变量 `UV_FROZEN`。项目环境不会同步；按原文添加依赖，不检查其是否存在或兼容。与 `--locked`、`--upgrade` 互斥。

### `--no-frozen`

禁用 frozen 模式，覆盖 `UV_FROZEN`。该选项在帮助中隐藏。

### `--active`

优先使用活动虚拟环境而非项目的虚拟环境。若项目虚拟环境正处于活动状态或没有活动环境，此选项无效果。

### `--no-active`

优先使用项目的虚拟环境而非活动环境，这是默认行为。该选项在帮助中隐藏。

### `--package`

格式：`--package <PACKAGE>`。把依赖添加到 workspace 中的特定包。

### `--script`

格式：`--script <SCRIPT>`。把依赖添加到指定的 Python 脚本而非项目：写入其 PEP 723 内联元数据表（不存在时创建）。经 [uv run](cli:command:run) 执行时，uv 会为脚本创建安装了全部内联依赖的临时环境。与 `--dev`、`--optional`、`--package`、`--workspace` 互斥。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。用于解析与同步的 Python 解释器，请求格式见 [uv python](cli:command:python)。对应环境变量 `UV_PYTHON`。

### `--workspace`

把依赖作为 workspace 成员添加：与路径依赖配合使用时，把该包加入根 `pyproject.toml` 的 `members` 列表。默认 workspace 目录内的路径依赖即按成员处理。

### `--no-workspace`

不把依赖作为 workspace 成员添加：默认 workspace 目录内的本地路径依赖会作为成员添加，传此选项则改为直接路径依赖。

### `--no-install-project`

不安装当前项目。对应环境变量 `UV_NO_INSTALL_PROJECT`。默认项目与其全部依赖一起安装；此选项排除项目本身但保留其依赖，适合 Docker 构建等分层缓存场景。与 `--frozen`、`--no-sync`、`--only-install-project` 互斥。

### `--only-install-project`

只安装当前项目，排除全部依赖。与 `--no-install-project` 互斥。该选项在帮助中隐藏。

### `--no-install-workspace`

不安装任何 workspace 成员（包括当前项目）。对应环境变量 `UV_NO_INSTALL_WORKSPACE`。成员的依赖仍会安装，适合分层缓存；与 `--only-install-workspace` 互斥。

### `--only-install-workspace`

只安装 workspace 成员（包括当前项目），排除其他依赖。与 `--no-install-workspace` 互斥。该选项在帮助中隐藏。

### `--no-install-local`

不安装本地路径依赖。对应环境变量 `UV_NO_INSTALL_LOCAL`。跳过当前项目、workspace 成员及其他本地（路径或可编辑）包，只安装远程/索引依赖；适合 Docker 构建中先缓存重型第三方依赖。与 `--only-install-local` 互斥。

### `--only-install-local`

只安装本地路径依赖，排除全部远程依赖。与 `--no-install-local` 互斥。该选项在帮助中隐藏。

### `--no-install-package`

格式：`--no-install-package <NO_INSTALL_PACKAGE>`。不安装指定的包。注意这可能导致环境损坏，应谨慎使用；与 `--only-install-package` 互斥。

### `--only-install-package`

格式：`--only-install-package <ONLY_INSTALL_PACKAGE>`。只安装指定的包，排除其他所有包。与 `--no-install-package` 互斥。该选项在帮助中隐藏。

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

安装后将 Python 文件编译为字节码。默认不编译（`.pyc` 在首次导入时惰性生成）；对启动时间敏感的场景（CLI 应用、Docker 容器）可用更长的安装时间换取更快的启动。别名 `--compile`。对应环境变量 `UV_COMPILE_BYTECODE`。

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

本命令的多数选项有对应的环境变量：`UV_CONSTRAINT`、`UV_DEV`、`UV_NO_SYNC`、`UV_LOCKED`、`UV_FROZEN`、`UV_PYTHON`、`UV_NO_EDITABLE`、`UV_NO_INSTALL_PROJECT`、`UV_NO_INSTALL_WORKSPACE`、`UV_NO_INSTALL_LOCAL`、`UV_INDEX`、`UV_DEFAULT_INDEX`、`UV_INDEX_URL`、`UV_EXTRA_INDEX_URL`、`UV_FIND_LINKS`、`UV_INDEX_STRATEGY`、`UV_KEYRING_PROVIDER`、`UV_RESOLUTION`、`UV_PRERELEASE`、`UV_FORK_STRATEGY`、`UV_EXCLUDE_NEWER`、`UV_NO_BUILD_ISOLATION`、`UV_LINK_MODE`、`UV_COMPILE_BYTECODE`、`UV_NO_SOURCES`、`UV_NO_BUILD`、`UV_NO_BINARY` 等。

## 使用提醒

- `uv add` 同时改三处：`pyproject.toml`、`uv.lock` 与项目环境；`--frozen` 与 `--no-sync` 分别跳过后两步。
- 在 workspace 中，默认向根项目添加依赖；用 `--package` 定位到具体成员。
- 用 `--script` 时改写的是脚本的 PEP 723 内联元数据表，与项目依赖互不影响。
- 与 [uv pip install](cli:command:pip/install) 不同，`uv add` 管理的是项目声明而非仅当前环境。

## 示例

添加带版本约束的依赖：

```console
$ uv add "flask>=3.0"
```

以开发依赖组形式添加，并使用特定 Git 引用：

```console
$ uv add --dev git+https://github.com/psf/requests --tag v2.32.3
```

为脚本添加内联依赖：

```console
$ uv add --script example.py rich
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义于 `ProjectCommand::Add` 与 `AddArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；索引、解析器、构建与刷新类选项来自 `IndexArgs`、`ResolverInstallerArgs`、`BuildOptionsArgs`、`RefreshArgs` 等共享参数组。

## 差异与兼容性

`--constraints` 与 pip 的 `--constraint`（`-c`）语义一致。`--index-url` 与 `--extra-index-url` 为兼容 pip 的旧拼写，已弃用，建议分别改用 `--default-index` 与 `--index`。
