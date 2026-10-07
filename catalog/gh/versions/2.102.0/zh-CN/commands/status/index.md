---
title: gh status
command:
  - status
---

汇总打印当前用户在各订阅仓库中相关的议题、拉取请求与通知概览。

## 简介

`gh status` 汇总你在 GitHub 上的相关工作，覆盖你订阅的全部仓库，包括：

- 指派给你的议题（Assigned Issues）
- 指派给你的拉取请求（Assigned Pull Requests）
- 向你请求的评审（Review Requests）
- 提及你的评论（Mentions）
- 仓库动态（Repository Activity，新议题/拉取请求与评论）

输出为多区块表格：上方左右并排展示指派议题与指派拉取请求，第二行并排展示评审请求与提及，仓库动态独占整行。前四个区块各最多显示 5 条，仓库动态最多显示 10 条；空区块显示 `Nothing here ^_^`。数据并行取自搜索、通知与收到的事件接口。

## 参数

本命令不接受位置参数。

## 选项

### `--org`

短旗标 `-o`。格式：`--org <string>`。只汇总某个组织内的状态。

### `--exclude`

短旗标 `-e`。格式：`--exclude <strings>`。以 `owner/name` 格式指定要排除的仓库列表，逗号分隔，也可重复给出。默认为空列表。

## 环境变量

- `GH_HOST`：指定目标 GitHub 主机，状态按该主机查询；见[环境变量](../../reference/environment.md)。

## 使用提醒

- 需要单点登录（SSO）授权才能访问的资源获取失败时，相应警告汇总显示在输出末尾，其余部分照常展示。
- 查询当前用户名与提及评论时会使用带缓存的 HTTP 客户端，重复运行不会重复请求这些数据。
- 想长期关注某仓库的动态，可先把该仓库加入订阅（watch），再运行本命令。

## 示例

```sh
# 排除多个仓库
gh status -e cli/cli -e cli/go-gh

# 只看单个组织内的状态
gh status -o cli
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 各区块的数据来源（搜索、通知、收到的事件）、并行加载与表格渲染见 [pkg/cmd/status/status.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/status/status.go)。
