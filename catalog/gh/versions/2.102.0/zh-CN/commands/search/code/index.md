---
title: gh search code
command:
  - search
  - code
---

在 GitHub 仓库的代码中搜索匹配的文件与文本片段。

## 简介

本命令支持三种构造查询的方式：GitHub 搜索语法（关键词与 `path:`、`language:` 等限定符）、限定符旗标，或两者组合；搜索语法见官方文档 [Searching code](https://docs.github.com/search-github/searching-on-github/searching-code)。

注意：这些搜索结果由旧版 GitHub 代码搜索引擎提供，可能与 `github.com` 网页端看到的（新版代码搜索）结果不一致，正则搜索等新特性也尚未通过 GitHub API 开放。

查询中包含以连字符开头的限定符（如 `-label:bug`）时的处理方式，见 [`gh search`](cli:command:search)。

## 参数

### `QUERY`

格式：`<query>`。搜索关键词或 GitHub 搜索语法表达式，可由多个词项组成；至少要给出关键词或一个旗标，否则报错。

## 选项

### `--json`

格式：`--json <strings>`。把结果导出为 JSON，值为逗号分隔的字段列表。支持字段：`path`、`repository`、`sha`、`textMatches`、`url`。导出结果可用 `--jq` 或 `--template` 进一步加工，见 [JSON 输出与格式化](../../../reference/formatting.md)。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。按 jq 表达式筛选或重组 `--json` 导出的结果，需与 `--json` 同用。

### `--template`

短旗标 `-t`。格式：`--template <string>`。按 Go 模板渲染 `--json` 导出的结果，需与 `--json` 同用。

### `--web`

短旗标 `-w`。格式：`--web`。不在终端输出结果，而是在浏览器中打开本次搜索查询。

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。最多获取的代码结果条数，默认 `30`；取值须在 1 到 1000 之间，超出范围报错。

### `--extension`

格式：`--extension <string>`。按文件扩展名过滤。

### `--filename`

格式：`--filename <string>`。按文件名过滤。

### `--match`

格式：`--match <strings>`。把关键词匹配限定到文件内容或文件路径，取值 `file`、`path`。

### `--language`

格式：`--language <string>`。按编程语言过滤结果。

### `--repo`

短旗标 `-R`。格式：`--repo <OWNER/REPO>`。按 `OWNER/REPO` 格式的仓库过滤，可多次给出。

### `--size`

格式：`--size <string>`。按文件大小范围过滤，单位为 KB。

### `--owner`

格式：`--owner <strings>`。按仓库所有者过滤，可给出多个。

## 使用提醒

- 至少给出搜索关键词或一个旗标，否则命令报错。
- 搭配 `--web` 时，`--filename` 与 `--extension` 会被合并转换为新代码搜索的 `path` 限定符（GitHub Enterprise Server 主机除外，因其尚不支持该限定符）。
- 搜索结果为空且未用 `--json` 导出时，命令以失败结束并提示没有匹配的代码结果。

## 示例

```sh
# 搜索同时匹配 "react" 与 "lifecycle" 的代码
gh search code react lifecycle

# 搜索匹配短语 "error handling" 的代码
gh search code "error handling"

# 用原始搜索限定符作为独立参数搜索
gh search code panic path:pkg language:go

# 在 Python 文件中搜索 "deque"
gh search code deque --language=python

# 搜索 microsoft 组织名下仓库中匹配 "cli" 的代码
gh search code cli --owner=microsoft

# 在 GitHub CLI 仓库中搜索 "panic"
gh search code panic --repo cli/cli

# 在 package.json 文件中搜索关键字 "lint"
gh search code lint --filename package.json
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、结果展示与 `--web` 下的限定符转换见 [pkg/cmd/search/code/code.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/search/code/code.go)。
