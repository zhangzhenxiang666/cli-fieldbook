---
title: gh pr close
command:
  - pr
  - close
---

关闭拉取请求。

## 简介

关闭一个打开的拉取请求。已合并的拉取请求无法关闭（报错）；已关闭的拉取请求仅输出提示。`--comment` 可在关闭时留下一条评论，`--delete-branch` 可在关闭后删除分支。

## 参数

### `NUMBER|URL|BRANCH`

必填，命令形态为 `{<number> | <url> | <branch>}`。定位目标拉取请求，三种形式：

- 数字：拉取请求编号，如 `123`；
- URL：拉取请求地址，如 `https://github.com/OWNER/REPO/pull/123`；
- 分支名：头部分支名，如 `patch-1`，跨仓库时可用 `OWNER:patch-1`。

## 选项

### `--comment`

短旗标 `-c`。格式：`--comment <string>`。留下一条关闭评论。

### `--delete-branch`

短旗标 `-d`。格式：`--delete-branch`。关闭后删除本地与远端分支。

## 使用提醒

- 参数必填：省略时报错"cannot close pull request: number, url, or branch required"。
- 使用 `-R` 指定仓库时只处理远端分支，不会删除本地分支。

## 示例

```sh
# 关闭指定拉取请求
$ gh pr close 23

# 关闭并留下评论
$ gh pr close 23 --comment "已由 #42 取代"

# 关闭后删除本地与远端分支
$ gh pr close 23 --delete-branch
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、已合并/已关闭状态检查与分支删除见 [pkg/cmd/pr/close/close.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/close/close.go)。
