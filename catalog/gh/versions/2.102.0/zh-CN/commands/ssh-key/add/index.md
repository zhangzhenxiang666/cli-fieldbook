---
title: gh ssh-key add
command:
  - ssh-key
  - add
---

向 GitHub 账号添加一个 SSH 公钥。

## 简介

读取 SSH 公钥并添加到当前认证主机的账号，可用 `--type` 选择添加为认证密钥（authentication，默认）或签名密钥（signing）；两者上传到 GitHub 的不同接口。省略 `<key-file>` 且标准输入不是终端时（例如管道），从标准输入读取公钥；在交互终端下省略文件参数会报错。

公钥已存在于账号时，命令提示密钥已存在并正常结束。

## 参数

### `KEY-FILE`

格式：`[<key-file>]`。公钥文件路径，可选；省略时在非交互场景下从标准输入读取。

## 选项

### `--type`

格式：`--type <string>`。SSH 密钥的类型。取值 `authentication`、`signing`；默认 `authentication`。

### `--title`

短旗标 `-t`。格式：`--title <string>`。新密钥的标题。

## 使用提醒

- 签名密钥用于提交签名，添加时须显式给 `--type signing`。
- 添加前可用 [`gh ssh-key list`](cli:command:ssh-key/list) 核对既有密钥，避免重复。

## 示例

```sh
# 把公钥作为认证密钥添加
gh ssh-key add ~/.ssh/id_ed25519.pub

# 添加签名密钥并指定标题
gh ssh-key add ~/.ssh/id_ed25519_signing.pub --type signing --title "签名密钥"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与按类型上传的分支见 [pkg/cmd/ssh-key/add/add.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/ssh-key/add/add.go)。
