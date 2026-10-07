---
title: gh extension upgrade
command:
  - extension
  - upgrade
---

升级已安装的扩展。

## 简介

升级指定的已安装扩展，或用 `--all` 升级全部。扩展名可写短名、`gh-` 前缀名或 `OWNER/gh-<名称>` 形式，gh 内部会归一化为短名。

`--dry-run` 只显示将要执行的升级，不实际改动。

升级成功时，连接终端的会话会输出成功检查标记。

## 参数

### `NAME|ALL`

格式：`{<name> | --all}`。要升级的扩展名，或改用 `--all` 旗标升级全部扩展；两者必须二选一，且至多给出一个名称。

## 选项

### `--all`

格式：`--all`。升级全部扩展。

### `--force`

格式：`--force`。强制升级扩展。

### `--dry-run`

格式：`--dry-run`。只显示升级。

## 使用提醒

- 既未给出扩展名也未给 `--all` 时报错；`--all` 与扩展名不能同用；名称至多一个。
- `--all` 且本地未安装任何扩展时，以无结果错误结束（`no installed extensions found`）。
- 固定在指定版本的扩展，其固定语义见 [`gh extension install`](cli:command:extension/install) 的 `--pin`。

## 示例

```sh
# 升级单个扩展
gh extension upgrade foobar

# 升级全部已安装的扩展
gh extension upgrade --all

# 只查看将要执行的升级
gh extension upgrade --all --dry-run
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 参数互斥检查（无参数且无 `--all`、`--all` 与名称同用、参数过多）与名称归一化（`normalizeExtensionSelector`）见 [pkg/cmd/extension/command.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/extension/command.go)。
