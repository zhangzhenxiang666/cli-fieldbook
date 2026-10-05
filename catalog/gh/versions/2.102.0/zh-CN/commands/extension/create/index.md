---
title: gh extension create
command:
  - extension
  - create
---

创建新扩展。

## 简介

用脚手架模板创建新的扩展仓库。

不带名称运行且输出连接终端时，进入交互提示：先询问扩展名，再在三类模板中选择——脚本（Bash、Ruby、Python 等）、Go、其他预编译（C++、Rust 等），默认选中脚本类。`--precompiled` 可在非交互场景直接指定预编译类型。

名称无需 `gh-` 前缀；给出带前缀的名称时直接使用。创建过程会建立 `gh-<名称>` 同名目录、初始化 git 仓库并尝试首次提交、搭建扩展脚手架。Go 扩展的完成提示会列出下载 Go 依赖、构建二进制等检查项；其他预编译扩展的提示则要求填充 `script/build.sh` 构建脚本。完成后还会打印下一步建议（如 `cd <目录>; gh extension install .`）。

编写扩展的更多说明见 [GitHub 官方文档](https://docs.github.com/github-cli/github-cli/creating-github-cli-extensions)。

## 参数

### `NAME`

格式：`[<name>]`。新扩展的名称，可省略；省略且输出连接终端时改由交互提示输入。至多一个参数。

## 选项

### `--precompiled`

格式：`--precompiled <string>`。创建预编译扩展。可能取值：`go`、`other`；指定本旗标时必须是二者之一，否则报错。

## 使用提醒

- 不指定 `--precompiled` 时创建脚本模板扩展，这也是交互提示的默认选项。
- 交互提示只在输出连接终端时出现；非交互且不带名称时无法完成创建。
- 首次提交失败不中断创建，只在完成提示中把该检查项标为失败。

## 示例

```sh
# 交互式使用
gh extension create

# 创建脚本类扩展
gh extension create foobar

# 创建 Go 扩展
gh extension create --precompiled=go foobar

# 创建非 Go 的预编译扩展
gh extension create --precompiled=other foobar
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令、模板选择与完成提示内联于 [pkg/cmd/extension/command.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/extension/command.go)。
- 模板本体位于同提交的 `pkg/extensions` 包；`--precompiled` 的取值校验在命令内完成。
