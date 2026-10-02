---
title: 工具
uses:
  - command:tool
  - command:tool/run
  - command:tool/uvx
  - command:tool/install
  - command:tool/upgrade
  - command:tool/list
  - command:tool/uninstall
  - command:tool/update-shell
  - command:tool/dir
---

工具（tool）指提供命令行界面的 Python 包：ruff、black 这类"装来就是为了敲命令"的程序。uv 为它们准备了一套独立于项目之外的管理接口——[uv tool](cli:command:tool)，核心区分是"执行"与"安装"两种使用方式。

## 两个入口：执行与安装

[uv tool run](cli:command:tool/run) 不安装就能运行工具：依赖被装进一个临时虚拟环境，与当前项目隔离；默认包名与命令名相同，不同包或复杂版本用 `--from` 指定。[uvx](cli:command:tool/uvx) 是它的完全等价的别名。不带命令运行时列出已安装的工具。

[uv tool install](cli:command:tool/install) 把工具装进隔离的工具环境并把可执行文件暴露到 `PATH` 上，供 shell 与其他程序长期使用。多数场景下用 `uvx` 执行更合适；需要系统层面的可发现性（不受你控制的脚本要用它、Docker 镜像要提供它）时才安装。

## 工具环境

两种入口对应两种生命周期：

- `uvx` 的环境存放在 uv 缓存目录中，被视为一次性资产——[清缓存](cache.md)（`uv cache clean`）会把它删掉；删除后下次运行自动重建。缓存只是为了降低重复调用的开销。
- `uv tool install` 的环境存放在 uv 工具目录（Unix 上如 `$HOME/.local/share/uv/tools`，可用 `UV_TOOL_DIR` 覆盖；[uv tool dir](cli:command:tool/dir) 查看），直到 [uv tool uninstall](cli:command:tool/uninstall) 才移除；环境被手动删除后工具将无法运行。

两种环境都不应被直接修改（例如用 pip 往里装东西）。每个工具环境绑定一个 Python 版本：发现逻辑与其他 uv 虚拟环境相同，但会忽略 `.python-version` 与 `requires-python` 这类非全局请求，可用 `--python` 显式指定；绑定的 Python 被卸载会直接破坏工具环境。

## 版本选择与升级

请求工具版本用 `{package}@{version}`（如 `uvx ruff@0.6.0`）与 `{package}@latest`。`uvx` 首次调用使用最新版本，之后沿用缓存版本——新版本发布不会自动生效，除非显式请求不同版本、`@latest`、缓存被清理或刷新。工具一经 `uv tool install` 安装，`uvx` 默认改用已安装版本；`--isolated` 可以忽略已安装版本运行（且不刷新缓存）。

[uv tool upgrade](cli:command:tool/upgrade)（别名 `update`）升级工具环境，遵守安装时给出的版本约束与设置：`uv tool install "black>=23,<24"` 后升级只会升到该范围内最新；要突破约束就重新 `uv tool install "black>=24"`。升级总会重装可执行文件（即使没变），需要连包一起重装时用 `--reinstall` / `--reinstall-package`。

运行与安装时都可以附加额外的包：`--with`（可重复、支持版本约束、简写 `-w`）把包作为依赖加入；请求的版本与工具需求冲突时解析失败报错。`--with-executables-from` 更进一步，把附加包的可执行文件也装进同一环境——适合 ansible 与 ansible-core 这类协作的命令组；`--with` 只加依赖不装其可执行文件。

## 可执行目录与 PATH

工具的可执行文件包括包提供的全部控制台入口、脚本入口与二进制脚本（依赖包的可执行文件不包括在内），在 Unix 上被符号链接进可执行目录（[uv tool dir](cli:command:tool/dir) 加 `--bin` 查看），Windows 上则是复制。该目录必须在 `PATH` 中，否则工具无法从 shell 调用且会有警告；[uv tool update-shell](cli:command:tool/update-shell) 可以把它写进常见 shell 配置。若配置里已有添加语句但目录不在 `PATH`，该命令会报错而不是重复添加。

安装不会覆盖不是 uv 装的可执行文件：例如 pipx 装过同名工具时 `uv tool install` 会失败，`--force` 可覆盖这一保护。[uv tool list](cli:command:tool/list)（别名 `ls`）列出已安装工具。

## 与 uv run 的关系

`uvx <name>` 几乎等价于 `uv run --no-project --with <name> -- <name>`，差别在于：包名从命令名推断、无需 `--with`；临时环境缓存在专门位置；无需 `--no-project`——工具总是与项目隔离运行；工具已安装时 `uvx` 用已安装版本而 `uv run` 不会。反过来说，当命令不应该与项目隔离时——比如项目的测试与类型检查（`pytest`、`mypy`）——应该用 `uv run` 而不是工具接口。
