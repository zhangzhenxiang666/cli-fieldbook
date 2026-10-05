---
title: gh gist clone
command:
  - gist
  - clone
---

把 GitHub gist 克隆到本地，得到一个 git 仓库。

## 简介

`gh gist clone` 以 gist ID 或 URL 为目标执行本地克隆。传入 ID 时，gh 按配置的默认主机与 git 协议（`ssh` 或 `https`）构造 gist 的克隆地址，GitHub.com 与企业版主机均可；传入 URL 时直接使用该地址。

要向 `git clone` 追加旗标（如 `--depth`），必须在 `--` 之后列出，见下方参数 `GITFLAGS`。

## 参数

### `GIST`

格式：`<gist>`。要克隆的 gist，接受 gist ID 或 URL 两种形式。省略时命令报错。

### `DIRECTORY`

格式：`[<directory>]`。克隆到哪个本地目录；省略时由 `git clone` 按 gist 名称自行决定。

### `GITFLAGS`

格式：`[-- <gitflags>...]`。写在 `--` 之后的全部内容会原样透传给 `git clone`，可用来控制浅克隆、分支等行为；直接把这些旗标写在 `--` 之前会因 gh 无法识别而报错，错误信息会提示用 `--` 分隔。

## 使用提醒

- gist 克隆下来是普通 git 仓库，可以提交并推送回 gist。
- 克隆地址的协议遵循 gh 配置的 git 协议，可用 `gh config set git_protocol` 调整。

## 示例

```sh
# 按 gist ID 克隆
gh gist clone 5b0e0062eb8e9654adad7bb1d81cc75f

# 按 URL 克隆到指定目录
gh gist clone https://gist.github.com/OWNER/5b0e0062eb8e9654adad7bb1d81cc75f mygist

# 透传 git 旗标做浅克隆
gh gist clone 5b0e0062eb8e9654adad7bb1d81cc75f -- --depth 1
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、ID 到克隆地址的构造与旗标错误提示见 [pkg/cmd/gist/clone/clone.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/gist/clone/clone.go)。
