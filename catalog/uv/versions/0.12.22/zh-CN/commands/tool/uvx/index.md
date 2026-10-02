---
title: uv tool uvx
command:
  - tool
  - uvx
---

## 简介

`uv tool run` 的隐藏别名，作为 `uvx` 命令入口的实现细节存在。

uv 发行版附带的 `uvx` 可执行文件转发到本入口（源码中 `display_name` 为 `uvx`，usage 显示为 `uvx [OPTIONS] [COMMAND]`），行为与 [uv tool run](cli:command:tool/run) 完全一致：临时运行 Python 包提供的命令，选项、参数与语义均相同，详见该页。`uvx -V`（或 `uvx --version`）显示 uvx 版本。该命令在帮助中隐藏。

## 选项

### `--help`

短旗标 `-h`。显示简明帮助；传入 `--help` 时显示长帮助。

其余选项即 `uv tool run` 的选项（工具运行选项在本入口下同样可用），释义见 [uv tool run](cli:command:tool/run)。

## 使用提醒

- 本命令为隐藏入口，不在帮助中显示；日常直接使用 `uvx` 或 `uv tool run`。
- 页面构建协议只登记了 `--help`，其余选项请以上述命令页为准。

## 示例

经该入口临时运行工具，与 `uvx ruff check`、`uv tool run ruff check` 等价：

```console
$ uv tool uvx ruff check src
```

以上示例为说明性内容，未实际运行。

## 源码补充

入口定义于 `ToolCommand::Uvx`/`UvxArgs`（内部展开 `ToolRunArgs`，[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
