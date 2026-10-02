---
title: uv workspace
command:
  - workspace
---

## 简介

查看 uv workspace。

workspace 是一个或多个包（workspace 成员）的集合，这些成员被共同管理：每个成员有自己的 `pyproject.toml`，但整个 workspace 共享一个 lockfile。`uv workspace` 命令组提供查看 workspace 元数据与成员信息的子命令，不执行安装或修改操作。workspace 的概念与组织方式另见[项目与 workspace](../../concepts/projects.md)。

子命令：

- [uv workspace metadata](cli:command:workspace/metadata)：查看当前 workspace 的元数据。
- [uv workspace dir](cli:command:workspace/dir)：显示 workspace 根目录或某个成员的路径。
- [uv workspace list](cli:command:workspace/list)：列出 workspace 成员。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

## 使用提醒

- 在 workspace 中，[uv lock](cli:command:lock) 对整个 workspace 生效；[uv run](cli:command:run) 与 [uv sync](cli:command:sync) 默认作用于 workspace 根，可用 `--package` 指定成员。
- workspace 通过 workspace 根 `pyproject.toml` 中的 `tool.uv.workspace` 表（`members`、`exclude`）定义。
- 本组命令只读；创建与修改 workspace 依赖请使用 [uv init](cli:command:init) 与 [uv add](cli:command:add)。

## 示例

查看当前 workspace 的根目录路径：

```console
$ uv workspace dir
```

列出 workspace 全部成员的名称：

```console
$ uv workspace list
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令组定义于 `Commands::Workspace` 与 `WorkspaceNamespace`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；workspace 概念说明见官方文档（[docs/concepts/projects/workspaces.md](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/docs/concepts/projects/workspaces.md)）。
