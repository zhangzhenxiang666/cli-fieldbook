---
title: gh extension exec
command:
  - extension
  - exec
---

执行已安装的扩展。

## 简介

按短名执行扩展：例如扩展仓库为 `owner/gh-extension` 时，应传入 `extension`。当短名与核心 gh 命令冲突时，可用本命令调用扩展。

扩展名之后的全部参数都会转发给扩展的可执行文件。

本命令是本地可执行扩展的执行入口，一般由扩展自身调用，通常不需要用户直接输入。

## 参数

### `NAME`

格式：`<name>`。要执行的扩展短名；其后的 `[args]` 原样转发给扩展，不在本页单独描述。

## 使用提醒

- 本命令禁用了旗标解析：`exec` 之后的全部参数——包括旗标形式——都原样转发给扩展，gh 自身不再解释。
- 找不到指定扩展时以 `extension "<名称>" not found` 形式报错。
- 扩展的安装与列出见 [`gh extension install`](cli:command:extension/install) 与 [`gh extension list`](cli:command:extension/list)。

## 示例

```sh
# 执行名为 label 的扩展，而不是核心 gh label 命令
gh extension exec label
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令为 [pkg/cmd/extension/command.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/extension/command.go) 中的字面量定义：`cobra.MinimumNArgs(1)` 要求至少一个参数，`DisableFlagParsing: true` 关闭旗标解析，实际执行交给扩展管理器的 `Dispatch`。
