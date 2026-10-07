---
title: gh api
command:
  - api
---

向 GitHub API 发起经过认证的 HTTP 请求并打印响应，覆盖 REST（API v3）端点与 GraphQL（API v4）。

## 简介

`<endpoint>` 参数应是 GitHub REST API（v3）端点的路径，或字面量 `graphql` 以访问 GitHub API（v4）。

端点参数中的占位符 `{owner}`、`{repo}` 与 `{branch}` 会被当前目录所在仓库、或 `GH_REPO` 环境变量所指定仓库的对应值替换。注意在 PowerShell 等 shell 中，含 `{...}` 的值需要加引号，避免花括号被 shell 赋予特殊含义。

`-p`/`--preview` 用于选择加入 preview，即由功能旗标控制的实验性 API 端点或行为。API 通过格式为 `application/vnd.github.<preview-name>-preview+json` 的 `Accept` 请求头接受选择加入，本命令把它简化为 `--preview <preview-name>`。要同时选择 corsair 与 scarlet witch 两个 preview，可写 `-p corsair,scarlet-witch` 或 `--preview corsair --preview scarlet-witch`。

默认 HTTP 请求方法在没有参数时为 `GET`，添加了任何参数后为 `POST`；可用 `--method` 覆盖。

`-f`/`--raw-field` 以 `key=value` 格式向请求载荷添加静态字符串参数。注意添加请求参数会自动把请求方法切换为 `POST`；若要把参数作为 `GET` 查询串发送，显式指定 `--method GET`。要添加非字符串类型或由占位符决定的值，见下面的 `-F`/`--field`。

`-F`/`--field` 会按值的书写格式做类型转换：

- 字面值 `true`、`false`、`null` 与整数会被转换为对应的 JSON 类型；
- 占位符 `{owner}`、`{repo}`、`{branch}` 会用当前目录所在仓库的值填充；
- 值以 `@` 开头时，其余部分作为文件名，从该文件读取值；传 `@-` 表示从标准输入读取。

GraphQL 请求中，除 `query` 与 `operationName` 之外的字段都解释为 GraphQL 变量。

要传嵌套参数，声明字段时使用 `key[subkey]=value` 语法；要把嵌套值组成数组，用 `key[]=value1`、`key[]=value2` 的写法重复声明；空数组用不带值的 `key[]`。

要发送预先构造好的 JSON 或其他格式的请求体，用 `--input` 从指定文件读取，`-` 表示标准输入。以这种方式传请求体时，字段旗标给出的参数会改加到端点 URL 的查询串上。

`--paginate` 模式下会依次请求所有页，直到没有下一页结果。GraphQL 请求分页要求原始查询声明 `$endCursor: String` 变量，并从集合取得 `pageInfo{ hasNextPage, endCursor }` 字段组。默认每页是一个独立的 JSON 数组或对象；加 `--slurp` 可把所有页的 JSON 数组或对象包进一个外层 JSON 数组。

## 参数

### `ENDPOINT`

必填，写作 `<endpoint>`。GitHub REST API 端点路径（如 `repos/{owner}/{repo}/releases`），或字面量 `graphql`。

## 选项

### `--hostname`

格式：`--hostname <string>`。请求的 GitHub 主机名（默认 `github.com`）。

### `--method`

短旗标 `-X`。格式：`--method <string>`。请求使用的 HTTP 方法，默认 `GET`。

### `--field`

短旗标 `-F`。格式：`--field <key=value>`。以 `key=value` 格式添加带类型推断的参数（值用 `@<path>` 或 `@-` 从文件或标准输入读取），可重复给出。

### `--raw-field`

短旗标 `-f`。格式：`--raw-field <key=value>`。以 `key=value` 格式添加字符串参数，可重复给出。

### `--header`

短旗标 `-H`。格式：`--header <key:value>`。以 `key:value` 格式添加 HTTP 请求头，可重复给出。

### `--preview`

短旗标 `-p`。格式：`--preview <strings>`。选择加入 GitHub API preview（名称应省略 `-preview` 后缀）。

### `--include`

短旗标 `-i`。格式：`--include`。在输出中附带 HTTP 响应状态行与响应头。

### `--slurp`

格式：`--slurp`。与 `--paginate` 同用，把所有页的 JSON 数组或对象合并为一个 JSON 数组返回。

### `--paginate`

格式：`--paginate`。发起额外的 HTTP 请求以获取所有页的结果。

### `--input`

格式：`--input <file>`。用 `file` 作为 HTTP 请求体（`-` 表示从标准输入读取）。

