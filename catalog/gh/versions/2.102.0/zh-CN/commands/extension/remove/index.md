---
title: gh extension remove
command:
  - extension
  - remove
---

移除已安装的扩展；别名 `gh extension uninstall`。

## 简介

按名称移除本地已安装的扩展。名称会先归一化为短名：`OWNER/gh-<名称>`、`gh-<名称>` 与短名三种形式均可。成功后连接终端时输出确认信息。

## 参数

### `NAME`

格式：`<name>`。要移除的扩展名，恰好一个；支持 `OWNER/gh-<名称>`、`gh-<名称>` 或短名形式。

## 使用提醒

- 本命令恰好接受一个参数（`cobra.ExactArgs(1)`），没有本地选项。
- 移除只影响本地安装，不改动扩展的远端仓库；重新安装用 [`gh extension install`](cli:command:extension/install)。
- 查看当前已安装的扩展用 [`gh extension list`](cli:command:extension/list)。

## 示例

```sh
# 移除一个扩展
gh extension remove foobar

# 使用别名与完整名称形式
gh extension uninstall gh-foobar
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令为 [pkg/cmd/extension/command.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/extension/command.go) 中的字面量定义，`cobra.ExactArgs(1)` 限定参数个数，名称归一化见同文件 `normalizeExtensionSelector`。
