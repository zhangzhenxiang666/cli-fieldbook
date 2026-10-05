---
title: gh gist view
command:
  - gist
  - view
---

查看指定 gist 的内容，或从最近的 gist 中交互选择。

## 简介

`gh gist view` 显示 gist 内容。不带参数时，交互模式下会列出账号最近的 gist 供选择；非交互模式下必须给出 gist ID 或 URL，否则报错。

Markdown 文件默认渲染后输出，其余文件直接输出原始内容；用 `--raw` 可跳过渲染。输出到管道（非终端）时自动等效 `--raw`。包含多个文件的 gist 会按文件名逐个输出并标注文件名，也可用 `--files` 只列文件名、用 `--filename` 只看单个文件。二进制文件的内容不渲染，多文件 gist 中会跳过并提示。

输出默认经过分页器显示。

## 参数

### `ID|URL`

格式：`[<id> | <url>]`。要查看的 gist，接受 gist ID 或 URL 两种形式；省略时交互模式下从最近的 gist 中选择，非交互模式下报错。

## 选项

### `--raw`

短旗标 `-r`。格式：`--raw`。输出 gist 的原始内容，不做 Markdown 渲染。

### `--web`

短旗标 `-w`。格式：`--web`。在浏览器中打开该 gist，而不在终端输出。

### `--files`

格式：`--files`。只列出 gist 中的文件名。

### `--filename`

短旗标 `-f`。格式：`--filename <string>`。只显示 gist 中的这一个文件；gist 中不存在该文件时报错。

### `--allow-escape-sequences`

格式：`--allow-escape-sequences`。允许输出内容中的终端转义序列。默认情况下，原始内容输出到管道且含有转义序列时会拒绝输出并提示加本旗标。

## 环境变量

- `GLAMOUR_STYLE`：Markdown 渲染使用的样式，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 管道输出时无需 `--raw` 也自动输出原始内容；此时内容中的转义序列默认被拒绝，确需查看时加 `--allow-escape-sequences`。

## 示例

```sh
# 交互选择一个 gist 查看
gh gist view

# 查看指定 gist
gh gist view 5b0e0062eb8e9654adad7bb1d81cc75f

# 只列出 gist 中的文件名
gh gist view 5b0e0062eb8e9654adad7bb1d81cc75f --files

# 查看 gist 中的单个文件
gh gist view 5b0e0062eb8e9654adad7bb1d81cc75f --filename hello.py

# 不渲染直接输出原始内容
gh gist view 5b0e0062eb8e9654adad7bb1d81cc75f --raw
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、渲染分支与转义序列处理见 [pkg/cmd/gist/view/view.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/gist/view/view.go)。
