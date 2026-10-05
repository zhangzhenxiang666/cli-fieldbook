---
title: gh repo read-file
command:
  - repo
  - read-file
---

## 简介

不克隆仓库，直接读取 GitHub 仓库中单个文件的内容。此命令处于预览阶段，可能随时变更。

默认从仓库的默认分支读取；用 `--ref` 可改为从指定分支、tag 或提交读取。交互式终端下经分页器显示内容；stdout 被管道或重定向时直接写出原始内容；要保存到磁盘则用 `--output`。

默认拒绝输出包含终端转义序列的文件，以防其操纵终端；`--allow-escape-sequences` 可强制读取。该检查只作用于终端与管道输出，用 `--output` 写盘时始终保留原始字节（等效于已给该旗标）。

## 参数

### `PATH`

格式：`<path>`。要读取的文件路径，必需。

## 选项

### `--ref`

格式：`--ref <string>`。从指定的分支、tag 或提交读取文件。

### `--output`

短旗标 `-o`。格式：`--output <path>`。把文件写入指定 `path` 而非 stdout。

### `--clobber`

格式：`--clobber`。覆盖已存在的输出路径。

### `--allow-escape-sequences`

格式：`--allow-escape-sequences`。允许打印终端转义序列。

### `--json`

格式：`--json <strings>`。按指定字段输出 JSON。可选字段：`name`、`path`、`gitSHA`、`size`、`url`、`htmlUrl`、`gitUrl`、`downloadUrl`、`type`、`encoding`、`content`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。用 jq 表达式过滤 JSON 输出。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板格式化 JSON 输出，语法参见 `gh help formatting`。

### `--repo`

短旗标 `-R`。格式：`--repo <[HOST/]OWNER/REPO>`。以 `[HOST/]OWNER/REPO` 格式选择另一个仓库。

## 使用提醒

- `--json` 与 `--output` 互斥，只能二选一。
- 检测为二进制的文件在交互式终端下报错，提示改用 `--output` 保存或用管道输出；管道场景则直接写出原始字节。
- 输出路径已存在时须加 `--clobber` 才会覆盖；`--output` 指向目录（或以路径分隔符结尾）时，按远端文件名写入该目录；输出路径为符号链接时被拒绝。
- `--template` 必须与 `--json` 同用；组合用法见 [JSON 输出与格式化](../../../reference/formatting.md)。

## 示例

```sh
# 读取默认分支上的文件
gh repo read-file README.md --repo cli/cli

# 读取指定 ref 上的文件
gh repo read-file README.md --repo cli/cli --ref v2.50.0

# 把文件保存到磁盘
gh repo read-file README.md --repo cli/cli --output download/README.md

# 以 JSON 输出选定的字段
gh repo read-file README.md --repo cli/cli --json name,path,size,type

# 读取包含终端转义序列的文件
gh repo read-file path/to/file --repo OWNER/REPO --allow-escape-sequences
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、转义序列防护与输出路径处理见 [pkg/cmd/repo/read-file/read_file.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/read-file/read_file.go)。
- 过大的文件 Contents API 不内联返回内容（encoding 为 `none`），此时命令会再按原始内容接口取回字节，见同文件 `loadContent`。
