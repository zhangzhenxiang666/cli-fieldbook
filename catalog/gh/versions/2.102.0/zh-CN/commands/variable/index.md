---
title: gh variable
command:
  - variable
---

管理 GitHub Actions 变量。

## 简介

变量（variable）可设置在仓库、环境或组织级，供 GitHub Actions 或 Dependabot 使用。运行 `gh help variable set` 可了解入门方法。与机密不同，变量不加密存储，值可随时读回。

## 子命令导览

- [gh variable get](cli:command:variable/get)：输出一个变量的值。
- [gh variable set](cli:command:variable/set)：创建或更新变量，支持批量导入 dotenv 文件。
- [gh variable list](cli:command:variable/list)：列出仓库、环境或组织级的变量，别名 `ls`。
- [gh variable delete](cli:command:variable/delete)：删除变量，别名 `remove`。

## 选项

### `--repo`

短旗标 `-R`。格式：`--repo <[HOST/]OWNER/REPO>`。以 `[HOST/]OWNER/REPO` 格式选择其他仓库。该旗标注册在 `gh variable` 分组级并持久化，对 `get`、`set`、`list`、`delete` 四个子命令都生效；未指定时从当前 Git 仓库推断目标仓库。

## 环境变量

- `GH_REPO`：与 `--repo` 作用相同，为命令指定 `[HOST/]OWNER/REPO` 形式的目标仓库；`--repo` 优先，见[环境变量](../../reference/environment.md)。

## 使用提醒

- 子命令用 `--org`、`--env` 选择变量层级，两者互斥；都不给时作用于仓库级。
- 组织级变量可通过可见性与所选仓库限定访问范围，见 [`gh variable set`](cli:command:variable/set)。
- 变量层级只覆盖仓库、环境、组织三级，没有用户级变量。

## 示例

```sh
# 在交互提示中为当前仓库设置变量
gh variable set MYVARIABLE

# 输出当前仓库某个变量的值
gh variable get MYVARIABLE
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 分组定义见 [pkg/cmd/variable/variable.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/variable/variable.go)；分组级 `--repo` 持久旗标由 [pkg/cmdutil/repo_override.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/repo_override.go) 的 `EnableRepoOverride` 添加。
