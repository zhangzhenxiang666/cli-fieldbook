---
title: gh attestation verify
command:
  - attestation
  - verify
---

用产物关联的加密签名证明校验其完整性与来源。

## 简介

证明是某个主体（即 GitHub Actions 工作流）针对某个主体对象（即产物）做出的声明（provenance statement）。校验证明时须提供产物，并核验：

- 产生证明的主体的身份；
- 期望的证明谓词类型（声明的性质）。默认强制 `https://slsa.dev/provenance/v1`，其他类型用 `--predicate-type` 指定。

"主体身份"由两部分构成：产物关联的仓库或仓库所有者，以及产生证明的 Actions 工作流（即签名工作流）。该身份会与证明证书的 `SourceRepository`、`SourceRepositoryOwner`、`SubjectAlternativeName`（SAN）等字段比对。命令至少要求给出 `--owner`（如 `--owner github`）或 `--repo`（如 `--repo github/example`）之一；身份指定得越精确，校验过程提供的安全保证越可控。理想情况下还应通过 `--signer-workflow` 或 `--cert-identity` 校验签名工作流的路径。若证明由可复用工作流（reusable workflow）产生，则该可复用工作流才是签名者，此时必须使用 `--signer-workflow` 或 `--signer-repo`。

指定产物要求以下二者之一：产物文件路径；或容器镜像 URI（如 `oci://<image-uri>`，须已向其容器 registry 认证）。默认命令经由 GitHub API 按 `--owner`/`--repo` 的取值获取相关证明；改从产物的 OCI registry 获取证明用 `--bundle-from-oci`；离线校验（配合 [`gh attestation download`](cli:command:attestation/download) 已保存到磁盘的证明）则向 `--bundle` 提供路径。

给定 `--format json` 旗标时，校验成功后输出一个 JSON 数组，每条通过校验的证明一项，可管道给策略引擎做额外策略校验。数组元素含 `attestation`（被校验的 bundle）与 `verificationResult` 两个对象；`verificationResult` 中的 `signature.certificate` 是内嵌 X.509 证书的解析表示，`verifiedTimestamps` 是透明日志或时间戳机构见证证明的时间记录，`statement` 含引用产物的 `subject` 数组、`predicateType` 字段与 `predicate` 对象。注意：只有 `signature.certificate` 与 `verifiedTimestamps` 的内容无法被产生证明的工作流操纵；攻击者一旦控制工作流执行上下文即可伪造 `statement.predicate`。设计策略时可考虑"trusted builder"：让构建与签名发生在其执行不受调用方工作流输入影响的可复用工作流中。

## 参数

### `FILE-PATH|IMAGE-URI`

格式：`[<file-path> | oci://<image-uri>]`。产物文件路径，或以 `oci://` 前缀给出的容器镜像 URI，恰好提供一个。

## 选项

### `--bundle`

短旗标 `-b`。格式：`--bundle <string>`。磁盘上 bundle 的路径：可以是单个 JSON 文件中的单个 bundle，也可以是含多个 bundle 的 JSON lines 文件。用于离线校验。

### `--bundle-from-oci`

格式：`--bundle-from-oci`。校验 OCI 镜像时，从 OCI registry 而非 GitHub 获取证明 bundle。

### `--digest-alg`

短旗标 `-d`。格式：`--digest-alg <string>`。计算产物摘要所用的算法。取值 `sha256`、`sha512`；默认 `sha256`。

### `--owner`

短旗标 `-o`。格式：`--owner <string>`。按指定的 GitHub 组织缩小证明查找范围；与 `--repo` 互斥且二者必须给出其一。

### `--repo`

短旗标 `-R`。格式：`--repo <string>`。仓库，格式 `<owner>/<repo>`；与 `--owner` 互斥且二者必须给出其一。

### `--no-public-good`

格式：`--no-public-good`。不校验由 Sigstore 公共实例（public good instance）签名的证明。

### `--custom-trusted-root`

