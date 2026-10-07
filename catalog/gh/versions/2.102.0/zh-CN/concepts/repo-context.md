---
title: 仓库上下文与默认仓库
uses:
  - command:repo/set-default
---

查看或创建拉取请求、议题、release，操作 GitHub Actions 等，都需要先确定目标仓库。本文说明 gh 如何为一条命令选定这个仓库：`-R/--repo` 与 `GH_REPO` 的显式覆盖、从本地 git 远端的推断链、多远端时的消歧，以及"默认仓库"的落点。认证见[gh 总览与认证](overview.md)；`GH_HOST` 等环境变量的完整清单见[环境变量](../reference/environment.md)。

## 推断链：旗标、环境变量与本地远端

gh 按以下顺序确定目标仓库：

1. `-R/--repo` 旗标：多数需要仓库目标的命令都接受这个持久旗标，取 `[HOST/]OWNER/REPO` 形式；
2. `GH_REPO` 环境变量：同样的形式，未给旗标时生效；
3. 从当前目录的 git 远端推断。

三者是覆盖关系：给出了 `-R` 或设置了 `GH_REPO` 时，gh 直接把指定仓库当作目标，不再读取 git 远端。这也意味着此时依赖本地 git 状态的行为（如"当前分支所属的拉取请求"）不再适用；不少命令为此约定：用 `-R` 指定仓库时必须显式给出选择器参数，否则报错（例如 [gh pr checks](cli:command:pr/checks)、[gh pr merge](cli:command:pr/merge)）。

## 从 git 远端到已知仓库

走到推断这一步时，gh 从 git 配置读出远端清单，把每个远端 URL 解析为 `[HOST/]OWNER/REPO`，然后做两次筛选与排序：

- 解析：只有能解析出 GitHub 仓库的远端参与推断；解析不出（例如指向其他 Git 服务）的远端被忽略。
- 主机过滤：只保留指向已认证主机、默认主机与 `github.com` 的远端。若默认主机来自 `GH_HOST` 环境变量，则过滤后没有匹配远端时直接报错，不再回退到其他主机的远端。
- 排序：远端按名称排序，`upstream`、`github`、`origin` 依次优先，其余远端不保证顺序。克隆复刻后常见的 `upstream`（上游）与 `origin`（复刻）并存的场景即由此决定回退次序。

## 默认仓库与 gh-resolved

被选中的"基础仓库"会记录进 git 配置：远端上的 `remote.<远端名>.gh-resolved` 键，值为 `base`（该远端就是基础仓库）或一个 `OWNER/REPO`（基础仓库固定为该仓库，即使它不再对应任何远端）。写入这一键的入口有：[gh repo set-default](cli:command:repo/set-default)、克隆与复刻流程（`gh repo clone`、`gh repo fork`），以及 [gh pr create](cli:command:pr/create) 在创建过程中新建复刻时。

之后的命令会先尊重既有解析：只要有远端带着 `gh-resolved`，就直接采用，不再做进一步消歧。[gh repo set-default](cli:command:repo/set-default) 负责查看（`--view`）、设置与取消（`--unset`）这一记录；设置时参数可以是 `OWNER/REPO`（必须对应本地某个 git 远端）或直接给远端名，不带参数交互运行时从本地远端解析出的仓库网络中选择。查看与创建拉取请求、议题、release，操作 GitHub Actions 等默认走这个仓库。

## 无解析时的行为

没有任何 `gh-resolved` 记录时，不同命令的行为有差别：

- `pr`、`issue`、`repo`、`release`、`run`、`workflow`、`label`、`cache`、`api` 等命令族走"智能"推断：能交互时，gh 查询各远端对应的仓库网络（最多取前 5 个远端，网络中的父仓库也计入候选）——恰好一个已知仓库时直接采用，多于一个则报错并提示运行 `gh repo set-default`；不能交互（如输出被管道重定向）时，直接取排序后的第一个远端。
- 机密命令（`secret`）因涉及敏感目标而要求无歧义：本地有多于一个远端时，交互模式提示选择仓库，非交互模式报错并提示用 `-R` 指定；它也不使用默认仓库管理仓库机密与环境机密。
- 其余少数命令直接取排序后的第一个远端，不做网络查询。

因此多远端仓库中的可靠做法是先运行一次 `gh repo set-default` 把解析固定下来，而不是依赖回退次序。

## 示例

```sh
# 在多远端仓库中交互式固定默认仓库
gh repo set-default

# 用远端名直接指定
gh repo set-default origin

# 查看与取消当前设置
gh repo set-default --view
gh repo set-default --unset

# 单条命令临时指向另一个仓库
gh issue list --repo cli/cli
```

以上示例为说明性内容，未实际运行。
