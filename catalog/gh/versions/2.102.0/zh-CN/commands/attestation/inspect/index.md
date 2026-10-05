---
title: gh attestation inspect
command:
  - attestation
  - inspect
---

检查已下载到磁盘的 Sigstore bundle，输出其内容摘要。

## 简介

本命令为隐藏命令，不出现在 `gh attestation` 的常规帮助中。它检查一个已下载到磁盘的 Sigstore bundle；要下载产物关联的 bundle，见 [`gh at download`](cli:command:attestation/download)（即 `gh attestation download`）。

给定一个 `.json` 或 `.jsonl` 文件，本命令会：

- 提取 bundle 的 statement 与 predicate；
- 提供证书摘要（如有），并标明证书由 GitHub 还是 Sigstore 公共实例（Public Good Instance，PGI）签发；
- 检查 bundle 的"真实性"（authenticity）：这里指是否拥有可校验其中证书、透明日志条目与签名时间戳的可信材料，且内含签名与所提供的公钥匹配。

本命令不能用于校验（verify）bundle；校验请用 [`gh at verify`](cli:command:attestation/verify)。默认输出精简表格；要查看完整结果，可给出 `--format json` 旗标以输出 JSON。

## 参数

### `PATH-TO-SIGSTORE-BUNDLE`

格式：`<path-to-sigstore-bundle>`。Sigstore bundle 文件路径，`.json` 单 bundle 文件或 `.jsonl` 多 bundle 文件均可；恰好提供一个。

## 选项

### `--hostname`

格式：`--hostname <string>`。指定要使用的主机；未指定时使用默认主机。

### `--format`

格式：`--format <string>`。输出格式，取值 `json`；给出后输出 JSON 而非默认表格。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。按 jq 表达式筛选 `--format json` 的输出；未给 `--format json` 时报错。

### `--template`

短旗标 `-t`。格式：`--template <string>`。按 Go 模板渲染 `--format json` 的输出；用法见 [JSON 输出与格式化](../../../reference/formatting.md)。

## 环境变量

- `GH_HOST`：未指定 `--hostname` 时影响默认主机的取值。
- `GH_TOKEN`、`GITHUB_TOKEN`：获取可信材料所用的认证令牌，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 默认表格输出包含真实性判定（含签发方标注）、源仓库、谓词类型、SubjectAlternativeName、运行调用 URI 与证书有效期起点的摘要信息。
- 即使缺少可信材料无法判定真实，命令仍会输出其余检查结果。
- 本命令是隐藏的调试性入口，稳定的日常工作流优先使用 `download` 与 `verify`。

## 示例

```sh
# 检查 Sigstore bundle，以表格输出结果
gh attestation inspect <path-to-bundle>

# 检查 Sigstore bundle，以 JSON 输出结果
gh attestation inspect <path-to-bundle> --format=json
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、检查逻辑与表格输出见 [pkg/cmd/attestation/inspect/inspect.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/attestation/inspect/inspect.go)。
- `--format` 等输出旗标由 [pkg/cmdutil/json_flags.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/json_flags.go) 的 `AddFormatFlags` 添加。
