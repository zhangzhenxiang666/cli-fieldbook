---
title: uv workspace list
command:
  - workspace
  - list
---

## 简介

列出 workspace 的成员。

以换行分隔显示 workspace 成员的名称，便于在脚本中逐行处理。提供 `--paths` 时改为显示路径；提供 `--scripts` 时还会列出 workspace 中带内联元数据表的独立脚本（PEP 723）。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

### `--paths`

显示成员的路径而非名称。

### `--scripts`

列出 workspace 中全部带内联元数据的独立脚本（PEP 723 脚本）。

## 使用提醒

- 输出为逐行文本，适合管道处理；本命令不解析依赖，需要解析结果时用 [uv workspace metadata](cli:command:workspace/metadata)。
- 与 [uv workspace dir](cli:command:workspace/dir) 互补：后者输出单个成员的路径。

## 示例

列出成员名称：

```console
$ uv workspace list
```

列出成员路径与 workspace 内的独立脚本：

```console
$ uv workspace list --paths --scripts
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令定义于 `WorkspaceCommand::List` 与 `WorkspaceListArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
