---
title: gh repo create
command:
  - repo
  - create
---

创建新的 GitHub 仓库，别名为 `gh repo new`。

## 简介

创建新仓库有三种方式：

- 交互式创建：不带任何参数与旗标运行 `gh repo create`，按提示选择从零创建、从模板创建或推送本地仓库。
- 非交互式创建远程仓库：给出仓库名与 `--public`、`--private`、`--internal` 三者之一；需要同时克隆到本地时加 `--clone`。
- 从既有本地仓库创建远程仓库：用 `--source` 指定本地仓库路径，远程仓库名默认取源目录名。

名称参数中省略 `OWNER/` 前缀时，默认归属当前认证用户。`--push` 会把本地提交推送到新仓库；源为裸仓库时改为镜像全部 ref。

`--gitignore` 可用的语言／平台 gitignore 模板见 [github/gitignore](https://github.com/github/gitignore)；`--license` 可用的许可证关键词可用 [`gh repo license list`](cli:command:repo/license/list) 查询，或参考 [choosealicense.com](https://choosealicense.com)。

新仓库的默认分支遵循账户配置的仓库默认分支设置。

## 参数

### `NAME`

可选，写作 `[<name>]`。新仓库名，可带 `OWNER/` 前缀以指定归属。非交互创建远程仓库时必填。

## 选项

### `--description`

短旗标 `-d`。格式：`--description <string>`。仓库描述。

### `--homepage`

短旗标 `-h`。格式：`--homepage <URL>`。仓库主页 `URL`。

### `--team`

短旗标 `-t`。格式：`--team <name>`。授予访问权限的组织团队 `name`。

### `--template`

短旗标 `-p`。格式：`--template <repository>`。以模板 `repository` 为基础创建新仓库。

### `--public`

格式：`--public`。将新仓库设为公开。

### `--private`

格式：`--private`。将新仓库设为私有。

### `--internal`

格式：`--internal`。将新仓库设为内部。

### `--gitignore`

短旗标 `-g`。格式：`--gitignore <string>`。为仓库指定 gitignore 模板。

### `--license`

短旗标 `-l`。格式：`--license <string>`。为仓库指定开源许可证。

### `--source`

短旗标 `-s`。格式：`--source <string>`。指定作为源的本地仓库路径。

### `--remote`

短旗标 `-r`。格式：`--remote <string>`。为新仓库指定远端名称。

### `--push`

格式：`--push`。把本地提交推送到新仓库。

### `--clone`

短旗标 `-c`。格式：`--clone`。把新仓库克隆到当前目录。

### `--disable-issues`

格式：`--disable-issues`。在新仓库中禁用议题。

### `--disable-wiki`

格式：`--disable-wiki`。在新仓库中禁用 wiki。

### `--include-all-branches`

格式：`--include-all-branches`。包含模板仓库的全部分支。

### `--add-readme`

格式：`--add-readme`。为新仓库添加 README 文件。

### `--confirm`

短旗标 `-y`。格式：`--confirm`。跳过确认提示。已弃用：给出任意参数即可跳过确认。

### `--enable-issues`

格式：`--enable-issues`。在新仓库中启用议题，默认 `true`。已弃用：禁用议题改用 `--disable-issues`。

### `--enable-wiki`

格式：`--enable-wiki`。在新仓库中启用 wiki，默认 `true`。已弃用：禁用 wiki 改用 `--disable-wiki`。

## 使用提醒

- 非交互模式（给出参数或旗标）必须提供 `--public`、`--private`、`--internal` 中的恰好一个；完全无参数无旗标且不能交互时报错。
- `--remote` 与 `--push` 只能与 `--source` 同用；`--source` 也不能与 `--clone`、`--template`、`--license`、`--gitignore` 组合。
- `--template` 与 `--gitignore`、`--license`、`--add-readme`、`--team` 互斥；`--include-all-branches` 仅在使用 `--template` 时可用。
- 从本地仓库推送时，`--push` 要求本地已有提交；裸仓库会以 `push --mirror` 方式镜像全部 ref。

## 示例

```sh
# 交互式创建仓库
gh repo create

# 创建新的远程仓库并克隆到本地
gh repo create my-project --public --clone

# 在其他组织中创建新的远程仓库
gh repo create my-org/my-project --public

# 从当前目录创建远程仓库
gh repo create my-project --private --source=. --remote=upstream
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 旗标注册、互斥检查与三条创建路径（从零创建、从模板创建、从本地仓库推送）见 [pkg/cmd/repo/create/create.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/create/create.go)；仓库创建请求见 [pkg/cmd/repo/create/http.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/create/http.go)。
- 创建后克隆带模板的仓库时按固定间隔自动重试（最多 3 次），以等待模板仓库就绪。
