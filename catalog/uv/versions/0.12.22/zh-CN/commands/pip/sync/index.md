---
title: uv pip sync
command:
  - pip
  - sync
---

## 简介

用 `requirements.txt` 或 `pylock.toml` 同步环境。

`uv pip sync` 让环境精确匹配给定文件：安装缺失的包，并**移除任何未列出的包**；要保留无关包请改用 [uv pip install](cli:command:pip/install)。输入文件被假定为 [uv pip compile](cli:command:pip/compile) 或 [uv export](cli:command:export) 的产物，即已包含全部传递依赖——文件中不存在的传递依赖不会被安装，可用 `--strict` 在缺失传递依赖时告警。默认需要 venv；该子命令对应 pip-tools 的 `pip-sync`，兼容参数的差异见下文"差异与兼容性"。

## 参数

### `src_file`

格式：`<SRC_FILE>...`，必需。要同步的源文件，可多个。支持 `requirements.txt`、带内联元数据的 `.py` 文件、`pylock.toml`、`pyproject.toml`、`setup.py`、`setup.cfg`；提供 `pyproject.toml`、`setup.py` 或 `setup.cfg` 时，uv 会提取对应项目的依赖。传入 `-` 时从 stdin 读取。与 `--group` 可组合使用。

## 选项

### `--help`

短旗标 `-h`。显示 `uv pip sync` 的帮助。

### `--constraints`

短旗标 `-c`。格式：`--constraints <CONSTRAINTS>`。用给定 requirements 文件约束版本：只限制需求安装到的版本，把包列进约束文件并不会触发它的安装。等价 pip 的 `--constraint` 选项，别名 `--constraint`，可多次传入。对应环境变量 `UV_CONSTRAINT`。

### `--build-constraints`

短旗标 `-b`。格式：`--build-constraints <BUILD_CONSTRAINTS>`。构建 sdist 时用给定 requirements 文件约束构建依赖，语义同 `--constraints`。别名 `--build-constraint`；对应环境变量 `UV_BUILD_CONSTRAINT`。

### `--extra`

格式：`--extra <EXTRA>`。包含指定 extra 名称的可选依赖，可多次传入；仅作用于 `pylock.toml`、`pyproject.toml`、`setup.py`、`setup.cfg` 源。与 `--all-extras` 互斥。

### `--all-extras`

包含全部可选依赖；仅作用于 `pylock.toml`、`pyproject.toml`、`setup.py`、`setup.cfg` 源。与 `--extra` 互斥。

### `--no-all-extras`

`--all-extras` 的反义项，二者互相覆盖。该选项在帮助中隐藏。

### `--group`

格式：`--group <GROUP>`。安装 `pylock.toml` 或 `pyproject.toml` 中指定的依赖组；未提供路径时使用工作目录中的 `pylock.toml` 或 `pyproject.toml`。可多次传入，也可与 `src_file` 组合。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。安装包所用的 Python 解释器。默认同步要求在 venv 中进行；可以改为指向其他 Python，但仅建议在 CI 环境这样做并须谨慎使用，因为这可能修改系统 Python 安装。对应环境变量 `UV_PYTHON`。

### `--system`

安装到系统 Python 环境。默认安装到当前目录或父目录中的 venv；`--system` 指示 uv 改用系统 `PATH` 中找到的第一个 Python。该选项面向 CI 环境，可能修改系统 Python 安装，须谨慎使用。对应环境变量 `UV_SYSTEM_PYTHON`。

### `--no-system`

`--system` 的反义项。该选项在帮助中隐藏。

### `--break-system-packages`

允许 uv 修改标记为 `EXTERNALLY-MANAGED` 的 Python 安装。面向在 CI 中安装由外部包管理器（如 `apt`）管理的 Python 的场景；这类安装明确不建议被其他包管理器修改，须谨慎使用。对应环境变量 `UV_BREAK_SYSTEM_PACKAGES`。

### `--no-break-system-packages`

`--break-system-packages` 的反义项，二者互相覆盖。

### `--target`

短旗标 `-t`。格式：`--target <TARGET>`。把包安装到指定目录的顶层，而不是 venv 或系统 Python 环境。与其他安装操作不同，此时不需要发现已有的 Python 环境，只搜索一个用于解析的解释器；找不到合适解释器时 uv 会下载一个，可用 `--no-python-downloads` 禁用。与 `--prefix` 互斥。

### `--prefix`

格式：`--prefix <PREFIX>`。把包安装到指定目录下的 `lib`、`bin` 等顶层子目录，如同该位置存在一个 venv。一般建议改用 `--python` 安装到备选环境：经 `--prefix` 安装的脚本等产物会引用执行安装的解释器，而非 `--prefix` 目录中的解释器，可移植性差。此时不需要发现已有环境，找不到解析用解释器时 uv 会下载一个。与 `--target` 互斥。

