---
title: uv auth dir
command:
  - auth
  - dir
---

## 简介

显示 uv 凭据目录的路径。

凭据默认存放在 uv 数据目录下：Unix 上为 `$XDG_DATA_HOME/uv/credentials` 或 `$HOME/.local/share/uv/credentials`，Windows 上为 `%APPDATA%\uv\data\credentials`；可用环境变量 `UV_CREDENTIALS_DIR` 覆盖。仅明文后端使用该目录；native 后端（`--keyring-provider native`）使用系统 keyring，不落盘于此。

## 选项

### `--help`

短旗标 `-h`。显示简明帮助；传入 `--help` 时显示长帮助。

## 环境变量

- `UV_CREDENTIALS_DIR`：覆盖凭据目录的位置。

## 使用提醒

- 凭据的写入与删除见 [uv auth login](cli:command:auth/login) 与 [uv auth logout](cli:command:auth/logout)；查询见 [uv auth token](cli:command:auth/token)。
- 明文后端保存的凭据以明文形式存在于该目录，注意目录与备份的访问权限。

## 示例

查看凭据目录：

```console
$ uv auth dir
```

以上示例为说明性内容，未实际运行。

## 源码补充

目录约定说明定义于 `AuthCommand::Dir` 的命令文档（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
