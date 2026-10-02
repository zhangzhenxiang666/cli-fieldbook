---
title: 环境
uses:
  - command:sync
  - command:run
  - command:venv
  - command:export
---

uv 在项目旁边维护一个持久的项目环境：位于 `pyproject.toml` 旁的 `.venv` 虚拟环境。项目及其依赖安装在其中，编辑器也因此能找到解释器来提供补全与类型提示。本文说明这个环境的默认行为、与 sync 的关系，以及如何覆盖它的位置。

## 项目环境是什么

使用项目时，uv 按需创建虚拟环境：个别命令会使用临时环境（如 `uv run --isolated`），而日常开发依赖的是 `.venv` 里这个持久环境。它默认放在项目内部是为了让编辑器容易发现；uv 会在其中写入内部 `.gitignore`，使其自动被 git 排除——原则上不建议把 `.venv` 提交到版本控制。

环境的内容由 [lockfile](lockfile.md) 决定：`uv.lock` 记录精确版本，环境是把其中一部分包安装出来的结果。

## 免激活的使用方式

使用 uv 不需要激活虚拟环境。uv 会自动发现工作目录或任意父目录中的 `.venv` 并使用它，因此通常直接：

```sh
# 未实测：依据该版本文档快照编写的示例
uv run python -c "import example"
```

[uv run](cli:command:run) 会在执行命令前确保项目环境存在且最新（必要时先锁定、再同步），然后在环境内运行给定命令。命令可以来自项目环境（项目提供的入口命令），也可以是外部命令（如运行依赖项目的 shell 脚本）。传统激活方式（`source .venv/bin/activate`）依然可用，但不是必需。

## 环境与 sync 的关系

同步（sync）指把 lockfile 中的一个子集安装进项目环境。它通常是自动的——`uv run` 运行前会同步，读取 lockfile 的命令也会先更新它；[uv sync](cli:command:sync) 则用于显式同步，例如让编辑器拿到正确版本的依赖。

同步语义上有几个值得记住的默认值：

- `uv sync` 默认做"精确"同步：移除 lockfile 之外的多余包；`--inexact` 保留它们。`uv run` 恰好相反，默认"不精确"（确保需要的包装好但不移除多余的），`--exact` 切换为精确。
- 项目（及其他 workspace 成员）以可编辑方式安装，改代码不需要重新同步；`--no-editable` 可退出。未声明构建系统的项目本身不会被安装。
- extras 默认不同步（`--extra` / `--all-extras` 选择）；`dev` 依赖组默认同步（`--no-dev`、`--group` 等控制，详见[项目与依赖声明](projects.md)）。
- 分层安装场景（如 Docker 镜像层缓存）可用 `--no-install-project`、`--no-install-workspace`、`--no-install-package` 分步安装；被跳过的目标的依赖仍会安装，误用可能造成缺依赖的坏环境。

需要与其他工具集成时，可用 [uv export](cli:command:export) 把 lockfile 导出为 `requirements.txt` 等格式。

## 覆盖默认环境路径

默认的 `.venv` 位置可以改变：在项目中，`UV_PROJECT_ENVIRONMENT` 环境变量指定项目环境的路径。注意这个变量只在从项目根目录运行时生效；[uv venv](cli:command:venv) 不带参数创建环境时同样遵循它。

如果完全不希望 uv 托管项目环境，可在 `pyproject.toml` 中设置 `tool.uv.managed = false`，禁用自动锁定与同步。

## 集中化项目环境（预览）

`centralized-project-envs` 预览特性把默认项目环境改存到 uv 缓存目录中，并尝试在项目里维护一个指向缓存环境的 `.venv` 链接，使既有的激活与编辑器工作流继续使用惯常路径。链接创建失败时，uv 会尝试把缓存环境路径写入 `.venv`；两者都失败则继续使用缓存环境，但依赖 `.venv` 路径的工具可能发现不了它。切换解释器会选用不同的缓存环境并可在之后复用。

该特性有几条边界：显式指定的环境路径（包括 `UV_PROJECT_ENVIRONMENT` 与 `--active` 选择的环境）不会被集中化；`--no-cache` 启用时特性无效；它也影响从项目或 workspace 根发起的无路径 [uv venv](cli:command:venv) 调用。预览特性可能变化，采用前先核对当前版本行为。

## 边界：不要手动改动项目环境

项目环境被视为 uv 托管的状态，不建议手动修改——例如用 `uv pip install` 直接往里装包。项目依赖应该用 `uv add` 声明；一次性的需求用 `uvx` 或 `uv run --with` 更合适。手工改动会与"精确同步"的预期冲突，多余的包在下一次 `uv sync` 中被移除。
