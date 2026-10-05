---
title: gh gpg-key add
command:
  - gpg-key
  - add
---

向 GitHub 账号添加一个 GPG 公钥。

## 简介

读取 ASCII-armored 格式的 GPG 公钥并添加到当前认证主机的账号。省略 `<key-file>` 且标准输入不是终端时（例如管道），从标准输入读取公钥；在交互终端下省略文件参数会报错。

密钥已存在时命令报错提示；格式可疑时提示密钥可能不是 ASCII-armored 格式，并给出用 `gpg --list-keys` 找到密钥 ID、再经管道上传的做法。上传需要令牌具有 `write:gpg_key` scope，缺少时命令会提示运行 `gh auth refresh -s write:gpg_key`。

## 参数

### `KEY-FILE`

格式：`[<key-file>]`。公钥文件路径，可选；省略时在非交互场景下从标准输入读取。

## 选项

### `--title`

短旗标 `-t`。格式：`--title <string>`。新密钥的标题。

## 使用提醒

- 公钥须为 ASCII-armored 格式，二进制导出会被识别为格式错误。
- 重复上传同一密钥会报错，可用 [`gh gpg-key list`](cli:command:gpg-key/list) 先核对。

## 示例

```sh
# 导出并以管道上传 GPG 公钥
gpg --armor --export <ID> | gh gpg-key add -

# 从文件添加并指定标题
gh gpg-key add mykey.asc --title "工作笔记本"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、输入读取与错误提示见 [pkg/cmd/gpg-key/add/add.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/gpg-key/add/add.go)。
