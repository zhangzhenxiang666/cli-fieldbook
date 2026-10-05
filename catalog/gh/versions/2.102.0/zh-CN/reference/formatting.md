---
title: JSON 输出与格式化
---

支持 `--json` 的命令可把结果导出为 JSON，并经 `--jq` 或 `--template` 进一步加工。本页整理自固定提交的帮助主题 `gh help formatting`（[pkg/cmd/root/help_topic.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/root/help_topic.go)）。

## 三个旗标的分工

- `--json <字段列表>`：必填，逗号分隔的导出字段。省略字段值运行命令可查看该命令支持的字段名。
- `--jq <表达式>`：按 [jq 查询语法](https://jqlang.github.io/jq/manual/)筛选或重组 JSON；系统无需安装 jq。连接终端时自动美化输出。
- `--template <模板>`：按 Go 模板语法渲染；必须先给 `--json`。

三者由 [`AddJSONFlags`](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/json_flags.go) 统一注册；各命令支持的字段清单见对应命令页的 `--json` 条目。

## --template 可用的附加函数

除 Go 标准库模板函数外，还可以使用：

- `autocolor`：同 `color`，但只对终端输出颜色
- `color <style> <input>`：按 [ansi 风格](https://github.com/mgutz/ansi)着色
- `join <sep> <list>`：用分隔符连接列表
- `pluck <field> <list>`：提取列表中各对象的某字段
- `tablerow <fields>...`：把字段按表格列对齐
- `tablerender`：渲染此前 `tablerow` 累积的表格
- `timeago <time>`：把时间戳渲染为相对时间
- `timefmt <format> <time>`：按 Go `Time.Format` 格式化时间戳
- `truncate <length> <input>`：把输入截断到指定长度
- `hyperlink <url> <text>`：渲染终端超链接

以及 [Sprig](https://masterminds.github.io/sprig/) 模板库的部分函数：`contains`、`hasPrefix`、`hasSuffix`、`regexMatch`。

## 示例

```sh
# 导出三个字段
gh pr list --json number,title,author

# 用 --jq 提取作者登录名
gh pr list --json author --jq '.[].author.login'
```

```console
$ gh pr list --json number,title,updatedAt --template \
  '{{range .}}{{tablerow (printf "#%v" .number) .title (timeago .updatedAt)}}{{end}}'
#123  A helpful contribution      about 1 day ago
#124  Improve the docs            about 2 days ago
```

以上示例为说明性内容，未实际运行。

## 使用提醒

- `--jq` 与 `--template` 依赖 `--json` 同时出现；只给格式旗标而不给字段列表会报错。
- `--jq` 适合筛选与变换，`--template` 适合排版输出；两者不要同时使用。
- 更多 Go 模板语法见 [text/template 文档](https://golang.org/pkg/text/template/)。
