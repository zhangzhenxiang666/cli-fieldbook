---
title: gh attestation
command:
  - attestation
---

处理产物证明（artifact attestation）：下载、校验与查看 Sigstore bundle。

## 简介

`gh attestation` 用于下载并校验产物证明。证明是某个主体（如 GitHub Actions 工作流）对产物做出的加密签名声明，可用来核对产物的完整性与来源。本组命令提供三类能力：按产物文件或 OCI 镜像下载证明供离线使用；用证明校验产物完整性，并按签名者身份等条件收窄校验策略；输出供离线校验使用的 `trusted_root.jsonl` 内容。

`attestation` 有别名 `at`，例如 `gh at verify` 等价于 `gh attestation verify`。

## 子命令导览

- [gh attestation download](cli:command:attestation/download)：下载产物关联的证明，写入以产物摘要命名的 JSON lines 文件，供离线使用。
- [gh attestation inspect](cli:command:attestation/inspect)：检查已下载到磁盘的 Sigstore bundle，输出内容摘要（隐藏命令）。
- [gh attestation verify](cli:command:attestation/verify)：用产物关联的证明校验其完整性与来源，支持按证书身份、签名工作流等条件加强策略。
- [gh attestation trusted-root](cli:command:attestation/trusted-root)：获取并输出 `trusted_root.jsonl` 内容，多用于离线校验。

## 使用提醒

- `download` 与 `verify` 都要求给出 `--owner` 或 `--repo` 之一，且两个旗标互斥。
- 各子命令可用 `--hostname` 指定主机，未指定时使用默认主机；主机须为受支持的主机。
- 本组命令围绕 Sigstore 生态（bundle、TUF、透明日志等）工作，离线校验的典型流程是先 `download` 再 `verify --bundle`。

## 示例

```sh
# 校验与仓库关联的本地产物
gh attestation verify example.bin --repo github/example

# 下载证明供离线使用
gh attestation download example.bin -o github
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 分组定义与子命令注册见 [pkg/cmd/attestation/attestation.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/attestation/attestation.go)。