### `--no-build`

不构建 sdist。启用后复用此前构建 sdist 得到的缓存 wheel，但需要构建 sdist 的操作会报错退出；editable 需求仍可能被构建，其构建后端可能执行任意 Python 代码。等价于 `--only-binary :all:`，与 `--no-binary`、`--only-binary` 互斥。

### `--build`

`--no-build` 的反义项。该选项在帮助中隐藏。

### `--no-binary`

格式：`--no-binary <NO_BINARY>`。不安装预构建 wheel，给定包将从源码构建并安装；解析器仍会用预构建 wheel 提取包元数据（如果可用）。可多次传入；`:all:` 对全部包生效，`:none:` 清空此前的设置。与 `--no-build` 互斥。

### `--only-binary`

格式：`--only-binary <ONLY_BINARY>`。只用预构建 wheel、不构建 sdist。启用后复用缓存 wheel，需要为给定包构建 sdist 时报错退出；editable 需求仍可能被构建，其构建后端可能执行任意 Python 代码。`:all:`、`:none:` 语义同 `--no-binary`。与 `--no-build` 互斥。

### `--allow-empty-requirements`

允许同步空的 requirements 文件，这会清空环境中的全部包。默认空文件会被拒绝，以防误操作。

### `--no-allow-empty-requirements`

`--allow-empty-requirements` 的反义项，二者互相覆盖。

### `--python-version`

格式：`--python-version <PYTHON_VERSION>`。requirements 须支持的最低 Python 版本，如 `3.7` 或 `3.7.9`；省略补丁版本号时按最低补丁处理（`3.7` 视为 `3.7.0`）。

### `--python-platform`

格式：`--python-platform <PYTHON_PLATFORM>`。安装面向的平台，用 target triple 表示，如 `x86_64-unknown-linux-gnu` 或 `aarch64-apple-darwin`。macOS（Darwin）与 iOS 默认最低版本 `13.0`（可用 `MACOSX_DEPLOYMENT_TARGET`、`IPHONEOS_DEPLOYMENT_TARGET` 指定其他值），Android 默认最低 API 级别 `24`（可用 `ANDROID_API_LEVEL` 指定）。警告：启用后选择的 wheel 只保证兼容目标平台，可能与当前平台不兼容；从源码构建的分发则为当前平台构建、可能与目标平台不兼容。该选项面向高级场景。

### `--strict`

安装完成后校验 Python 环境，检测缺失依赖或其他问题的包。

### `--no-strict`

`--strict` 的反义项。该选项在帮助中隐藏。

### `--dry-run`

试运行：不实际安装任何内容，只解析依赖并打印将执行的计划。

### `--check`

不修改环境，检查环境是否与 requirements 匹配。解析并报告需要的变更，需要变更时以退出码 1 结束。与 `--dry-run` 互斥。

### `--output-format`

格式：`--output-format <OUTPUT_FORMAT>`。选择输出格式，取值 `text` 或 `json`，默认 `text`。JSON 写入 stdout，诊断信息写入 stderr；JSON schema 为实验性内容，可能无预告变化。

### `--torch-backend`

格式：`--torch-backend <TORCH_BACKEND>`。获取 PyTorch 生态包所用的后端，如 `cpu`、`cu126` 或 `auto`。设置后对这些包忽略已配置的索引 URL，改用对应的 PyTorch 索引；`auto` 依据当前安装的 CUDA 驱动自动选择。预览特性，可能随版本变化。对应环境变量 `UV_TORCH_BACKEND`。

### `--index`

格式：`--index <INDEX>`。除默认索引外使用的索引，接受 PEP 503（simple repository API）兼容的仓库或同构布局的本地目录。多个 `--index` 先传入者优先，且均优先于 `--default-index` 指定的索引。对应环境变量 `UV_INDEX`。

### `--default-index`

格式：`--default-index <DEFAULT_INDEX>`。默认包索引，默认 https://pypi.org/simple 。接受 PEP 503 兼容仓库或同构布局的本地目录，优先级低于全部 `--index`。对应环境变量 `UV_DEFAULT_INDEX`。

### `--index-url`

短旗标 `-i`。格式：`--index-url <INDEX_URL>`。已弃用，改用 `--default-index`。包索引 URL，接受 PEP 503 兼容仓库或同构本地目录，优先级低于全部 `--extra-index-url`。对应环境变量 `UV_INDEX_URL`。

### `--extra-index-url`

格式：`--extra-index-url <EXTRA_INDEX_URL>`。已弃用，改用 `--index`。在 `--index-url` 之外使用的额外索引 URL，接受 PEP 503 兼容仓库或同构本地目录；多个时先传入者优先。对应环境变量 `UV_EXTRA_INDEX_URL`。

