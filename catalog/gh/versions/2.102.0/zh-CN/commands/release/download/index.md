---
title: gh release download
command:
  - release
  - download
---

下载 release 的资产。

## 简介

未显式给出 tag 时，从项目最新的 release 下载，此时必须给出 `--pattern` 或 `--archive` 之一。`--pattern` 按 glob 模式筛选资产，可重复给出以匹配多个模式；`--archive` 直接下载 release 的源码归档（`zip` 或 `tar.gz`），两者互斥。

下载默认写入当前目录（`--dir` 可改），按固定并发 5 进行。目标位置已存在同名文件时默认报错，可用 `--clobber` 覆盖或 `--skip-existing` 跳过（两者互斥）。用 `--output` 把单个资产写入指定文件或标准输出（`-`）；匹配到多个资产时不能用 `--output`，`--dir` 与 `--output` 也不能同时指定。

向标准输出写资产时，内容中的终端转义序列默认会被拦截并报错，二进制内容写入终端同样报错；确有需要时用 `--allow-escape-sequences` 放行，或改用 `--output` 保存到文件。

## 参数

### `TAG`

格式：`[<tag>]`，可选。要下载的 release tag 名；省略时下载最新 release 的资产，且必须给出 `--pattern` 或 `--archive`。

## 选项

### `--output`

短旗标 `-O`。格式：`--output <file>`。把单个资产写入 `file`（`-` 表示写入标准输出）。

### `--dir`

短旗标 `-D`。格式：`--dir <directory>`。下载文件的存放目录，默认 `.`。

### `--pattern`

短旗标 `-p`。格式：`--pattern <strings>`。只下载匹配 glob 模式的资产，可重复给出。

### `--archive`

短旗标 `-A`。格式：`--archive <format>`。下载指定 `format`（`zip` 或 `tar.gz`）的源码归档。与 `--pattern` 互斥。

### `--clobber`

格式：`--clobber`。覆盖已存在的同名文件。

### `--skip-existing`

格式：`--skip-existing`。同名文件已存在时跳过下载。

### `--allow-escape-sequences`

格式：`--allow-escape-sequences`。向标准输出写资产时，允许打印其中的终端转义序列。

## 使用提醒

- 不带 tag 且未给 `--pattern` 或 `--archive` 时报错；给了 `--archive` 但取值不是 `zip` 或 `tar.gz` 也报错。
- release 没有资产时报 "no assets to download"；有资产但模式全不命中时报 "no assets match the file pattern"。
- 草稿 release 可能没有源码归档，此时 `--archive` 会报错并提示多半因为它是草稿。
- 目标仓库用继承选项 `-R`/`--repo` 切换；本命令禁用了统一的认证预检查。

## 示例

```sh
# 下载指定 release 的全部资产
gh release download v1.2.3

# 只下载最新 release 的 Debian 包
gh release download --pattern '*.deb'

# 指定多个文件模式
gh release download -p '*.deb' -p '*.rpm'

# 下载 release 的源码归档
gh release download v1.2.3 --archive=zip
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、互斥检查、文件名冲突处理与标准输出内容防护见 [pkg/cmd/release/download/download.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/download/download.go)。
- 源码归档下载会重写 Codeload 的 "legacy" URL 以获得与网页端一致的文件名；Windows 下还会拒绝保留名（如 `CON`、`NUL`）资产，防篡改细节同在该文件。
