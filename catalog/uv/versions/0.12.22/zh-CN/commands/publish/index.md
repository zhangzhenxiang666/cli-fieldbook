---
title: uv publish
command:
  - publish
---

## 简介

上传分发物到索引。

将要发布的文件上传到索引的上传端点，默认为 PyPI。默认上传 `dist` 目录中的 wheel 与源分发物（及其证明文件），忽略其他文件；接受 glob 表达式。上传前可在受支持环境中使用可信发布（如 GitHub Actions 与 GitLab CI/CD），或用 `--token` 等选项提供凭据；提供 `--check-url` 或 `--index` 时会先检查索引中是否已存在相同文件以跳过重复上传。

本命令没有共享的解析选项组；索引与凭据等选项均为本命令的本地选项。

## 参数

### `FILES`

格式：`[FILES]...`。要上传的文件路径，接受 glob 表达式；默认 `dist/*`。只选择 wheel 与源分发物及其证明文件，忽略其他文件。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

### `--offline`

该选项在帮助中隐藏：发布需要网络访问，本命令不支持全局 `--offline` 选项，此处为将其从帮助中隐藏而做的本地重定义。

### `--index`

格式：`--index <INDEX>`。使用配置中指定名称的索引进行发布；该索引必须设置 `publish-url`，其 `url` 用于检查已存在文件以跳过重复上传。与 `--publish-url`、`--check-url` 互斥；对应环境变量 `UV_PUBLISH_INDEX`。

### `--username`

短旗标 `-u`。格式：`--username <USERNAME>`。上传使用的用户名。对应环境变量 `UV_PUBLISH_USERNAME`。

### `--password`

短旗标 `-p`。格式：`--password <PASSWORD>`。上传使用的密码。对应环境变量 `UV_PUBLISH_PASSWORD`。

### `--token`

短旗标 `-t`。格式：`--token <TOKEN>`。上传使用的令牌；等价于以 `__token__` 作为 `--username`、令牌作为 `--password`。与 `--username`、`--password` 互斥；对应环境变量 `UV_PUBLISH_TOKEN`。

### `--trusted-publishing`

格式：`--trusted-publishing <TRUSTED_PUBLISHING>`。配置可信发布。默认在受支持的环境（GitHub Actions、GitLab CI/CD）中检查可信发布，未配置则忽略。

### `--keyring-provider`

格式：`--keyring-provider <KEYRING_PROVIDER>`。尝试用 `keyring` 认证；目前仅支持 `subprocess`（通过 `keyring` CLI），默认 `disabled`。对应环境变量 `UV_KEYRING_PROVIDER`。

### `--publish-url`

格式：`--publish-url <PUBLISH_URL>`。上传端点的 URL（不是索引 URL）。索引访问与索引上传的 URL 通常不同；默认为 PyPI 的上传 URL（`https://upload.pypi.org/legacy/`）。对应环境变量 `UV_PUBLISH_URL`。

### `--check-url`

格式：`--check-url <CHECK_URL>`。检查给定索引 URL 是否已存在相同文件，以跳过重复上传：上传前先检查索引，若同一文件已存在则不再上传；上传出错后再次检查，以处理同文件并行上传的情况。可用于重试只上传了部分文件的发布；具体行为因索引而异（PyPI 重复上传本身会成功，多数其他索引报错）。索引须提供受支持的哈希（SHA-256、SHA-384 或 SHA-512）。对应环境变量 `UV_PUBLISH_CHECK_URL`。

### `--skip-existing`

该选项在帮助中隐藏；已被 `--check-url` 取代，建议改用后者实现跳过已存在文件。

### `--dry-run`

演练而不上传文件：本地检查分发物元数据，提供 `--check-url` 或 `--index` 时也检查已存在文件。

### `--no-attestations`

不为发布的文件上传证明。默认 uv 尝试随每个分发物上传匹配的 PEP 740 证明。对应环境变量 `UV_PUBLISH_NO_ATTESTATIONS`。

## 环境变量

常用映射：`UV_PUBLISH_INDEX`（命名索引）、`UV_PUBLISH_URL`（上传端点）、`UV_PUBLISH_CHECK_URL`（重复上传检查）、`UV_PUBLISH_USERNAME`/`UV_PUBLISH_PASSWORD`/`UV_PUBLISH_TOKEN`（凭据）、`UV_PUBLISH_NO_ATTESTATIONS`（证明）、`UV_KEYRING_PROVIDER`。凭据类变量的取值在帮助中隐藏，避免泄漏。

## 使用提醒

- 上传是公开操作：文件一经发布通常无法覆盖同名更新，发布前建议先用 `--dry-run` 检查。
- 在 GitHub Actions 等受支持环境中优先使用可信发布，避免长期令牌；本地发布常用 `--token`。
- `--index`、`--publish-url`+`--check-url` 是两套等价配置入口，不能混用。
- 凭据不要写入命令行历史，优先通过环境变量或可信发布提供。

## 示例

上传 `dist` 目录中的分发物（默认目标为 PyPI）：

```console
$ uv publish
```

使用 PyPI 令牌上传指定文件：

```console
$ uv publish -t pypi-AgEIcHlwaS5vcmc publish-0.1.0.tar.gz publish-0.1.0-py3-none-any.whl
```

演练上传，并在重复时跳过：

```console
$ uv publish --dry-run --check-url https://pypi.org/simple
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令定义于 `Commands::Publish` 与 `PublishArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