### `--find-links`

短旗标 `-f`。格式：`--find-links <FIND_LINKS>`。除注册表索引外查找候选分发的位置：为路径时须是顶层存放 wheel（`.whl`）或 sdist（如 `.tar.gz`、`.zip`）的目录；为 URL 时页面须是符合上述格式的平面链接列表。对应环境变量 `UV_FIND_LINKS`。

### `--no-index`

忽略注册表索引（如 PyPI），仅依赖直接 URL 依赖与 `--find-links` 提供的来源。

### `--reinstall`

重装全部包，无论是否已安装。隐含 `--refresh`。别名 `--force-reinstall`。

### `--no-reinstall`

`--reinstall` 的反义项。该选项在帮助中隐藏。

### `--reinstall-package`

格式：`--reinstall-package <REINSTALL_PACKAGE>`。重装指定包，无论是否已安装。隐含 `--refresh-package`，可多次传入。

### `--index-strategy`

格式：`--index-strategy <INDEX_STRATEGY>`。多索引解析策略，默认 `first-index`：对每个包按索引顺序搜索并在首个包含它的索引处停止，以防"依赖混淆"攻击；可改选 `unsafe-first-match` 或 pip 风格的 `unsafe-best-match`。对应环境变量 `UV_INDEX_STRATEGY`。

### `--keyring-provider`

格式：`--keyring-provider <KEYRING_PROVIDER>`。尝试用 `keyring` 为索引 URL 提供认证；当前仅支持 `subprocess`，即调用 `keyring` CLI。默认 `disabled`。对应环境变量 `UV_KEYRING_PROVIDER`。

### `--config-setting`

短旗标 `-C`。格式：`--config-setting <CONFIG_SETTING>`。传给 PEP 517 构建后端的 `KEY=VALUE` 设置，可多次传入。别名 `--config-settings`。

### `--config-settings-package`

格式：`--config-settings-package <CONFIG_SETTINGS_PACKAGE>`。对特定包传给构建后端的设置，形如 `PACKAGE:KEY=VALUE`，可多次传入。

### `--no-build-isolation`

构建 sdist 时禁用隔离，假定 PEP 518 声明的构建依赖已安装。对应环境变量 `UV_NO_BUILD_ISOLATION`。

### `--build-isolation`

`--no-build-isolation` 的反义项。该选项在帮助中隐藏。

### `--exclude-newer`

格式：`--exclude-newer <EXCLUDE_NEWER>`。只考虑给定时间之前上传的候选包；比较对象是每个分发文件上传到索引的时间，而非包版本的发布日期。接受 RFC 3339 时间戳（如 `2006-12-02T02:07:43Z`）、同格式本地日期、友好时长（如 `24 hours`、`30 days`）或 ISO 8601 时长（如 `PT24H`、`P7D`），传 `false` 可禁用。对应环境变量 `UV_EXCLUDE_NEWER`。

### `--exclude-newer-package`

格式：`--exclude-newer-package <EXCLUDE_NEWER_PACKAGE>`。对特定包限制候选上传时间，接受 `PACKAGE=DATE` 对，日期格式同 `--exclude-newer`；可多次传入。

### `--link-mode`

格式：`--link-mode <LINK_MODE>`。从全局缓存安装包使用的链接方式，默认 macOS 与 Linux 为 `clone`（写时复制）、Windows 为 `hardlink`。慎用 symlink：它使缓存与目标环境强耦合，清理缓存（`uv cache clean`）会破坏已安装的包。对应环境变量 `UV_LINK_MODE`。

### `--compile-bytecode`

安装后把 Python 文件编译为字节码（`__pycache__/*.pyc`）。默认不编译、首次导入时惰性编译；对启动时间敏感的场景（CLI 应用、Docker 容器）可用更长的安装时间换取更快的启动。别名 `--compile`。对应环境变量 `UV_COMPILE_BYTECODE`。

### `--no-compile-bytecode`

`--compile-bytecode` 的反义项。别名 `--no-compile`。该选项在帮助中隐藏。

### `--no-sources`

解析时忽略 `tool.uv.sources` 表，按符合标准、可发布的包元数据处理，而不使用 workspace、Git、URL 或本地路径来源。对应环境变量 `UV_NO_SOURCES`。

### `--no-sources-package`

格式：`--no-sources-package <NO_SOURCES_PACKAGE>`。对指定包不使用 `tool.uv.sources` 表中的来源，可多次传入。

### `--refresh`

刷新全部缓存数据。

### `--no-refresh`

`--refresh` 的反义项。该选项在帮助中隐藏。

### `--refresh-package`

格式：`--refresh-package <REFRESH_PACKAGE>`。只刷新指定包的缓存数据，可多次传入。

### `--require-hashes`