### `--silent`

格式：`--silent`。不打印响应体。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板格式化 JSON 输出；参见 `gh help formatting` 与[JSON 输出与格式化](../../reference/formatting.md)。

### `--jq`

短旗标 `-q`。格式：`--jq <string>`。用 jq 语法从响应中选取值的查询。

### `--cache`

格式：`--cache <duration>`。缓存响应，时长如 `3600s`、`60m`、`1h`。

### `--verbose`

格式：`--verbose`。在输出中包含完整的 HTTP 请求与响应。

### `--allow-escape-sequences`

格式：`--allow-escape-sequences`。允许打印终端转义序列。

## 环境变量

- `GH_TOKEN`、`GITHUB_TOKEN`（按优先级）：`github.com` API 请求使用的认证令牌。
- `GH_ENTERPRISE_TOKEN`、`GITHUB_ENTERPRISE_TOKEN`（按优先级）：GitHub Enterprise API 请求使用的认证令牌。
- `GH_HOST`：向 `github.com` 之外的 GitHub 主机发起请求。
- `GH_REPO`：为 `{owner}`/`{repo}` 占位符指定取值来源的仓库。

完整清单见[环境变量](../../reference/environment.md)。

## 使用提醒

- `--paginate` 仅支持 `GET` 请求与 `graphql` 端点，其他方法报错；它也不能与 `--input` 同用。
- `--slurp` 必须与 `--paginate` 同用，且不能与 `--jq` 或 `--template` 同用。
- `--template`、`--jq`、`--silent`、`--verbose` 四者至多选一。
- Windows 上端点参数不要以斜杠开头：shell 可能把 URL 路径改写为文件系统路径导致报错。
- 通过 `GH_REPO` 指定仓库时，`{branch}` 占位符无法确定取值，使用会报错。
- `--hostname` 的值会做主机名格式校验，非法值报错。

## 示例

```sh
# 列出当前仓库的 release
gh api repos/{owner}/{repo}/releases

# 发表议题评论
gh api repos/{owner}/{repo}/issues/123/comments -f body='Hi from CLI'

# 发表从文件读取的嵌套参数
gh api gists -F 'files[myfile.txt][content]=@myfile.txt'

# 向 GET 请求添加参数
gh api -X GET search/issues -f q='repo:cli/cli is:open remote'

# 用 JSON 文件作为请求体
gh api repos/{owner}/{repo}/rulesets --input file.json

# 设置自定义 HTTP 头
gh api -H 'Accept: application/vnd.github.v3.raw+json' ...

# 选择加入 GitHub API preview
gh api --preview baptiste,nebula ...

# 只打印响应中的特定字段
gh api repos/{owner}/{repo}/issues --jq '.[].title'

# 用模板格式化输出
gh api repos/{owner}/{repo}/issues --template \
  '{{range .}}{{.title}} ({{.labels | pluck "name" | join ", " | color "yellow"}}){{"\n"}}{{end}}'

# 更新深层嵌套数组中 environment 自定义属性的合法取值
gh api -X PATCH /orgs/{org}/properties/schema \
   -F 'properties[][property_name]=environment' \
   -F 'properties[][default_value]=production' \
   -F 'properties[][allowed_values][]=staging' \
   -F 'properties[][allowed_values][]=production'

# 用 GraphQL 列出 release
gh api graphql -F owner='{owner}' -F name='{repo}' -f query='
  query($name: String!, $owner: String!) {
    repository(owner: $owner, name: $name) {
      releases(last: 3) {
        nodes { tagName }
      }
    }
  }
'

# 列出某用户的全部仓库
gh api graphql --paginate -f query='
  query($endCursor: String) {
    viewer {
      repositories(first: 100, after: $endCursor) {
        nodes { nameWithOwner }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
'

# 计算当前用户仓库的复刻比例
gh api graphql --paginate --slurp -f query='
  query($endCursor: String) {
    viewer {
      repositories(first: 100, after: $endCursor) {
        nodes { isFork }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
' | jq 'def count(e): reduce e as $_ (0;.+1);
[.[].data.viewer.repositories.nodes[]] as $r | count(select($r[].isFork))/count($r[])'
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、字段语义、互斥检查与响应处理见 [pkg/cmd/api/api.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/api/api.go)。
- `--field` 的类型推断、嵌套与数组解析见 [pkg/cmd/api/fields.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/api/fields.go)；分页与 `--slurp` 细节见 [pkg/cmd/api/pagination.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/api/pagination.go)。
