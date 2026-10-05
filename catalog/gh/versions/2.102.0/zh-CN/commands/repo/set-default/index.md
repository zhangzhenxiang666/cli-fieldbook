---
title: gh repo set-default
command:
  - repo
  - set-default
---

配置当前目录查询 GitHub API 时使用的默认远端仓库。

## 简介

本命令为本地克隆的仓库设置默认远端仓库。gh 在下列场景使用默认仓库：

- 查看与创建拉取请求
- 查看与创建议题
- 查看与创建 release
- 操作 GitHub Actions

注意：gh 不使用默认仓库管理仓库机密与环境机密。

不带参数交互运行时，从本地 git 远端解析出的仓库网络中选择默认仓库；只解析到一个已知仓库时直接选用。参数也可以是 git 远端名称，此时取该远端对应的仓库。`--view` 查看当前默认仓库，`--unset` 取消设置。

## 参数

### `REPOSITORY`

可选，写作 `[<repository>]`。要设为默认的仓库（`OWNER/REPO` 形式），或本地 git 远端名称。给出的仓库必须对应本地某个 git 远端。

## 选项

### `--view`

短旗标 `-v`。格式：`--view`。查看当前的默认仓库。

### `--unset`

短旗标 `-u`。格式：`--unset`。取消当前的默认仓库设置。

## 使用提醒

- 必须在 git 仓库内运行，否则报错。
- 非交互模式且未给出 `--view`、`--unset` 与仓库参数时报错。
- 交互选择列表来自本地 git 远端；想看到更多选项，可先用 `git remote add` 添加远端再运行本命令。

## 示例

```sh
# 交互式选择默认仓库
gh repo set-default

# 显式指定仓库
gh repo set-default owner/repo

# 用 git 远端名称指定仓库
gh repo set-default origin

# 查看当前默认仓库
gh repo set-default --view

# 在交互选择器中显示更多仓库选项
git remote add newrepo https://github.com/owner/repo
gh repo set-default
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 仓库参数解析（`OWNER/REPO` 或远端名）、交互选择与远端解析写入见 [pkg/cmd/repo/setdefault/setdefault.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/setdefault/setdefault.go)。
