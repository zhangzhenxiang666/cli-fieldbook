---
title: uv tool update-shell
command:
  - tool
  - update-shell
---

## 简介

确保工具可执行目录位于 `PATH` 中。

若可执行目录不在 `PATH` 上，uv 会尝试把它追加到相关的 shell 配置文件；若配置文件中已包含添加该目录的片段、但目录仍不在 `PATH` 上，uv 将报错退出。可执行目录按 XDG 标准确定，可用 [uv tool dir](cli:command:tool/dir) 的 `--bin` 查看。命令别名 `ensurepath`（该别名因本站登记协议的限制未列为独立条目，但在命令行可用）。

## 选项

### `--help`

短旗标 `-h`。显示简明帮助；传入 `--help` 时显示长帮助。

## 使用提醒

- 修改 shell 配置文件后，需要重新打开 shell 或重新加载配置才能使 `PATH` 变更生效。
- 本命令只处理工具可执行目录；工具环境目录的查看见 [uv tool dir](cli:command:tool/dir)。
- 工具的可执行目录不在 `PATH` 上时，uv 在安装与运行工具时会给出警告，可据此判断是否需要执行本命令。

## 示例

把工具可执行目录加入 `PATH`：

```console
$ uv tool update-shell
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令定义于 `ToolCommand::UpdateShell`（无本地选项，[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
