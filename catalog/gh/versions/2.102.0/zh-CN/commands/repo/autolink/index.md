---
title: gh repo autolink
command:
  - repo
  - autolink
---

## 简介

管理仓库的自动链接（autolink reference）。自动链接可把议题、拉取请求、提交信息与 release 描述链接到外部第三方服务。

查看或管理自动链接需要仓库的 `admin` 角色。机制的官方说明见 [GitHub 文档](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/configuring-autolinks-to-reference-external-resources)。

## 子命令导览

- [gh repo autolink list](cli:command:repo/autolink/list)：列出仓库的自动链接。
- [gh repo autolink create](cli:command:repo/autolink/create)：创建新的自动链接。
- [gh repo autolink view](cli:command:repo/autolink/view)：查看某个自动链接。
- [gh repo autolink delete](cli:command:repo/autolink/delete)：删除某个自动链接。

## 选项

### `--repo`

短旗标 `-R`。格式：`--repo <[HOST/]OWNER/REPO>`。以 `[HOST/]OWNER/REPO` 格式选择另一个仓库。该旗标注册在本组命令上，各子命令继承。

## 使用提醒

- 目标仓库默认从当前 git 仓库推断；也可用 `--repo` 或 `GH_REPO` 环境变量指定，见[环境变量](../../../reference/environment.md)。
- 键前缀、URL 模板与 `<num>` 变量的匹配规则见 [gh repo autolink create](cli:command:repo/autolink/create)。

## 示例

```sh
# 列出当前仓库的自动链接
gh repo autolink list

# 创建键前缀为 TICKET- 的自动链接
gh repo autolink create TICKET- "https://example.com/TICKET?query=<num>"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、admin 角色要求与 `--repo` 注册见 [pkg/cmd/repo/autolink/autolink.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/autolink/autolink.go)。
