---
title: gh repo license list
command:
  - repo
  - license
  - list
---

## 简介

列出常用的仓库许可证。别名 `ls`。

以表格输出 LICENSE KEY、SPDX ID 与 LICENSE NAME 三列，经分页器显示。更多许可证见 <https://choosealicense.com/appendix>。

## 使用提醒

- 本命令不接受位置参数，也没有本地选项。
- 查看某个许可证的正文用 [gh repo license view](cli:command:repo/license/view)。

## 示例

```sh
# 列出常用许可证
gh repo license list
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 表格列与 API 调用见 [pkg/cmd/repo/license/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/license/list/list.go)。
