---
title: gh run download
command:
  - run
  - download
---

下载工作流运行生成的产物。

## 简介

`gh run download` 下载 GitHub Actions 工作流运行生成的产物（artifact）。每个产物的内容会解压到以产物名命名的独立目录；若只选中单个产物，则直接解压到当前目录。

默认（不带 `<run-id>` 且未给 `-n`/`-p`）下载经 GitHub Actions 创建并上传的最新产物；由于工作流可能删除或覆盖产物，要从特定运行中选取产物时必须给出 `<run-id>`。交互终端下不带任何选择条件运行时，会进入产物多选。

## 参数

### `RUN-ID`

格式：`[<run-id>]`。可选。要从哪个运行中下载产物。

## 选项

### `--dir`

短旗标 `-D`。格式：`--dir <string>`。产物下载到的目录，默认 `.`（当前目录）。

### `--name`

短旗标 `-n`。格式：`--name <strings>`。下载匹配任一给定名称的产物，可重复给出。

### `--pattern`

短旗标 `-p`。格式：`--pattern <strings>`。下载匹配 glob 模式的产物，可重复给出。

## 使用提醒

- 已过期（expired）的产物会被跳过；没有可下载的产物时报错。
- 交互多选时最多列出 10 个产物名。
- 只选中单个产物时解压到目标目录本身，多个产物（或未指定名称与模式）时各自解压到以产物名命名的子目录。

## 示例

```sh
# 下载某次运行的全部产物
gh run download <run-id>

# 下载运行中的指定产物
gh run download <run-id> -n <name>

# 在仓库的全部运行中下载指定名称的产物
gh run download -n <name1> -n <name2>

# 交互选择要下载的产物
gh run download
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、产物过滤与解压目录规则见 [pkg/cmd/run/download/download.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/run/download/download.go)。
