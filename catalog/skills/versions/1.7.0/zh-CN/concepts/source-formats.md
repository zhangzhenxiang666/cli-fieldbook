---
title: 来源格式
---

`skills add` 与 `skills use` 的来源参数支持多种格式，由来源解析器（`src/source-parser.ts`）统一识别为 `github`、`gitlab`、`git`、`local`、`well-known`、`download` 等类型。

## GitHub 简写与 URL

```sh
skills add vercel-labs/agent-skills                                # owner/repo 简写
skills add https://github.com/vercel-labs/agent-skills             # 完整 URL
skills add https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines   # 仓库内直链
skills add github:vercel-labs/agent-skills                         # github: 前缀
```

URL 的 `#` 片段可用作 ref（分支或标签）。

## 其他 git 托管

```sh
skills add https://gitlab.com/org/repo                             # GitLab
skills add https://dev.azure.com/org/project/_git/repo             # Azure Repos
skills add git@github.com:vercel-labs/agent-skills.git             # SSH
skills add ssh://git@git.example.com/acme/skills.git               # ssh:// + .git
skills add gitlab:org/repo                                         # gitlab: 前缀
```

任意 `http(s)://…​.git` 形式的 git URL 均可使用。

## 本地路径

以 `./`、`../` 开头（或被识别为存在的本地路径）时按本地来源处理，不克隆：

```sh
skills add ./my-local-skills
```

## @skill 过滤语法

来源后可加 `@skill-name` 直接指定技能，例如 `vercel-labs/agent-skills@vercel-optimize`；`skills use` 的位置参数即采用该语法。

## 私有仓库

公开与私有仓库使用相同命令。GitHub 简写与 HTTPS 来源依次尝试常规 Git 凭据、GitHub CLI（`gh repo clone`）与 SSH；不会执行 `gh auth token` 或把凭据读入进程。可显式设置 `GITHUB_TOKEN` 或 `GH_TOKEN` 用于 GitHub API 访问（含私有仓库下载与更新检查）。

源码：[S01](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/source-parser.ts#L352-L400) [S02](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/README.md#L34-L81) [S03](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/types.ts#L108-L116)
