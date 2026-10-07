---
title: gh repo read-dir
command:
  - repo
  - read-dir
---

## 简介

不克隆仓库，直接列出 GitHub 仓库中某个目录的内容。此命令处于预览阶段，可能随时变更。

默认从仓库的默认分支列出；用 `--ref` 可改为从指定分支、tag 或提交列出。不给 `<path>` 时列出仓库根目录。交互式终端下以 TYPE/NAME/SIZE 表格展示，目录与子模块不显示大小（以 `-` 代替），可执行文件在 TYPE 列以 `file*` 标示；stdout 被管道或重定向时，改为逐行输出制表符分隔的类型、名称、八进制权限与字节数，无表头。

## 参数

### `PATH`

格式：`[<path>]`。要列出的目录路径，可省略；省略时列出仓库根目录。

## 选项

### `--ref`

格式：`--ref <string>`。从指定的分支、tag 或提交列出目录。

### `--json`

格式：`--json <strings>`。按指定字段输出 JSON。可选字段：`name`、`path`、`nameRaw`、`pathRaw`、`type`、`gitType`、`mode`、`modeOctal`、`gitSHA`、`size`、`submodule`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。用 jq 表达式过滤 JSON 输出。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板格式化 JSON 输出，语法参见 `gh help formatting`。

### `--repo`

短旗标 `-R`。格式：`--repo <[HOST/]OWNER/REPO>`。以 `[HOST/]OWNER/REPO` 格式选择另一个仓库。

## 使用提醒

- 目标仓库默认从当前 git 仓库推断；不在 git 仓库中且未给 `--repo` 时报错。`GH_REPO` 环境变量亦可指定仓库，见[环境变量](../../../reference/environment.md)。
- `--template` 必须与 `--json` 同用；三个输出旗标的组合用法见 [JSON 输出与格式化](../../../reference/formatting.md)。
- 目录为空时向标准错误输出提示，不渲染表格。

## 示例

```sh
# 列出默认分支的根目录
gh repo read-dir --repo cli/cli

# 列出子目录
gh repo read-dir docs --repo cli/cli

# 列出指定 ref 下的目录
gh repo read-dir docs --repo cli/cli --ref v2.50.0

# 以 JSON 输出选定的字段
gh repo read-dir docs --repo cli/cli --json name,path,type,size
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、表格与制表符分隔两种输出路径见 [pkg/cmd/repo/read-dir/read_dir.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/read-dir/read_dir.go)。
