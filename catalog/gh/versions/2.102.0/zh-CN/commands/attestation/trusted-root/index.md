---
title: gh attestation trusted-root
command:
  - attestation
  - trusted-root
---

输出 `trusted_root.jsonl` 内容，多用于准备离线校验。

## 简介

使用 [`gh attestation verify`](cli:command:attestation/verify) 时，若机器可联网，可信材料的获取会自动完成；要做离线校验，需用 `--custom-trusted-root` 提供 trusted root 文件，本命令帮助获取该文件。

不带任何旗标运行，可得到同时覆盖 Sigstore 公共实例与 GitHub 自有 Sigstore 实例的 trusted root 文件。也可以用 `--tuf-url` 指定自定义 TUF 仓库镜像的 URL，此时 `--tuf-root` 应指向经带外（out-of-band）安全途径取得的 `root.json` 文件。

若只想校验本地 TUF 仓库的完整性、不需要 `trusted_root.jsonl` 的内容，使用 `--verify-only`。

## 参数

### `URL`

格式：`[--tuf-url <url> --tuf-root <file-path>]`。本命令不接受位置参数（源码按 `cobra.ExactArgs(0)` 校验）；用法串中的这段内容表示可选的旗标组合，且 `--tuf-url` 与 `--tuf-root` 必须同时给出。

## 选项

### `--tuf-url`

格式：`--tuf-url <string>`。TUF 仓库镜像的 URL；须与 `--tuf-root` 同时给出。

### `--tuf-root`

格式：`--tuf-root <string>`。磁盘上 TUF `root.json` 文件的路径；须与 `--tuf-url` 同时给出。

### `--verify-only`

格式：`--verify-only`。只校验并更新本地 TUF 仓库，不输出 `trusted_root.jsonl` 内容。

### `--hostname`

格式：`--hostname <string>`。指定要使用的主机；未指定时使用默认主机。

## 环境变量

- `GH_HOST`：未指定 `--hostname` 时影响默认主机的取值。
- `GH_TOKEN`、`GITHUB_TOKEN`：见[环境变量](../../../reference/environment.md)；本命令本身跳过登录检查，仅在需要解析租户信任域时用到认证。

## 使用提醒

- `--tuf-url` 与 `--tuf-root` 必须成对出现，只给其一会报错。
- 检测到 ghe.com 租户主机时，命令需要该主机的有效令牌来获取信任域。
- 输出内容可直接保存为文件，供 `gh attestation verify --custom-trusted-root` 离线校验使用。

## 示例

```sh
# 获取同时覆盖 Sigstore 公共实例与 GitHub 实例的 trusted_root.jsonl
gh attestation trusted-root
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、TUF 客户端配置与输出逻辑见 [pkg/cmd/attestation/trustedroot/trustedroot.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/attestation/trustedroot/trustedroot.go)。
