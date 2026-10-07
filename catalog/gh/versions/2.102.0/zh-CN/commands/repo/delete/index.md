---
title: gh repo delete
command:
  - repo
  - delete
---

删除仓库。

## 简介

删除 GitHub 仓库。不带参数时删除当前目录对应的仓库，否则删除指定的仓库；参数只写仓库名（不含 `/`）时，自动补全为当前认证用户的 `OWNER/REPO`。

出于安全考虑，未提供仓库参数时 `--yes` 会被忽略并输出警告，命令仍会交互确认；要在非交互模式下删除当前仓库，必须显式写出仓库（如 `gh repo delete owner/repo --yes`）。

删除操作要求令牌具有 `delete_repo` scope；授权可运行 `gh auth refresh -s delete_repo`。

## 参数

### `REPOSITORY`

可选，写作 `[<repository>]`。要删除的仓库，形式为 `OWNER/REPO` 或 URL；只写仓库名时补全为当前认证用户的仓库。省略时使用当前目录对应的仓库。

## 选项

### `--confirm`

格式：`--confirm`。删除前不再提示，直接确认。已弃用，改用 `--yes`。

### `--yes`

格式：`--yes`。删除前不再提示，直接确认。

## 环境变量

- `GH_REPO`：省略位置参数时，可用 `[HOST/]OWNER/REPO` 形式指定目标仓库，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 删除需要 `delete_repo` scope，用 [`gh auth refresh`](cli:command:auth/refresh) 追加授权。
- 未给出仓库参数时 `--yes` 被忽略；非交互模式下既无参数又无有效 `--yes` 时报错。
- 交互确认要求按提示输入仓库信息后才执行删除。
- 仓库近期改名或转移所有权导致 API 重定向时，删除失败并提示相应信息。
- 删除不可恢复，操作前确认目标仓库。

## 示例

```sh
# 交互式删除当前仓库
gh repo delete

# 非交互删除指定仓库（需 delete_repo scope）
gh repo delete owner/repo --yes
```

以上示例为说明性内容，未实际运行。

## 源码补充

- `--yes` 忽略逻辑与确认流程见 [pkg/cmd/repo/delete/delete.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/delete/delete.go)；删除 API 请求见 [pkg/cmd/repo/delete/http.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/delete/http.go)。
