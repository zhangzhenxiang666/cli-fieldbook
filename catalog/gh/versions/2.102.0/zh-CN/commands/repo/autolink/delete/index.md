---
title: gh repo autolink delete
command:
  - repo
  - autolink
  - delete
---

## 简介

删除仓库的某个自动链接。

交互式终端下先显示该自动链接的键前缀并请求确认；`--yes` 跳过确认。非交互环境（无法提示）下必须给 `--yes`，否则报错。

## 参数

### `ID`

格式：`<id>`。要删除的自动链接 ID，可从 [gh repo autolink list](cli:command:repo/autolink/list) 的输出获得。

## 选项

### `--yes`

格式：`--yes`。确认删除而不提示。

## 使用提醒

- 脚本与非交互场景务必带 `--yes`。
- 继承 [gh repo autolink](cli:command:repo/autolink) 的 `--repo`。

## 示例

```sh
# 交互确认后删除自动链接
gh repo autolink delete 1

# 免确认删除
gh repo autolink delete 1 --yes
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 确认流程与非交互校验见 [pkg/cmd/repo/autolink/delete/delete.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/autolink/delete/delete.go)。
