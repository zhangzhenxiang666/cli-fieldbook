---
title: gh api 与脚本化
uses:
  - command:api
  - command:pr/list
---

[gh api](cli:command:api) 是 gh 的通用 API 入口：现成子命令没有覆盖某个端点或字段时，可以用它直接发起经过认证的 REST 或 GraphQL 请求。本文梳理请求构造、参数类型、分页与输出加工的机制；各选项的逐条释义见命令页，不在此重复。

## 端点、GraphQL 与仓库占位符

`<endpoint>` 位置参数有三种形态：

- REST 端点路径（API v3），如 `repos/{owner}/{repo}/releases`，gh 按目标主机补全 REST 前缀；
- 字面量 `graphql`（API v4），请求发往该主机的 GraphQL 端点；
- 含 `://` 的绝对 URL，原样请求，不拼接主机前缀。

端点路径与 `-F` 字段值中的 `{owner}`、`{repo}`、`{branch}` 会被替换为当前仓库上下文的取值：前两者取仓库的属主与名称，`{branch}` 取当前分支。取值来源与 `GH_REPO`、`-R/--repo` 的关系见[仓库上下文与默认仓库](repo-context.md)：占位符与命令走同一套仓库解析，因此用 `GH_REPO` 指定仓库时 `{owner}`、`{repo}` 仍可解析，但 `{branch}` 无法从 `[HOST/]OWNER/REPO` 形式的值中得出，使用会报错。除花括号形式外，`:owner`、`:repo`、`:branch` 也会被同样替换（源码行为；帮助文本只列出花括号形式）。

在 PowerShell 等 shell 中，含 `{...}` 的值需要加引号，避免花括号被 shell 解释；Windows 上端点路径不要以斜杠开头，shell 可能把路径改写成本地文件路径。

## HTTP 方法与字段类型

默认方法在没有给出任何参数时是 `GET`；一旦添加了字段参数或 `--input`，未显式指定 `--method` 时自动切换为 `POST`。要给 `GET` 请求附带查询参数，写 `--method GET`。

字段旗标分两档：

- `-f`/`--raw-field`：值保持为字符串；
- `-F`/`--field`：按书写格式做类型推断——`true`、`false`、`null` 与整数转换为对应的 JSON 类型；值以 `@` 开头时从文件读取内容作为字符串值，`@-` 表示标准输入；其余值会做占位符展开，例如 `-F owner='{owner}'`。

请求发送方式随方法而定：方法为 `GET` 时参数编码进 URL 查询串；否则序列化为 JSON 请求体发送。

需要嵌套结构或数组时，用键的方括号语法：

- `key[subkey]=value` 构造嵌套对象；
- `key[]=value1`、`key[]=value2` 重复声明构造数组；不带值的 `key[]` 表示空数组；
- `key[sub][]=value` 在嵌套对象下构造数组；`properties[][property_name]=…`、`properties[][default_value]=…` 这样连续声明的不同子键会依次填进数组中的同一个对象，构成对象数组。

同一键上声明出互相冲突的类型（如既是标量又是数组）会报错。GraphQL 请求中，除 `query` 与 `operationName` 之外的字段都收进 `variables` 对象，作为 GraphQL 变量传递。

## 请求体与标准输入

`--input <file>` 把文件内容原样作为请求体（`-` 表示标准输入），适合发送预先构造好的 JSON，文件大小会写入 `Content-Length` 请求头。以这种方式传请求体时，字段旗标给出的参数改挂到端点 URL 的查询串上，而不是与文件混组请求体；`--paginate` 不能与 `--input` 同用。

## 分页

- REST 端点的 `--paginate`：按响应中的分页链接（`Link` 头的 next 关系）逐页请求，未显式指定每页条数时自动注入每页 100 条，直到没有下一页。
- GraphQL 端点的 `--paginate`：要求原始查询声明 `$endCursor: String` 变量，并从集合取回 `pageInfo { hasNextPage endCursor }` 字段组；gh 用上一页的 `endCursor` 续翻，直到 `hasNextPage` 为假。
- 默认每页是相互独立的 JSON 数组或对象，依次打印；`--slurp` 把所有页包进一个外层 JSON 数组，便于交给 jq 一次处理。

边界：`--paginate` 只支持 `GET` 请求与 `graphql` 端点，其他方法报错；`--slurp` 必须与 `--paginate` 同用，且不能与 `--jq`、`--template` 同用。

## 输出加工、缓存与调试

- `--jq` 与 `--template` 直接作用于 API 响应本身，不需要字段列表——这与 `--json` 三件套的用法不同，两者的语法与可用模板函数见[输出与自动化约定](output-conventions.md)与 [JSON 输出与格式化](../reference/formatting.md)。
- `--template`、`--jq`、`--silent`、`--verbose` 至多选一。
- `--include` 在输出前附带 HTTP 状态行与响应头，脚本可据此读取状态码与响应元数据。
- `--silent` 不打印响应体，也不启动分页程序。
- 响应状态码大于 299 时，响应体照常输出，标准错误出现 `gh: <错误信息>`，命令以退出码 1 结束；退出码的整体语义见[输出与自动化约定](output-conventions.md)。
- `--cache <duration>` 按指定时长缓存响应，写法如 `3600s`、`60m`、`1h`，适合脚本内反复请求同一只读端点时减少请求次数。
- `--verbose` 把完整的 HTTP 请求与响应并入输出；`GH_DEBUG=api` 则在标准错误记录 HTTP 流量，不占用标准输出。
- 请求 GitHub Enterprise 主机用 `--hostname`；非文本响应体与携带终端转义序列的响应会被拦截，`--allow-escape-sequences` 放行，详见[输出与自动化约定](output-conventions.md)。

## 示例

```sh
# 列出当前仓库 open 拉取请求的标题
gh api 'repos/{owner}/{repo}/pulls?per_page=100' --jq '.[].title'

# 用 GraphQL 查询当前仓库最近 3 个 release（字段除 query 外都是 GraphQL 变量）
gh api graphql -F owner='{owner}' -F name='{repo}' -f query='
  query($name: String!, $owner: String!) {
    repository(owner: $owner, name: $name) { releases(last: 3) { nodes { tagName } } }
  }'

# 发送预构造的 JSON 请求体，只关心是否成功
gh api repos/{owner}/{repo}/rulesets --input ruleset.json --silent
```

以上示例为说明性内容，未实际运行。更多占位符、嵌套字段与 GraphQL 分页的完整示例见 [`gh api`](cli:command:api) 命令页。

脚本化的取舍：能覆盖目标的现成子命令（如 [gh pr list](cli:command:pr/list)）优先，它们替你处理了字段选择与分页；`gh api` 用在子命令没有覆盖的端点、字段或请求形态上。
