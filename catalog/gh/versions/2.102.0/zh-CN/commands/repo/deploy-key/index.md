---
title: gh repo deploy-key
command:
  - repo
  - deploy-key
---

## 简介

管理仓库的部署密钥（deploy key）。部署密钥是授予对单个仓库访问权的 SSH 公钥；本组子命令负责列出、添加与删除部署密钥。

## 子命令导览

- [gh repo deploy-key list](cli:command:repo/deploy-key/list)：列出仓库中的部署密钥。
- [gh repo deploy-key add](cli:command:repo/deploy-key/add)：向仓库添加部署密钥。
- [gh repo deploy-key delete](cli:command:repo/deploy-key/delete)：按 ID 删除仓库中的部署密钥。

## 选项

### `--repo`

短旗标 `-R`。格式：`--repo <[HOST/]OWNER/REPO>`。以 `[HOST/]OWNER/REPO` 格式选择另一个仓库。该旗标注册在本组命令上，各子命令继承。

## 使用提醒

- 目标仓库默认从当前 git 仓库推断；也可用 `--repo` 或 `GH_REPO` 环境变量指定，见[环境变量](../../../reference/environment.md)。
- gh 添加的部署密钥会与当前认证令牌关联，详见 [gh repo deploy-key add](cli:command:repo/deploy-key/add)。

## 示例

```sh
# 列出当前仓库的部署密钥
gh repo deploy-key list

# 添加部署密钥并允许写入
gh repo deploy-key add ~/.ssh/id_ed25519.pub --allow-write
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与 `--repo` 注册（EnableRepoOverride）见 [pkg/cmd/repo/deploy-key/deploy-key.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/deploy-key/deploy-key.go)。
