---
title: uv self version
command:
  - self
  - version
---

## 简介

显示 uv 的版本。

默认以文本形式输出版本；`--short` 只打印版本号，`--output-format json` 以 JSON 输出。

## 选项

### `--help`

短旗标 `-h`。

显示本命令的简明帮助。

### `--short`

只打印版本号。

### `--output-format`

格式：`--output-format <OUTPUT_FORMAT>`。选择输出格式，取值 `text` 或 `json`，默认 `text`。

## 使用提醒

- 根命令的 `--version` 旗标（`uv -V`）也可显示版本。
- 需要更新版本时用 [uv self update](cli:command:self/update)。

## 示例

显示 uv 版本：

```console
$ uv self version
```

只输出版本号：

```console
$ uv self version --short
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义见 `SelfCommand::Version`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
