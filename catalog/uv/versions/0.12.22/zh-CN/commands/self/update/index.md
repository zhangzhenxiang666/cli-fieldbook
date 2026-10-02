---
title: uv self update
command:
  - self
  - update
---

## 简介

更新 uv。

未指定目标版本时更新到最新版本。更新包来自 GitHub 发布渠道，可用 `--token` 提供 GitHub 令牌以降低触发速率限制的概率。

## 参数

### `TARGET_VERSION`

格式：`[TARGET_VERSION]`。可选。要更新到的指定版本；未提供时更新到最新版本。

## 选项

### `--help`

短旗标 `-h`。

显示本命令的简明帮助。

### `--token`

格式：`--token <TOKEN>`。用于身份验证的 GitHub 令牌；并非必需，但可降低遇到速率限制的概率。对应环境变量 `UV_GITHUB_TOKEN`。

### `--dry-run`

只执行检查，不实际执行更新。

## 环境变量

- `UV_GITHUB_TOKEN`：对应 `--token`。

## 使用提醒

- 更新完成后可用 [uv self version](cli:command:self/version) 确认版本。
- 网络受限或需要验证更新内容时，先用 `--dry-run` 查看。

## 示例

更新到最新版本：

```console
$ uv self update
```

只检查更新而不执行：

```console
$ uv self update --dry-run
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义见 `SelfCommand::Update` 与 `SelfUpdateArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
