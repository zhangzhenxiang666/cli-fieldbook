---
title: gh ruleset view
command:
  - ruleset
  - view
---

查看一个规则集的详情。

## 简介

查看 GitHub 规则集的详细信息。未提供 ID 时，交互式提示会列出适用的规则集供选择（包含当前仓库或组织及其上层配置的规则集）；非交互场景必须提供规则集 ID。

`--org` 指定所给 ID 为组织级规则集的组织名。`--parents` 控制是否包含在更上层配置、同样适用的规则集，默认为 `true`（可用 `--no-parents` 关闭）。

输出包含规则集名称、ID、来源（Source）与类型、执行状态（Enforcement：disabled、evaluate、active 等）、绕过列表（Bypass List）、条件（Conditions）与规则（Rules）明细，以及当前用户可否绕过的提示。

## 参数

### `RULESET-ID`

格式：`[<ruleset-id>]`。规则集的数字 ID，可选；省略时进入交互选择。非交互模式下必须提供，且值须为整数（源码校验）。

## 选项

### `--web`

短旗标 `-w`。格式：`--web`。在浏览器中打开该规则集页面，而非在终端输出。

### `--org`

短旗标 `-o`。格式：`--org <string>`。所给 ID 为组织级规则集时指定组织名；与分组级 `--repo` 互斥。

### `--parents`

短旗标 `-p`。格式：`--parents`。是否包含在更上层配置、同样适用的规则集。布尔旗标，默认 `true`，可用 `--no-parents` 关闭。

## 环境变量

- `GH_REPO`：为命令指定 `[HOST/]OWNER/REPO` 形式的目标仓库，作用同分组级 `--repo` 旗标，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--repo` 与 `--org` 同时给出会报错。
- 非交互（脚本）场景必须给出规则集 ID，否则命令以旗标错误结束。
- 列出全部规则集及 ID 见 [`gh ruleset list`](cli:command:ruleset/list)。

## 示例

```sh
# 从作用于当前仓库的全部规则集中交互选择一个查看
gh ruleset view

# 只从当前仓库自身配置的规则集中交互选择查看
gh ruleset view --no-parents

# 查看当前仓库或其上层配置的某个规则集
gh ruleset view 43

# 查看其他仓库或其上层配置的某个规则集
gh ruleset view 23 --repo owner/repo

# 查看组织级规则集
gh ruleset view 23 --org my-org
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、交互选择与详情输出见 [pkg/cmd/ruleset/view/view.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/ruleset/view/view.go)。
