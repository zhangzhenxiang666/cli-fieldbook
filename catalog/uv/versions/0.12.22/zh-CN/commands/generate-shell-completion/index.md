---
title: uv generate-shell-completion
command:
  - generate-shell-completion
---

## 简介

生成 shell 补全（隐藏入口）。

为指定的 shell 生成 uv 的补全脚本并输出到 stdout，通常由 shell 配置文件重定向使用。该命令在帮助中隐藏，另有别名 `--generate-shell-completion`。

除 `--help` 外，下列选项都是为隐藏本命令不支持的全局选项而做的本地重定义，在帮助中不显示，对补全生成没有效果。

## 参数

### `SHELL`

格式：`<SHELL>`。要为其生成补全脚本的 shell（如 `bash`、`zsh`、`fish` 等 clap 补全支持的 shell）。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

### `--no-cache`

短旗标 `-n`。全局选项的隐藏重定义：避免读写缓存。本命令不支持，无效果。

### `--cache-dir`

格式：`--cache-dir <CACHE_DIR>`。全局选项的隐藏重定义：缓存目录路径。本命令不支持，无效果。

### `--python-preference`

格式：`--python-preference <PYTHON_PREFERENCE>`。全局选项的隐藏重定义：系统 Python 与受管理 Python 的优先级。本命令不支持，无效果。

### `--no-python-downloads`

全局选项的隐藏重定义：禁用 Python 的自动下载。本命令不支持，无效果。

### `--quiet`

短旗标 `-q`。全局选项的隐藏重定义：安静输出。本命令不支持，无效果。

### `--verbose`

短旗标 `-v`。全局选项的隐藏重定义：详细输出。本命令不支持，无效果。

### `--color`

格式：`--color <COLOR>`。全局选项的隐藏重定义：控制输出颜色，取值 `auto`、`always` 或 `never`。本命令不支持，无效果。

### `--native-tls`

全局选项的隐藏重定义：从平台原生证书库加载 TLS 证书。本命令不支持，无效果。

### `--offline`

全局选项的隐藏重定义：禁用网络访问。本命令不支持，无效果。

### `--no-progress`

全局选项的隐藏重定义：隐藏全部进度输出。本命令不支持，无效果。

### `--config-file`

格式：`--config-file <CONFIG_FILE>`。全局选项的隐藏重定义：指定 `uv.toml` 配置文件路径。本命令不支持，无效果。

### `--no-config`

全局选项的隐藏重定义：避免发现配置文件。本命令不支持，无效果。

### `--version`

短旗标 `-V`。全局选项的隐藏重定义：显示 uv 的版本。本命令不支持，无效果。

## 使用提醒

- 生成脚本写入 stdout；按所用 shell 的补全机制加载（例如重定向到补全目录或交由补全框架管理）。
- 该命令在帮助中隐藏，不属于稳定接口，补全加载方式建议参考官方文档。

## 示例

为 bash 生成补全脚本：

```console
$ uv generate-shell-completion bash
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令定义于 `Commands::GenerateShellCompletion` 与 `GenerateShellCompletionArgs`；隐藏选项的注释标明其用途是隐藏未使用的全局选项（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
