---
title: gh repo clone
command:
  - repo
  - clone
---

克隆 GitHub 仓库到本地，可在 `--` 之后透传 `git clone` 旗标。

## 简介

`gh repo clone` 解析仓库参数后调用 `git clone`。仓库参数中省略 `OWNER/` 部分时，默认为当前认证用户的仓库。

参数不含协议方案时，克隆协议取自 `git_protocol` 配置（可用 [`gh config get`](cli:command:config/get) 查看）；参数以 URL 形式给出协议方案时，按指定协议克隆。

克隆的仓库是复刻时，其父仓库会被添加为名为 `upstream` 的额外 git 远端，并被设为默认仓库（参见 [`gh repo set-default`](cli:command:repo/set-default)）。远端名称可用 `--upstream-remote-name` 配置，该选项支持 `@owner` 值，即以父仓库所有者命名远端。要跳过这一行为，使用 `--no-upstream`。

## 参数

### `REPOSITORY`

必填，写作 `<repository>`。要克隆的仓库，形式为 `OWNER/REPO` 或 URL。

### `DIRECTORY`

可选，写作 `[<directory>]`。克隆目标目录，透传给 `git clone`。

### `GITFLAGS`

可选，写作 `[-- <gitflags>...]`。列在 `--` 之后的额外 `git clone` 旗标与参数。

## 选项

### `--upstream-remote-name`

短旗标 `-u`。格式：`--upstream-remote-name <string>`。克隆复刻时父仓库远端的名称，默认 `upstream`；支持 `@owner` 值。

### `--no-upstream`

格式：`--no-upstream`。克隆复刻时不添加父仓库远端。

## 使用提醒

- `--upstream-remote-name` 与 `--no-upstream` 互斥。
- 仓库名以 `.wiki` 结尾（如 `OWNER/REPO.wiki`）时克隆对应 wiki 仓库；该仓库未启用 wiki 时报错。
- 直接把旗标传给 `gh repo clone` 而非放在 `--` 之后会报错，错误信息会提示用 `--` 分隔 `git clone` 旗标。

## 示例

```sh
# 克隆指定组织的仓库
gh repo clone cli/cli

# 克隆当前认证用户自己的仓库
gh repo clone myrepo

# 克隆仓库并覆盖 git 协议配置
gh repo clone https://github.com/cli/cli
gh repo clone git@github.com:cli/cli.git

# 克隆仓库到自定义目录
gh repo clone cli/cli workspace/cli

# 克隆仓库并附加 git clone 旗标
gh repo clone cli/cli -- --depth=1

# 克隆复刻但不添加 upstream 远端
gh repo clone myfork --no-upstream
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 参数解析、URL 规整、复刻远端处理见 [pkg/cmd/repo/clone/clone.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/clone/clone.go)。
- 克隆前会经 API 获取仓库的规范大小写名称，再据此构造克隆 URL。
