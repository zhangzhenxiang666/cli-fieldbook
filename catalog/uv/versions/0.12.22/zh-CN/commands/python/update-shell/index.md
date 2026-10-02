---
title: uv python update-shell
command:
  - python
  - update-shell
---

## 简介

确保 Python 可执行目录位于 `PATH` 中。

若可执行目录不在 `PATH` 上，uv 会尝试把它加入相关的 shell 配置文件。可执行目录按 XDG 标准确定，可用 [uv python dir --bin](cli:command:python/dir) 查看。若配置文件中已包含添加该目录的片段、但目录实际不在 `PATH` 上，uv 会报错退出。

## 选项

### `--help`

短旗标 `-h`。

显示本命令的简明帮助。

## 使用提醒

- 修改 shell 配置文件后，通常需要重开终端或重新加载配置才能生效。
- 该目录同时是 [uv python install](cli:command:python/install) 放置 `python3.13` 等可执行文件的位置，可用 `UV_PYTHON_BIN_DIR` 覆盖。
- 作用范围仅限 uv 的 Python 可执行目录，不会改动 `PATH` 上的其他条目。

## 示例

把 Python 可执行目录加入 `PATH`：

```console
$ uv python update-shell
```

以上示例为说明性内容，未实际运行。

## 差异与兼容性

`ensurepath` 是本命令的别名，`uv python ensurepath` 等价于 `uv python update-shell`；受命令协议中别名全局唯一的限制，该别名未登记在命令清单里。

## 源码补充

命令说明见 `PythonCommand::UpdateShell`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
