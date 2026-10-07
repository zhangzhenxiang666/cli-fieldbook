---
title: gh config list
command:
  - config
  - list
---

列出配置键及其当前值。

## 简介

逐行输出全部受支持的配置键及当前取值，格式为 `key=value`。清单覆盖所有受支持的键（不只是显式设置过的），未设置的键输出默认值。默认列出默认主机（通常是 `github.com`）的取值，用 `--host` 改查其他主机。

## 参数

本命令不接受位置参数。

## 选项

### `--host`

短旗标 `-h`。格式：`--host <string>`。列出按该主机生效的配置。

## 使用提醒

- 等价写法：`gh config ls`。
- 键的含义与合法取值见 [`gh config`](cli:command:config)。

## 示例

```sh
# 列出全部配置
gh config list

# 列出某主机的配置
gh config list --host github.com
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 遍历配置键表并输出当前值的逻辑见 [pkg/cmd/config/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/config/list/list.go)。
