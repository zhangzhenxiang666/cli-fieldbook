---
title: gh config get
command:
  - config
  - get
---

打印给定配置键的值。

## 简介

输出指定配置键的当前值。未显式设置的键输出默认值；键不存在时报错 `could not find key "<key>"`；值为空时不输出内容。

读取 `oauth_token` 且指定 `--host` 时，会从凭据存储（含系统密钥环）解析该主机的活动令牌后输出。

## 参数

### `KEY`

必填，写作 `<key>`。要读取的配置键名。

## 选项

### `--host`

短旗标 `-h`。格式：`--host <string>`。读取按主机生效的设置。

## 使用提醒

- 受支持的配置键清单见 [`gh config`](cli:command:config)。
- 键名写错不会命中任何配置，报"找不到键"错误。

## 示例

```sh
# 查看 git 协议配置
gh config get git_protocol

# 查看按主机生效的编辑器设置
gh config get editor --host github.com
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 取值与 `oauth_token` 的特殊处理见 [pkg/cmd/config/get/get.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/config/get/get.go)。
