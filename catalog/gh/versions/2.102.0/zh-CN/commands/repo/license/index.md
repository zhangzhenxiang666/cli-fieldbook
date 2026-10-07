---
title: gh repo license
command:
  - repo
  - license
---

## 简介

探索仓库可用的许可证：列出常用许可证，或查看某个许可证的正文。许可证元数据经 GitHub API 按默认主机获取，内容对应 choosealicense.com。

## 子命令导览

- [gh repo license list](cli:command:repo/license/list)：列出常用的仓库许可证。
- [gh repo license view](cli:command:repo/license/view)：按 license key 或 SPDX ID 查看具体许可证。

## 使用提醒

- 常用许可证之外的更多许可证见 <https://choosealicense.com/appendix>（list 子命令的帮助亦注明）。

## 示例

```sh
# 列出常用许可证
gh repo license list

# 用 MIT 许可证正文生成 LICENSE.md
gh repo license view MIT > LICENSE.md
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [pkg/cmd/repo/license/license.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/license/license.go)。
