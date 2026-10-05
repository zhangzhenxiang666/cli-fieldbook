---
title: gh extension browse
command:
  - extension
  - browse
---

进入浏览、添加与移除扩展的交互式界面。

## 简介

本命令会接管终端，运行一个全交互界面，用于浏览、添加与移除 gh 扩展；建议终端宽度大于 100 列。

界面内的操作方式可在运行后按 `?` 查看帮助文本。按 `q` 退出。

以 `--single-column` 运行时界面渲染为单列文本，对依赖屏幕阅读器、高倍缩放等辅助技术的用户更易读。

更传统的扩展发现方式是用 `gh ext search`，配合 `gh ext install`、`gh ext remove` 与 `gh repo view`。

## 选项

### `--debug`

格式：`--debug`。把日志写入 /tmp/extBrowse-*。

### `--single-column`

短旗标 `-s`。格式：`--single-column`。以单列文本渲染 TUI。

## 使用提醒

- 本命令运行交互式 UI，必须在可提示的终端中运行；无法交互（如输出被重定向）时直接报错。
- 不接受位置参数（`cobra.NoArgs`）。
- 交互界面中的添加与移除等价于 [`gh extension install`](cli:command:extension/install) 与 [`gh extension remove`](cli:command:extension/remove)。

## 示例

```sh
# 进入扩展浏览界面
gh extension browse

# 以单列模式运行，便于辅助技术读取
gh extension browse --single-column
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与可交互终端检查内联于 [pkg/cmd/extension/command.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/extension/command.go)。
- 界面主体实现在同提交的 `pkg/cmd/extension/browse` 包中，本页未展开其细节。
