---
title: gh release verify-asset
command:
  - release
  - verify-asset
---

校验给定文件确实来自某个 release。

## 简介

借助密码学签名的 attestation（证明），校验给定的资产文件确实来自指定的 GitHub release。attestation 是 GitHub 就 release 及其资产所作的声明。本命令检查所给资产与指定 release（未给出 tag 时为最新的 release）的有效 attestation 相匹配：通过比对资产文件的摘要与 attestation 中的 subject 一致、且该 attestation 关联到该 release，来确保资产的完整性。

命令会先计算文件的 SHA-256 摘要，再把 tag 解析为 git ref 的 SHA 并拉取、过滤 attestation；文件摘要不在任何 subject 中、找不到 attestation 或解析失败都会报错。验证通过时输出文件摘要、tag 解析结果与成功信息。

## 参数

### `TAG`

格式：`[<tag>]`，可选。目标 release 的 tag 名；省略时校验最新的 release。

### `FILE-PATH`

格式：`<file-path>`，必填。要校验的资产文件路径；只给一个参数时它被视为文件路径。

## 选项

### `--custom-trusted-root`

格式：`--custom-trusted-root <string>`。trusted_root.jsonl 文件的路径；主要用于离线校验。该选项在帮助中隐藏。

### `--format`

格式：`--format <string>`。输出格式，取值 `json`；给出后以 JSON 输出验证结果。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。按 jq 表达式筛选 `--format json` 的输出；未给 `--format json` 时报错。

### `--template`

短旗标 `-t`。格式：`--template <string>`。按 Go 模板渲染 `--format json` 的输出；用法见 [JSON 输出与格式化](../../../reference/formatting.md)。

## 使用提醒

- 必须给出资产文件路径，一个参数都不给会报错；参数多于两个也不被接受。
- 目标仓库用继承选项 `-R`/`--repo` 切换。

## 示例

```sh
# 校验来自最新 release 的资产
gh release verify-asset ./dist/my-asset.zip

# 校验来自指定 tag 的资产
gh release verify-asset v1.2.3 ./dist/my-asset.zip

# 校验来自指定 tag 的资产并以 JSON 格式输出 attestation
gh release verify-asset v1.2.3 ./dist/my-asset.zip --format json
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、文件摘要计算与 attestation 过滤见 [pkg/cmd/release/verify-asset/verify_asset.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/verify-asset/verify_asset.go)。
- tag 到 ref SHA 的解析见 [pkg/cmd/release/shared/fetch.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/shared/fetch.go)；校验器实现见 [pkg/cmd/release/shared/attestation.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/shared/attestation.go)。
- `--format` 等格式化旗标由 `AddFormatFlags` 注册，见 [pkg/cmdutil/json_flags.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/json_flags.go)。
