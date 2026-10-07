---
title: gh repo deploy-key add
command:
  - repo
  - deploy-key
  - add
---

## 简介

向 GitHub 仓库添加部署密钥。

注意：gh 添加的任何密钥都会关联到当前认证令牌。如果从账号撤销 GitHub CLI 应用或认证令牌的授权，GitHub CLI 添加的部署密钥也会一并移除。

`<key-file>` 传 `-` 时改从标准输入读取公钥。成功后在交互式终端输出确认信息。

## 参数

### `KEY-FILE`

格式：`<key-file>`。SSH 公钥文件路径；传 `-` 时从标准输入读取。

## 选项

### `--title`

短旗标 `-t`。格式：`--title <string>`。新密钥的标题。

### `--allow-write`

短旗标 `-w`。格式：`--allow-write`。允许密钥写入。

## 使用提醒

- 新密钥默认只读，需要写权限时加 `--allow-write`。
- 继承 [gh repo deploy-key](cli:command:repo/deploy-key) 的 `--repo`；密钥的列出与删除见 [gh repo deploy-key list](cli:command:repo/deploy-key/list) 与 [gh repo deploy-key delete](cli:command:repo/deploy-key/delete)。

## 示例

```sh
# 生成无口令的 SSH 密钥，并把它作为部署密钥添加到仓库
ssh-keygen -t ed25519 -C "my description" -N "" -f ~/.ssh/gh-test
gh repo deploy-key add ~/.ssh/gh-test.pub
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、令牌关联说明与标准输入读取见 [pkg/cmd/repo/deploy-key/add/add.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/deploy-key/add/add.go)。
