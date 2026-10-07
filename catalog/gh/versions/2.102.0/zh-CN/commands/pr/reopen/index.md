---
title: gh pr reopen
command:
  - pr
  - reopen
---

重新打开已关闭的拉取请求。

## 简介

重新打开一个已关闭的拉取请求。已合并的拉取请求无法重新打开（报错）；已处于打开状态的仅输出提示。`--comment` 可在重新打开时添加一条评论。

## 参数

### `NUMBER|URL|BRANCH`

必填，命令形态为 `{<number> | <url> | <branch>}`。定位目标拉取请求，三种形式：

- 数字：拉取请求编号，如 `123`；
- URL：拉取请求地址，如 `https://github.com/OWNER/REPO/pull/123`；
- 分支名：头部分支名，如 `patch-1`，跨仓库时可用 `OWNER:patch-1`。

## 选项

### `--comment`

短旗标 `-c`。格式：`--comment <string>`。添加一条重新打开的评论。

## 使用提醒

- 参数必填：省略时 cobra 报出需要恰好一个参数的错误。

## 示例

```sh
# 重新打开指定拉取请求
$ gh pr reopen 23

# 重新打开并添加评论
$ gh pr reopen 23 --comment "问题已修复，重新打开"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与已合并/已打开状态检查见 [pkg/cmd/pr/reopen/reopen.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/reopen/reopen.go)。
