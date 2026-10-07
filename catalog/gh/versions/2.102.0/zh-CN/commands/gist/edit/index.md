---
title: gh gist edit
command:
  - gist
  - edit
---

编辑自己拥有的 gist：更新描述、修改文件内容或增删文件。

## 简介

`gh gist edit` 只能编辑当前账号拥有的 gist，操作他人的 gist 会报错。不带参数时，交互模式下会列出最近的 gist 供选择，非交互模式下报错。

默认在文本编辑器中编辑文件内容；编辑器按 `GH_EDITOR`、`GIT_EDITOR`、`VISUAL`、`EDITOR` 的顺序确定。gist 包含多个文件且以交互模式运行时，编辑完一个文件会继续提示编辑下一个、提交或取消。也可把第二个位置参数指定为本地文件，用其内容直接替换 gist 中对应文件的内容，`-` 表示从标准输入读取。

`--add` 与 `--remove` 用于向 gist 增加或删除文件；`--desc` 单独用于更新描述，可与编辑操作分开使用。

## 参数

### `ID|URL`

格式：`{<id> | <url>}`。要编辑的 gist，接受 gist ID 或 URL 两种形式；省略时交互模式下从最近的 gist 中选择，非交互模式下报错。

### `FILENAME`

格式：`[<filename>]`。本地源文件路径；给出时不打开编辑器，直接用该文件的内容替换 gist 中待编辑文件的内容，`-` 表示从标准输入读取。

## 选项

### `--add`

短旗标 `-a`。格式：`--add <string>`。以给定名称向 gist 添加新文件，内容默认取自同名的本地文件，也可用第二个位置参数指定其他来源文件或 `-`（标准输入）；与 `--remove` 互斥。

### `--desc`

短旗标 `-d`。格式：`--desc <string>`。gist 的新描述。

### `--filename`

短旗标 `-f`。格式：`--filename <string>`。选择 gist 中要编辑的文件；省略时，gist 只有一个文件则直接编辑它，多个文件时交互模式下提示选择、非交互模式下报错。与 `--remove` 互斥。

### `--remove`

短旗标 `-r`。格式：`--remove <string>`。从 gist 中删除指定文件；gist 中不存在该文件时报错。与 `--add`、`--filename` 互斥。

## 环境变量

- `GH_EDITOR`、`GIT_EDITOR`、`VISUAL`、`EDITOR`（按优先级）：编辑 gist 内容使用的编辑器，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 编辑器修改仅在内容确有变化时提交更新；全部取消时不发起更新。
- 二进制文件不支持编辑。

## 示例

```sh
# 交互选择 gist 编辑
gh gist edit

# 在默认编辑器中编辑 gist 文件
gh gist edit 1234567890abcdef1234567890abcdef

# 编辑 gist 中的指定文件
gh gist edit 1234567890abcdef1234567890abcdef --filename hello.py

# 用本地文件的内容替换 gist 文件
gh gist edit 1234567890abcdef1234567890abcdef --filename hello.py hello.py

# 向 gist 添加新文件
gh gist edit 1234567890abcdef1234567890abcdef --add newfile.py

# 修改 gist 的描述
gh gist edit 1234567890abcdef1234567890abcdef --desc "new description"

# 从 gist 删除文件
gh gist edit 1234567890abcdef1234567890abcdef --remove hello.py
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、互斥旗标与编辑流程见 [pkg/cmd/gist/edit/edit.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/gist/edit/edit.go)。