要求每个 requirement 都有匹配的哈希。默认校验 requirements 文件中已有的哈希，但不要求所有需求都带哈希；启用后所有需求必须带哈希，且必须精确固定版本（如 `==1.0.0`）或使用直接 URL。此模式额外限制：不支持 Git 依赖、editable 安装，以及指向目录的本地依赖（须指向具体 wheel 或 `.zip`、`.tar.gz` 等源码归档）。对应环境变量 `UV_REQUIRE_HASHES`。

### `--no-require-hashes`

`--require-hashes` 的反义项。该选项在帮助中隐藏。

### `--verify-hashes`

`--no-verify-hashes` 的反义项，即默认行为。该选项在帮助中隐藏。

### `--no-verify-hashes`

禁用 requirements 文件中的哈希校验。默认校验已有哈希但不强制存在；要强制哈希校验请改用 `--require-hashes`。对应环境变量 `UV_NO_VERIFY_HASHES`。

### `--ask`

短旗标 `-a`。pip-sync 兼容选项：不支持，传入时 uv 直接报错（uv 从不请求确认）。该选项在帮助中隐藏。

### `--python-executable`

格式：`--python-executable <PYTHON_EXECUTABLE>`。pip-sync 兼容选项：不支持，传入报错；要安装到其他 Python 环境，可改设 `VIRTUAL_ENV`。该选项在帮助中隐藏。

### `--user`

pip-sync 兼容选项：不支持，传入报错；请改用 venv。该选项在帮助中隐藏。

### `--client-cert`

格式：`--client-cert <CLIENT_CERT>`。pip-sync 兼容选项：不支持，传入报错（uv 不支持专用客户端证书）。该选项在帮助中隐藏。

### `--config`

格式：`--config <CONFIG>`。pip-sync 兼容选项：不支持，传入报错（uv 不使用 pip-sync 的配置文件）。该选项在帮助中隐藏。

### `--pip-args`

格式：`--pip-args <PIP_ARGS>`。pip-sync 兼容选项：不支持，传入报错；请把参数直接传给 uv。该选项在帮助中隐藏。

## 环境变量

常用映射：`UV_PYTHON`、`UV_SYSTEM_PYTHON`、`UV_BREAK_SYSTEM_PACKAGES`、`UV_CONSTRAINT`、`UV_BUILD_CONSTRAINT`、`UV_INDEX`、`UV_DEFAULT_INDEX`、`UV_INDEX_URL`、`UV_EXTRA_INDEX_URL`、`UV_FIND_LINKS`、`UV_INDEX_STRATEGY`、`UV_KEYRING_PROVIDER`、`UV_NO_BUILD_ISOLATION`、`UV_EXCLUDE_NEWER`、`UV_LINK_MODE`、`UV_COMPILE_BYTECODE`、`UV_NO_SOURCES`、`UV_REQUIRE_HASHES`、`UV_NO_VERIFY_HASHES`、`UV_TORCH_BACKEND`。

## 差异与兼容性

- 危险语义与 pip 不同：`uv pip sync` 会卸载环境中未列出的包；pip 自身没有对应的 sync 命令。
- 为兼容 `pip-sync` 保留的选项均为隐藏选项：`-a/--ask`、`--python-executable`、`--user`、`--client-cert`、`--config`、`--pip-args` 全部不受支持，传入即报错（uv 从不请求确认、不复用 pip-sync 的配置与参数透传机制）。
- uv 不读取 `pip-sync` 的配置文件与 `PIP_*` 环境变量。接口整体差异另见 [pip 接口](../../../concepts/pip-interface.md)。

## 使用提醒

- 同步是破坏性操作：任何未在输入文件中列出的包都会被移除；空 requirements 默认被拒绝，传入 `--allow-empty-requirements` 后会清空整个环境。
- 输入文件应包含全部传递依赖（通常是 [uv pip compile](cli:command:pip/compile) 或 [uv export](cli:command:export) 的输出）；传递依赖缺失时可用 `--strict` 得到告警。
- 默认要求在 venv 中运行；`--system`、`--break-system-packages`、非 venv 的 `--python` 都可能修改系统 Python，主要面向 CI，须谨慎使用。

## 示例

把环境同步为锁定清单的精确状态：

```console
$ uv pip sync requirements.txt
```

先检查环境是否满足 requirements、不做任何修改：

```console
$ uv pip sync --check requirements.txt
```

以上示例为说明性内容，未实际运行。

## 源码补充

参数定义于 `PipSyncArgs`，共享选项见 `IndexArgs`、`InstallerArgs`、`RefreshArgs`、`HashCheckingArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；pip-sync 兼容选项及报错语义见 `PipSyncCompatArgs`（[crates/uv-cli/src/compat.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/compat.rs)）。