格式：`--custom-trusted-root <string>`。`trusted_root.jsonl` 文件的路径；通常用于离线校验。

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。最多获取的证明数量。默认 `30`（源码常量 `api.DefaultLimit`）。

### `--hostname`

格式：`--hostname <string>`。指定要使用的主机；未指定时使用默认主机。

### `--predicate-type`

格式：`--predicate-type <string>`。强制通过校验的证明的谓词类型与给定值匹配。默认 `https://slsa.dev/provenance/v1`（源码常量 `verification.SLSAPredicateV1`）。

### `--deny-self-hosted-runners`

格式：`--deny-self-hosted-runners`。对在自托管 runner 上生成的证明判定校验失败。

### `--cert-identity`

格式：`--cert-identity <string>`。强制证书的 SubjectAlternativeName 与给定值完全一致。

### `--cert-identity-regex`

短旗标 `-i`。格式：`--cert-identity-regex <string>`。强制证书的 SubjectAlternativeName 匹配给定正则表达式。

### `--signer-repo`

格式：`--signer-repo <string>`。强制签名工作流所在的仓库与给定值（`<owner>/<repo>`）匹配。

### `--signer-workflow`

格式：`--signer-workflow <string>`。强制签名证明的工作流与给定值（`[host/]<owner>/<repo>/<path>/<to>/<workflow>`）匹配。

### `--cert-oidc-issuer`

格式：`--cert-oidc-issuer <string>`。强制 OIDC 令牌的签发者与给定值匹配。默认 `https://token.actions.githubusercontent.com`（源码常量 `verification.GitHubOIDCIssuer`）。

### `--signer-digest`

格式：`--signer-digest <string>`。强制与签名工作流关联的摘要与给定值匹配。

### `--source-ref`

格式：`--source-ref <string>`。强制与源仓库关联的 git ref 与给定值匹配。

### `--source-digest`

格式：`--source-digest <string>`。强制与源仓库关联的摘要与给定值匹配。

### `--format`

格式：`--format <string>`。输出格式，取值 `json`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。按 jq 表达式筛选 `--format json` 的输出；未给 `--format json` 时报错。

### `--template`

短旗标 `-t`。格式：`--template <string>`。按 Go 模板渲染 `--format json` 的输出；用法见 [JSON 输出与格式化](../../../reference/formatting.md)。

## 环境变量

- `GH_HOST`：未指定 `--hostname` 时影响默认主机的取值。
- `GH_TOKEN`、`GITHUB_TOKEN`：命令访问 GitHub API 使用的认证令牌，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--owner` 与 `--repo` 必须二选一，同时给出会报错。
- `--cert-identity`、`--cert-identity-regex`、`--signer-repo`、`--signer-workflow` 四个旗标互斥，只能给出其一。
- 证明由可复用工作流产生时，必须用 `--signer-workflow` 或 `--signer-repo` 校验签名者。
- 校验成功且带 `--format json` 时输出 JSON 数组；其中仅 `signature.certificate` 与 `verifiedTimestamps` 不可被产生证明的工作流操纵，用于策略判定时须谨慎对待 `statement.predicate`。

## 示例

```sh
# 校验与仓库关联的产物
gh attestation verify example.bin --repo github/example

# 校验与组织关联的产物
gh attestation verify example.bin --owner github

# 校验产物并输出完整校验结果
gh attestation verify example.bin --owner github --format json

# 用磁盘上保存的证明校验 OCI 镜像
gh attestation verify oci://<image-uri> --owner github --bundle sha256:foo.jsonl

# 校验由可复用工作流签名的产物
gh attestation verify example.bin --owner github --signer-repo actions/example
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、策略旗标与互斥标注见 [pkg/cmd/attestation/verify/verify.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/attestation/verify/verify.go)。
- 谓词类型默认值 `SLSAPredicateV1` 与 OIDC 签发者默认值 `GitHubOIDCIssuer` 分别定义于 [pkg/cmd/attestation/verification/attestation.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/attestation/verification/attestation.go) 与 [pkg/cmd/attestation/verification/extensions.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/attestation/verification/extensions.go)。
