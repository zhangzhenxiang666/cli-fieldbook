---
title: uv help
command:
  - help
---

## 简介

显示命令的文档。

`uv help` 显示 uv 的总体帮助；`uv help <command>` 显示指定命令的长帮助（包含各选项的详细说明）。命令名可多级传入，例如 `uv help pip install` 显示 `uv pip install` 的文档。与 `--help` 不同，本命令默认通过分页器输出长帮助。

## 参数

### `COMMAND`

格式：`[COMMAND]...`。要显示文档的命令，可多级（如 `pip install`）；缺省时显示总体帮助。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

### `--no-pager`

打印帮助时禁用分页器，直接输出到 stdout。

## 使用提醒

- 与 `uv <command> --help` 相比，`uv help <command>` 展示的是长格式帮助；两者内容同源。
- 查看 `uv help` 自身的帮助时不展示全局选项（由该命令的定制帮助模板决定）。
- 需要在脚本中捕获帮助文本时使用 `--no-pager`。

## 示例

显示 uv 总体帮助：

```console
$ uv help
```

显示 `uv pip install` 的长帮助：

```console
$ uv help pip install --no-pager
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令定义于 `Commands::Help` 与 `HelpArgs`；帮助模板与全局选项的展示方式在同一命令上定制（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
