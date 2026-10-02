---
title: uv cache clean
command:
  - cache
  - clean
---

## 简介

清除缓存，移除全部条目或与指定包关联的条目。

未提供包名时清空整个缓存目录；提供包名时仅移除与这些包关联的缓存条目（例如 `uv cache clean ruff` 只清除 `ruff` 的缓存）。清除后，后续安装会重新下载或重新构建对应内容。本命令另有别名 `clear`，以及行为相同的隐藏顶层入口 [uv clean](cli:command:clean)。

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

- 危险操作：不带参数执行会清空整个缓存，后续命令需要重新下载与构建，耗时明显。
- 默认会等待其他 uv 进程释放缓存锁；确信无并发使用时才用 `--force`。
- 只想强制重新验证数据时，可优先用任意命令的 `--refresh` 或 `--refresh-package`，代价更小。

## 示例

清空整个缓存：

```console
$ uv cache clean
```

只清除 `ruff` 的缓存条目：

```console
$ uv cache clean ruff
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令定义于 `CacheCommand::Clean` 与 `CleanArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
