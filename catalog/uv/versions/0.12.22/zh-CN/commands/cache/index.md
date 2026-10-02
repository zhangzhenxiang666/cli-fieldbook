---
title: uv cache
command:
  - cache
---

## 简介

管理 uv 的缓存。

uv 用激进的缓存避免重复下载与重新构建依赖：注册表依赖遵循 HTTP 缓存头，Git 依赖按解析后的 commit 缓存，本地目录依赖按清单文件修改时间缓存。`uv cache` 命令组用于查看缓存位置与大小，并执行清理与修剪。缓存语义的详细说明另见[缓存](../../concepts/cache.md)。

子命令：

- [uv cache clean](cli:command:cache/clean)：清除缓存，移除全部条目或与指定包关联的条目。
- [uv cache prune](cli:command:cache/prune)：修剪悬空的缓存条目与缓存环境。
- [uv cache dir](cli:command:cache/dir)：显示缓存目录。
- [uv cache size](cli:command:cache/size)：显示缓存大小。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

## 使用提醒

- 缓存目录默认在 Unix 上为 `$XDG_CACHE_HOME/uv` 或 `$HOME/.cache/uv`，在 Windows 上为 `%LOCALAPPDATA%\uv\cache`；可用 `cache-dir` 设置、全局 `--cache-dir` 选项或 `UV_CACHE_DIR` 环境变量改换。
- 缓存目录与 uv 操作的 Python 环境位于同一文件系统时性能最好。
- 使用 `--no-cache` 时，缓存写入临时目录并在进程退出后丢弃。

## 示例

查看缓存目录与大小：

```console
$ uv cache dir
$ uv cache size
```

清除特定包的缓存条目：

```console
$ uv cache clean ruff
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令组定义于 `Commands::Cache`、`CacheNamespace` 与 `CacheCommand`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；缓存语义说明见官方文档（[docs/concepts/cache.md](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/docs/concepts/cache.md)）。
