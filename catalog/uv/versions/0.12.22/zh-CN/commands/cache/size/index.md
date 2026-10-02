---
title: uv cache size
command:
  - cache
  - size
---

## 简介

显示缓存大小。

显示缓存目录的总大小，包括全部已下载与已构建的 wheel、源分发物及其他缓存数据。默认在输出到终端时显示人类可读的大小，否则显示原始字节数。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

### `--output-format`

格式：`--output-format <OUTPUT_FORMAT>`。选择输出格式，取值 `auto`、`human` 或 `machine`，默认 `auto`：终端输出人类可读大小，非终端输出原始字节数。

### `--human`

短旗标 `-H`，别名 `--human-readable`。以人类可读格式显示缓存大小（如 `1.2GiB` 而非原始字节数）；与 `--output-format` 互斥。

## 使用提醒

- 计算需要遍历缓存目录，目录很大时可能耗时。
- 需要在脚本中做数值比较时，用 `--output-format machine` 获得原始字节数。
- 缓存过大时可用 [uv cache prune](cli:command:cache/prune) 修剪，或用 [uv cache clean](cli:command:cache/clean) 清空。

## 示例

以人类可读格式显示缓存大小：

```console
$ uv cache size --human
```

输出原始字节数：

```console
$ uv cache size --output-format machine
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令定义于 `CacheCommand::Size`、`SizeArgs` 与 `CacheSizeOutputFormat`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
