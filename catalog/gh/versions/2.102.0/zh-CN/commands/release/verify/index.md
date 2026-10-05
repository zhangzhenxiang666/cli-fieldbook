---
title: gh release verify
command:
  - release
  - verify
---

校验 release 的 attestation（证明）。

## 简介

校验 GitHub release 附带有效的密码学签名 attestation。attestation 是 GitHub 就 release 及其资产所作的声明。本命令检查指定 release（未给出 tag 时为最新的 release）具有有效的 attestation：获取该 release 的 attestation，并打印其中引用的全部资产的元数据（含摘要 digest）。

流程上先把 tag 解析为 git ref 的 SHA，再按该摘要拉取 attestation 并按 tag 过滤；找不到 attestation 或发现重复 attestation 都会报错。验证通过时输出 tag 解析结果、attestation 来源以及带资产表（Name、Digest）的成功信息。

## 参数

### `TAG`

格式：`[<tag>]`，可选。要校验的 release tag 名；省略时校验最新的 release。

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

- 目标仓库用继承选项 `-R`/`--repo` 切换。
- 校验依赖 GitHub 的 release attestation 能力，无 attestation 的 release 会直接报错。

## 示例

```sh
# 校验最新的 release
gh release verify

# 按 tag 校验指定 release
gh release verify v1.2.3

# 按 tag 校验并以 JSON 格式输出 attestation
gh release verify v1.2.3 --format json
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、attestation 拉取与过滤、结果输出见 [pkg/cmd/release/verify/verify.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/verify/verify.go)。
- tag 到 ref SHA 的解析与摘要算法选择（SHA-1/SHA-256 按 SHA 长度区分）见 [pkg/cmd/release/shared/fetch.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/shared/fetch.go)；校验器实现见 [pkg/cmd/release/shared/attestation.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/shared/attestation.go)。
- `--format` 等格式化旗标由 `AddFormatFlags` 注册，见 [pkg/cmdutil/json_flags.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/json_flags.go)。
