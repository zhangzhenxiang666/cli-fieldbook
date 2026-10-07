---
title: gh attestation download
command:
  - attestation
  - download
---

下载产物关联的证明，写入本地文件供离线使用。

## 简介

本功能处于 public preview，可能变化。命令要求以下二者之一：

- 产物文件的路径；或
- 容器镜像 URI（如 `oci://<image-uri>`）。注意提供 OCI URL 时，须已完成对其容器 registry 的认证。

此外还要求以下二者之一：

- `--repo` 旗标（如 `--repo github/example`），值须与产物关联的 GitHub 仓库名一致；或
- `--owner` 旗标（如 `--owner github`），值须与产物关联仓库所属的 GitHub 组织名一致。

关联的 bundle 会写入当前目录下以产物摘要命名的文件：摘要为 `sha256:1234` 时文件名为 `sha256:1234.jsonl`。冒号在 Windows 上不能用于文件名，此时算法与摘要之间改用短横线分隔，即 `sha256-1234.jsonl`。

未找到证明时命令输出提示并正常结束；写入文件会覆盖既有内容。

## 参数

### `FILE-PATH|IMAGE-URI`

格式：`[<file-path> | oci://<image-uri>]`。产物文件路径，或以 `oci://` 前缀给出的容器镜像 URI，恰好提供一个。

## 选项

### `--owner`

短旗标 `-o`。格式：`--owner <string>`。按指定的 GitHub 组织缩小证明查找范围；与 `--repo` 互斥且二者必须给出其一。

### `--repo`

短旗标 `-R`。格式：`--repo <string>`。仓库，格式 `<owner>/<repo>`；值须与产物关联的 GitHub 仓库名一致。与 `--owner` 互斥且二者必须给出其一。

### `--predicate-type`

格式：`--predicate-type <string>`。按给定的谓词类型（predicate type）过滤证明。

### `--digest-alg`

短旗标 `-d`。格式：`--digest-alg <string>`。计算产物摘要所用的算法。取值 `sha256`、`sha512`；默认 `sha256`。

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。最多获取的证明数量。默认 `30`（源码常量 `api.DefaultLimit`）。

### `--hostname`

格式：`--hostname <string>`。指定要使用的主机；未指定时使用默认主机。

## 环境变量

- `GH_HOST`：未指定 `--hostname` 时影响默认主机的取值。
- `GH_TOKEN`、`GITHUB_TOKEN`：命令访问 GitHub API 使用的认证令牌，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--owner` 与 `--repo` 必须二选一，同时给出会报错。
- 提供镜像 URI 时须已向对应容器 registry 认证。
- 离线校验的后续步骤见 [`gh attestation verify --bundle`](cli:command:attestation/verify) 与 [`gh attestation trusted-root`](cli:command:attestation/trusted-root)。

## 示例

```sh
# 下载与组织关联的本地产物的证明
gh attestation download example.bin -o github

# 下载与仓库关联的本地产物的证明
gh attestation download example.bin -R github/example

# 下载与组织关联的 OCI 镜像的证明
gh attestation download oci://example.com/foo/bar:latest -o github
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、旗标互斥校验与输出文件命名见 [pkg/cmd/attestation/download/download.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/attestation/download/download.go)。
- `--limit` 的默认值常量 `DefaultLimit`（30）定义于 [pkg/cmd/attestation/api/client.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/attestation/api/client.go)。
