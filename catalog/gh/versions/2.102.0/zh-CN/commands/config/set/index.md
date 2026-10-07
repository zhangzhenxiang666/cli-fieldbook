---
title: gh config set
command:
  - config
  - set
---

为给定配置键设置新值。

## 简介

更新配置文件中指定键的值并写回磁盘。设置未知键时命令仍会执行，但在标准错误输出警告 `warning: '<key>' is not a known configuration key`；键有合法取值集合时，值不在集合内会报错并列出合法值。

## 参数

### `KEY`

必填，写作 `<key>`。要设置的配置键名。

### `VALUE`

必填，写作 `<value>`。要写入的值。

## 选项

### `--host`

短旗标 `-h`。格式：`--host <string>`。按主机设置该键。

## 使用提醒

- 设置 `api_host` 必须配合 `--host`，否则报错；设置 `clipboard` 不能配合 `--host`，否则报错。
- 值含空格等特殊字符时注意加引号，如 `gh config set editor "code --wait"`。
- 受支持的配置键与合法取值清单见 [`gh config`](cli:command:config)。

## 示例

```sh
gh config set editor vim
gh config set editor "code --wait"
gh config set git_protocol ssh --host github.com
gh config set api_host api-gateway.example.com --host example.com
gh config set prompt disabled
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 键校验、取值校验与作用域检查见 [pkg/cmd/config/set/set.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/config/set/set.go)。
