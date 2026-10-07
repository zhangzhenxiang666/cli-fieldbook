---
title: gh extension list
command:
  - extension
  - list
---

列出已安装的扩展命令；别名 `gh extension ls`。

## 简介

以表格列出本地已安装的扩展，三列依次为：命令名（形如 `gh <扩展名>`）、来源仓库（`OWNER/REPO`）与当前版本。

用 `--pin` 固定的扩展，其版本列会着色显示（连接终端时）。非二进制扩展的版本号长于 8 个字符时，只显示前 8 个字符。

未安装任何扩展时，本命令以无结果错误结束（`no installed extensions found`）。

## 使用提醒

- 本命令不接受位置参数，也没有本地选项。
- 只列出本地已安装的扩展；搜索可安装的扩展用 [`gh extension search`](cli:command:extension/search)。
- 安装与固定版本用 [`gh extension install`](cli:command:extension/install)，升级用 [`gh extension upgrade`](cli:command:extension/upgrade)。

## 示例

```sh
# 列出已安装的扩展
gh extension list

# 使用别名
gh ext ls
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令为 [pkg/cmd/extension/command.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/extension/command.go) 中的字面量定义，`cobra.NoArgs` 禁止位置参数。
- 版本截断规则（非二进制扩展超过 8 个字符时截断）见同文件 `displayExtensionVersion`。
