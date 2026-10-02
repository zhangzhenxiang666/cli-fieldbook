---
title: uv clean
command:
  - clean
---

## 简介

清除缓存，移除全部条目或与指定包关联的条目（隐藏入口）。

该命令在帮助中隐藏，与公开的 [uv cache clean](cli:command:cache/clean) 共用同一参数集，行为完全一致：未提供包名时清空整个缓存，提供包名时仅移除与这些包关联的缓存条目。二者可互换使用，推荐使用 `uv cache clean`。

## 参数

### `PACKAGE`

格式：`[PACKAGE]...`。要从缓存中移除的包，可多次传入；缺省时清除整个缓存。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

### `--force`

强制移除缓存，忽略使用中检查。默认命令会阻塞等待，直到没有进程在读取缓存；使用 `--force` 时不加锁直接执行，可能与其他正在运行的 uv 命令冲突。

## 使用提醒

- 危险操作：不带参数执行会清空整个缓存，后续命令需要重新下载与构建。
- 该命令在帮助中隐藏，脚本中应优先使用 `uv cache clean`，以便与文档一致。

## 示例

清空整个缓存：

```console
$ uv clean
```

只清除 `ruff` 的缓存条目：

```console
$ uv clean ruff
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令定义于 `Commands::Clean`（隐藏入口）与 `CleanArgs`，与 `CacheCommand::Clean` 共用参数（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
