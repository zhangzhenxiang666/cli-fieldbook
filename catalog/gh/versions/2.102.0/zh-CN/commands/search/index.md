---
title: gh search
command:
  - search
---

跨 GitHub 全站搜索。`gh search` 自身是分组命令，不直接执行搜索，而是提供分别针对代码、提交、议题、拉取请求与仓库的五个子命令。

## 简介

各子命令构造查询的方式一致：既可以把 GitHub 搜索语法的关键词与限定符（`qualifier:value` 形式）作为参数直接传入，也可以使用等价的限定符旗标（如 `--author`、`--label`），或把两者组合起来；`--web` 则把生成的查询改为在浏览器中打开。

GitHub 搜索语法支持在限定符前加连字符来排除匹配该限定符的结果，例如用 `-label:bug` 搜索不带 `bug` 标签的议题。`gh search` 同样支持这种写法，但这样的查询以连字符开头，会被命令行先解析为旗标，因此需要额外的分隔写法：

- 类 Unix 系统：在查询前使用 `--` 参数，表示其后的内容是查询字符串而不是旗标，例如 `gh search issues -- "my-search-query -label:bug"`。
- PowerShell：除 `--` 外还必须使用停止解析符 `--%`，例如 `gh --% search issues -- "my search query -label:bug"`。

搜索语法的更多说明见官方文档 [Understanding the search syntax](https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax#exclude-results-that-match-a-qualifier)。

## 子命令导览

- [gh search code](cli:command:search/code)：在 GitHub 仓库的代码中搜索。
- [gh search commits](cli:command:search/commits)：搜索提交。
- [gh search issues](cli:command:search/issues)：搜索议题，可用 `--include-prs` 把拉取请求一并纳入。
- [gh search prs](cli:command:search/prs)：搜索拉取请求。
- [gh search repos](cli:command:search/repos)：搜索仓库。

## 使用提醒

- 每个子命令都要求至少给出搜索关键词或一个旗标，否则直接报错。
- 每个子命令的 `--limit` 取值都必须在 1 到 1000 之间，这是 GitHub 搜索 API 的结果数上限。
- 搜索结果为空且未用 `--json` 导出时，命令以失败结束并提示没有匹配结果。

## 示例

以 `-label:bug` 为例展示排除限定符的写法：

```sh
# 类 Unix 系统：用 -- 分隔，搜索不带 bug 标签的议题
gh search issues -- "my-search-query -label:bug"

# PowerShell：还需 --% 停止解析符
gh --% search issues -- "my search query -label:bug"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 分组定义与排除限定符写法的完整说明见 [pkg/cmd/search/search.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/search/search.go)。
