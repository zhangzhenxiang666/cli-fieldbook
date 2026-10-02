---
title: uv cache dir
command:
  - cache
  - dir
---

## 简介

显示缓存目录。

打印当前生效的缓存目录路径。默认在 Unix 上为 `$XDG_CACHE_HOME/uv` 或 `$HOME/.cache/uv`，在 Windows 上为 `%LOCALAPPDATA%\uv\cache`；可通过 `cache-dir` 设置、全局 `--cache-dir` 选项或 `UV_CACHE_DIR` 环境变量改换。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

## 使用提醒

- 使用 `--no-cache` 时，缓存位于临时目录中，进程退出后丢弃；本命令仍会打印该临时位置。
- 缓存目录与 uv 操作的 Python 环境位于同一文件系统时性能最好。
- 只想了解占用空间时配合 [uv cache size](cli:command:cache/size) 使用。

## 示例

显示缓存目录：

```console
$ uv cache dir
```

配合全局选项查看自定义缓存目录：

```console
$ uv cache dir --cache-dir /tmp/uv-cache
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令定义于 `CacheCommand::Dir`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
