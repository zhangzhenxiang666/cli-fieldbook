---
title: gh ruleset list
command:
  - ruleset
  - list
---

列出仓库或组织的规则集。

## 简介

列出 GitHub 规则集。未提供任何选项时列出当前仓库的规则集；可用分组级 `--repo` 旗标查询其他仓库，或用 `--org` 列出指定组织配置的规则集。

`--parents` 控制是否返回在更上层配置、同样作用于该仓库或组织的规则集，默认为 `true`（可用 `--no-parents` 关闭）。使用 `--org` 时，访问令牌必须具有 `admin:org` scope，可通过运行 `gh auth refresh -s admin:org` 授予。

终端下的表格输出包含 ID、NAME、SOURCE、STATUS、RULES 列；没有规则集时命令以错误结束并给出提示。

## 选项

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。最多列出的规则集数量。默认 `30`；小于 1 时报错。

### `--org`

短旗标 `-o`。格式：`--org <string>`。列出指定组织的组织级规则集；与分组级 `--repo` 互斥。

### `--parents`

短旗标 `-p`。格式：`--parents`。是否包含在更上层配置、同样适用的规则集。布尔旗标，默认 `true`，可用 `--no-parents` 关闭。

### `--web`

短旗标 `-w`。格式：`--web`。在浏览器中打开规则集列表页面，而非在终端列出。

## 环境变量

- `GH_REPO`：为命令指定 `[HOST/]OWNER/REPO` 形式的目标仓库，作用同分组级 `--repo` 旗标，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--repo` 与 `--org` 同时给出会报错，只能取其一。
- `--org` 需要 `admin:org` scope；普通仓库查询无此要求。
- 查看单个规则集的详情见 [`gh ruleset view`](cli:command:ruleset/view)。

## 示例

```sh
# 列出当前仓库的规则集
gh ruleset list

# 列出其他仓库的规则集，包含更上层配置的规则集
gh ruleset list --repo owner/repo --parents

# 列出组织的规则集
gh ruleset list --org org-name
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、`--repo`/`--org` 互斥校验与表格输出见 [pkg/cmd/ruleset/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/ruleset/list/list.go)。
