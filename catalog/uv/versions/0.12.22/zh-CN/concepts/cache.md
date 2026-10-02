---
title: 缓存
uses:
  - command:cache
  - command:cache/clean
  - command:cache/prune
  - command:cache/dir
  - command:cache/size
---

uv 用激进的缓存避免重复下载与重复构建曾经访问过的依赖，这是它安装速度的主要来源之一。缓存是全局的：跨项目、跨命令共享，安装时通过链接（而非复制）把缓存中的文件接入目标环境。本文说明缓存的位置、链接方式与清理手段。

## 缓存什么、按什么键

不同类型的依赖有不同的缓存键语义：

- 索引依赖（如来自 PyPI 的包）：遵循 HTTP 缓存头。
- 直接 URL 依赖：遵循 HTTP 缓存头，并额外按 URL 本身缓存。
- Git 依赖：按完全解析后的 commit 哈希缓存，因此锁定时 Git 依赖会固定到具体 commit。
- 本地依赖：按源文件（`.whl`、`.tar.gz`）的修改时间缓存；目录则按 `pyproject.toml`、`setup.py` 或 `setup.cfg` 的修改时间。
- flat 索引（`--find-links` 位置）：假定内容不可变、按文件名缓存——同名文件换了内容不会被察觉，直到刷新缓存。

对本地目录依赖（如可编辑安装），uv 默认只在这些清单文件变化、或 `src` 目录增删时重建重装；这是个启发式，可能比期望装得少。需要更多失效信号时，可在 `tool.uv.cache-keys` 里追加缓存键（文件、glob、Git commit、环境变量、目录增删），注意自定义会替换默认键，必要的清单文件要自己列回；`tool.uv.reinstall-package` 则是"每次都重建重装"的最后手段。命令行显式传入的本地目录依赖（如 `uv pip install .`）总是重建重装。

## 缓存目录

缓存目录按以下顺序决定：

1. `--no-cache` 时使用一次性临时目录，进程退出即丢弃；
2. `--cache-dir` 选项、`UV_CACHE_DIR` 环境变量或 `tool.uv.cache-dir` 设置指定的目录；
3. 系统默认目录：Unix 上 `$XDG_CACHE_HOME/uv` 或 `$HOME/.cache/uv`，Windows 上 `%LOCALAPPDATA%\uv\cache`。

uv 始终需要缓存目录——`--no-cache` 并不是"无缓存运行"，而是"用临时缓存运行"，同一次调用内部仍会共享数据。多数场景下 `--refresh` 更合适：不读缓存但会把结果写回缓存，供后续使用。位置上有一个性能要求：缓存目录应与目标 Python 环境在同一文件系统，否则无法链接文件、只能退回缓慢的复制。[uv cache dir](cli:command:cache/dir) 显示当前目录，[uv cache size](cli:command:cache/size) 显示大小。

## 链接模式：clone 与 hardlink

安装时把缓存文件接入环境的方式由 `link-mode` 控制：默认在 macOS 与 Linux 上是 `clone`（写时复制），在 Windows 上是 `hardlink`。symlink 模式虽存在但不推荐——它使缓存与环境紧耦合，例如 [uv cache clean](cli:command:cache/clean) 会因删除底层源文件而破坏所有已安装的包。

## clean、prune 与 CI 策略

两个清理命令职责不同：

- [uv cache clean](cli:command:cache/clean) 彻底清空缓存，或带包名参数只清特定包的条目（如 `uv cache clean ruff`）。
- [uv cache prune](cli:command:cache/prune) 只移除无用条目与集中化的项目环境（后者会按需重建），适合定期运行保持缓存整洁。例如旧版本 uv 遗留的条目可以被安全移除。

持续集成中有专门的策略：`uv cache prune --ci` 移除所有预构建 wheel 与解包的 sdist，但保留从源码构建的 wheel——预构建 wheel 重新下载通常比缓存更快，而源码构建昂贵、值得保留。官方建议在 CI 任务末尾运行它以获得最佳缓存效率。

清理类命令默认会阻塞等待其他 uv 进程结束（避免与正在读取缓存的进程冲突），等待默认有 5 分钟超时（可用 `UV_LOCK_TIMEOUT` 调整），确信无并发时可用 `--force` 跳过锁。清理时会估计可回收的磁盘空间；`cache-physical-space` 预览特性提供考虑硬链接与写时复制克隆的更准确估计。

## 缓存失效的逃生口

怀疑缓存导致问题时，有几档力度的工具：

- `uv cache clean <package>`：清掉单个包的缓存。
- `--refresh`（任意命令，如 `uv sync --refresh`）：强制重新校验所有依赖的缓存数据。
- `--refresh-package <package>`：只针对单个依赖。
- `--reinstall`（安装类命令）：忽略已安装的版本重新安装（可先清该包缓存）。

## 并发安全与版本化

多个 uv 命令可以并发运行，即使操作同一个虚拟环境：缓存设计为线程安全且只追加，可承受多读者多写者；安装时 uv 对目标环境加文件锁避免跨进程并发修改。相应地，直接修改缓存（如手动删文件或目录）永远不安全。

缓存由多个按内容分类的桶组成（wheel 桶、sdist 桶、Git 仓库桶等），每个桶独立版本化：版本不兼容时 uv 不读写该桶。因此多个 uv 版本可以安全共用一个缓存目录，代价是版本变更前后可能出现重复条目。
