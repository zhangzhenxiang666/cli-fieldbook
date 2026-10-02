---
title: uv self
command:
  - self
---

## 简介

管理 uv 自身。

本组命令面向 uv 可执行文件本身：[uv self update](cli:command:self/update) 更新 uv，[uv self version](cli:command:self/version) 显示 uv 的版本。查询版本也可用根命令的 `--version` 旗标（`uv -V`）。

## 选项

### `--help`

短旗标 `-h`。

显示 `uv self` 的帮助与子命令列表。

## 使用提醒

- `uv self update` 从 GitHub 发布渠道获取新版本，可用 `--token` 提供 GitHub 令牌。
- 各子命令继承全局选项，参见[根命令](cli:command:)。

## 源码补充

子命令定义见 `SelfCommand`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
