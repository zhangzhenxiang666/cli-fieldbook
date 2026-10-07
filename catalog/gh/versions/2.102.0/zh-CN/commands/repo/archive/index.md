---
title: gh repo archive
command:
  - repo
  - archive
---

归档仓库。

## 简介

归档 GitHub 仓库。不带参数时归档当前目录对应的仓库；参数只写仓库名（不含 `/`）时，自动补全为当前认证用户的 `OWNER/REPO`。

仓库已经处于归档状态时输出警告并直接返回，不再发起请求。未给出 `--yes` 时会交互确认。

## 参数

### `REPOSITORY`

可选，写作 `[<repository>]`。要归档的仓库，形式为 `OWNER/REPO` 或 URL；只写仓库名时补全为当前认证用户的仓库。省略时使用当前目录对应的仓库。

## 选项

### `--confirm`

格式：`--confirm`。跳过确认提示。已弃用，改用 `--yes`。

### `--yes`

短旗标 `-y`。格式：`--yes`。跳过确认提示。

## 环境变量

- `GH_REPO`：省略位置参数时，可用 `[HOST/]OWNER/REPO` 形式指定目标仓库，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 非交互模式必须给出 `--yes`，否则报错。
- 已归档的仓库再次归档不报错，仅提示已归档。
- 取消归档用 [`gh repo unarchive`](cli:command:repo/unarchive)。

## 示例

```sh
# 归档当前仓库（交互确认）
gh repo archive

# 非交互归档指定仓库
gh repo archive owner/repo --yes
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 确认流程与已归档检查见 [pkg/cmd/repo/archive/archive.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/archive/archive.go)；归档 API 请求见 [pkg/cmd/repo/archive/http.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/archive/http.go)。
