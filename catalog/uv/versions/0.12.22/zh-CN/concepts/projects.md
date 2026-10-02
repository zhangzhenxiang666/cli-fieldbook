---
title: 项目与依赖声明
uses:
  - command:init
  - command:add
  - command:remove
  - command:run
  - command:lock
  - command:sync
---

项目（project）是 uv 面向多文件 Python 开发的组织单位：以 `pyproject.toml` 为根标志，把依赖声明、lockfile、项目环境（`.venv`）和 Python 版本固定收拢到同一个目录树下。本文说明依赖写在哪里、开发依赖如何分组，以及 workspace 如何把多个包当作一个整体管理。

## 项目是什么

uv 以 `pyproject.toml` 识别项目根目录；没有这个文件，目录就只是普通代码目录。项目元数据遵循打包标准：最少需要 `name` 与 `version`，通常还有 `requires-python`、依赖列表和构建后端声明。

[uv init](cli:command:init) 创建新项目，默认生成应用模板，`--lib` 生成库模板。自 v0.12 起两种模板默认都声明构建系统并将源码放进 `src/<项目名>/` 目录；`--no-package` 或 `--bare` 可以省略构建系统与脚手架。是否声明构建系统决定项目本身会不会被安装进环境：没有构建系统的项目不会被安装，只是其依赖被安装。

项目环境与 lockfile 的机制见[环境](environments.md)与[lockfile 与解析](lockfile.md)。

## 依赖声明的四个位置

依赖在 `pyproject.toml` 中分布在四个字段，职责不同：

- `project.dependencies`：发布的运行依赖，随包发布到索引，使用 PEP 508 依赖说明符语法，可带 extras 与环境标记（如 `jax; sys_platform == 'linux'`）。
- `project.optional-dependencies`：发布的可选依赖（"extras"），以 `package[<extra>]` 语法请求。
- `dependency-groups`：本地开发用的依赖组（PEP 735），不会随包发布。
- `tool.uv.sources`：开发期间为依赖指定替代来源，只被 uv 识别。

`project.dependencies` 与 `project.optional-dependencies` 即使不发布也可以使用；`dependency-groups` 是较新的标准，其他工具未必支持。

修改依赖有两种途径：用 [uv add](cli:command:add) 与 [uv remove](cli:command:remove)（支持 `--dev`、`--group`、`--optional` 选择目标字段），或直接编辑 `pyproject.toml`——两者等价，uv 在下次锁定时会重新读取声明。`uv add` 默认写入带上界的约束（可用 `--bounds` 调整），从 Git、路径等非索引来源添加时会同步写入 `tool.uv.sources` 条目。

## 开发依赖与依赖组

开发依赖不进入 `[project]` 表，而是写在 `[dependency-groups]`。`uv add --dev pytest` 会创建或追加 `dev` 组。`dev` 组被特殊对待：默认随 [uv sync](cli:command:sync) 与 [uv run](cli:command:run) 同步，并有 `--dev` / `--only-dev` / `--no-dev` 快捷开关；它们分别等价于 `--group dev`、`--only-group dev`、`--no-group dev`。

其他组用 `uv add --group lint ruff` 之类创建，可用 `--all-groups`、`--no-default-groups`、`--group`、`--only-group`、`--no-group` 控制同步范围；排除总是优先于包含。默认同步哪些组由 `tool.uv.default-groups` 设置决定（可列组名，也可写 `"all"`）。

依赖组有几条约束需要知道：

- 所有依赖组必须彼此兼容，uv 锁定时一起解析；除非在 `tool.uv.conflicts` 中显式声明冲突，让 uv 分开解析（声明冲突后，这些组不能同时安装）。
- 组可以嵌套：`{include-group = "lint"}` 会引入另一个组的依赖，被引入的依赖不能与组内声明冲突。
- 组默认必须落在项目的 `requires-python` 范围内；需要不同范围时可在 `[tool.uv.dependency-groups]` 里为组单独声明 `requires-python`。

历史上 uv 曾用 `tool.uv.dev-dependencies` 声明开发依赖，该字段的内容会与 `dependency-groups.dev` 合并，未来将弃用。

## 依赖源：tool.uv.sources

`tool.uv.sources` 为标准依赖表补充开发期的替代来源，覆盖标准未覆盖的模式（可编辑安装、相对路径等）。支持的源类型有五种：

- 索引：把包固定到某个命名索引，如 `torch = { index = "pytorch" }`（配合 `[[tool.uv.index]]` 声明，`explicit = true` 表示仅服务显式指定的包）。
- Git：`{ git = "...", tag = "..." }`，也支持 `branch`、`rev`、`subdirectory` 与 LFS 开关。
- URL：直接指向 wheel 或 sdist。
- 路径：本地 wheel、sdist 或项目目录，可加 `editable = true` 请求可编辑安装。
- workspace 成员：`{ workspace = true }`，见下节。

源可以用环境标记限定平台（`marker = "sys_platform == 'darwin'"`），也可以为一个依赖提供多个用标记区分的源。需要注意两点边界：sources 只被 uv 识别，换用其他工具时要按其格式重新声明；发布前建议用 `uv build --no-sources` 验证禁用 sources 后仍能构建。`--no-sources` 会让 uv 忽略这张表，同时也不再发现能满足依赖的 workspace 成员。

## workspace：把多个包当一个整体

workspace 借自 Cargo 的概念：受一起管理的一个或多个包（workspace 成员）。在某个 `pyproject.toml` 中加入 `tool.uv.workspace` 表即隐式创建以该包为根的 workspace；`members`（必填）与 `exclude`（可选）接受 glob 列表，每个被包含的目录必须有自己的 `pyproject.toml`，根自身也是一个成员。在已有包内运行 `uv init` 会默认把新成员加入 workspace。

workspace 的关键语义是共享：整个 workspace 使用单个 `uv.lock`，[uv lock](cli:command:lock) 一次作用于全部成员；[uv run](cli:command:run) 与 [uv sync](cli:command:sync) 默认作用于 workspace 根，可用 `--package` 从任意目录指定某个成员。成员间依赖通过 `tool.uv.sources` 的 `{ workspace = true }` 声明，且总是可编辑安装；根的 sources 定义默认适用于所有成员，除非成员在自己的表中覆盖同一依赖。workspace 还强制单一的 `requires-python`（各成员取交集）。

workspace 适合互相连接的多个包在单仓库中协同开发、复用公共依赖；不适合成员需求冲突或需要各自独立虚拟环境的场景——后者应改用路径依赖把各包保持为独立项目。
