---
title: gh repo deploy-key delete
command:
  - repo
  - deploy-key
  - delete
---

## 简介

从 GitHub 仓库中删除部署密钥，按 `<key-id>` 指定要删除的密钥。

## 参数

### `KEY-ID`

格式：`<key-id>`。要删除的部署密钥 ID，可从 [gh repo deploy-key list](cli:command:repo/deploy-key/list) 的输出获得。

## 使用提醒

- 本命令不要求确认，执行即删除。
- 继承 [gh repo deploy-key](cli:command:repo/deploy-key) 的 `--repo`。

## 示例

```sh
# 删除当前仓库的某个部署密钥
gh repo deploy-key delete 1234567
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [pkg/cmd/repo/deploy-key/delete/delete.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/deploy-key/delete/delete.go)。
