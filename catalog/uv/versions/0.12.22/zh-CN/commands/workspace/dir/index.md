---
title: uv workspace dir
command:
  - workspace
  - dir
---

## 简介

显示 workspace 成员的路径。

默认显示 workspace 根目录的路径；提供 `--package` 时改为显示对应成员的路径。若不在 workspace 中（即无法发现 `pyproject.toml`），命令会报错退出。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

### `--package`

格式：`--package <PACKAGE>`。显示 workspace 中特定包（成员）的路径，而非 workspace 根目录。

## 使用提醒

- 适合在脚本中拼接 workspace 内项目的绝对路径，例如配合 `--directory` 使用。
- 找不到 workspace 或指定的成员不存在时命令报错，不会回退到当前目录。

## 示例

显示 workspace 根目录路径：

```console
$ uv workspace dir
```

显示特定成员的路径：

```console
$ uv workspace dir --package bird-feeder
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令定义于 `WorkspaceCommand::Dir` 与 `WorkspaceDirArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
