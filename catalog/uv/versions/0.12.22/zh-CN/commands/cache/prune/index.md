---
title: uv cache prune
command:
  - cache
  - prune
---

## 简介

修剪悬空的缓存条目与缓存环境。

移除缓存中不再被引用的条目，以及为构建等用途创建的一次性缓存环境。提供 `--ci` 时，改为面向持续集成环境优化缓存：移除直接下载的预构建 wheel，但保留从源码构建的 wheel（构建代价高，保留更划算）。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

### `--ci`

面向持续集成环境（如 GitHub Actions）优化缓存的持久化。默认同时缓存直接下载的预构建 wheel 与从源码构建的 wheel；在 CI 中，省略预构建 wheel、每次运行重新下载通常更快，而从源码构建的 wheel（尤其是含扩展模块的包）构建代价高，应保留。

### `--force`

强制移除缓存，忽略使用中检查。默认命令会阻塞等待，直到没有进程在读取缓存；使用 `--force` 时不加锁直接执行。

## 使用提醒

- `prune` 是选择性清理，不像 [uv cache clean](cli:command:cache/clean) 那样清空全部条目。
- 在 CI 中保存缓存前运行 `uv cache prune --ci` 可减小缓存体积。
- 默认会等待其他 uv 进程释放缓存锁；确信无并发使用时才用 `--force`。

## 示例

修剪本地缓存中的悬空条目：

```console
$ uv cache prune
```

在 CI 中保存缓存前修剪预构建 wheel：

```console
$ uv cache prune --ci
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令定义于 `CacheCommand::Prune` 与 `PruneArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
