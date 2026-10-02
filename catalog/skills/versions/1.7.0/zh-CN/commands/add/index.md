---
title: skills add
command:
  - add
---

## 简介

从指定来源安装技能包，安装到所选 Agent 的技能目录。别名 `a`、`i`、`install`。

默认安装到项目级目录并以符号链接（symlink）指向规范化副本；`-g` 切换到用户全局目录，`--copy` 改为复制文件。

## 参数

### `package`

技能来源。支持 GitHub 简写（`owner/repo`）、GitHub/GitLab/Azure Repos 完整 URL、仓库内技能直链、任意 git URL（含 SSH）、本地路径等多种格式，详见[来源格式](../../concepts/source-formats.md)。源码解析允许多个位置参数，帮助文本仅展示单个 `<package>`。

## 选项

### `--global`

安装到用户目录（`~/<agent>/skills/`）而不是项目目录（`./<agent>/skills/`）。短形式 `-g`。

### `--agent`

指定目标 Agent，可给多个值或重复使用该选项；`'*'` 表示全部 Agent。未指定时交互选择，或自动检测已安装的 Agent。短形式 `-a`，占位符 `<agents>`。

### `--skill`

按名称安装来源中的特定技能，可多个；`'*'` 表示全部。也支持 `owner/repo@skill-name` 语法在来源上直接指定。短形式 `-s`，占位符 `<skills>`。

### `--list`

仅列出来源中可安装的技能，不执行安装。内部技能（`internal: true`）默认隐藏，设置环境变量 `INSTALL_INTERNAL_SKILLS=1` 或 `true` 后显示；按名称显式请求某个技能时无需该变量。短形式 `-l`。

### `--yes`

跳过确认提示。Agent 环境中自动启用。短形式 `-y`。

### `--copy`

以复制文件方式安装，替代默认的符号链接。各 Agent 得到独立副本；符号链接创建失败时也会回退为复制。

### `--metadata`

附加到本次安装遥测事件的合法 JSON 值，占位符 `<json>`。值必须能通过 JSON 解析，否则报错退出；缺值同样报错。

### `--subagent`

安装到 Eve 的子 Agent 目录，占位符 `<names>`；`root`（或 `.`）表示根 Agent。相当于隐式选择 Eve。

### `--all`

`--skill '*' --agent '*' -y` 的简写：全部技能装到全部 Agent 并跳过确认。

### `--full-depth`

即使仓库根存在 SKILL.md，也搜索全部子目录。默认对已知容器的搜索深度为 3 层。

### `--json`

以 JSON 数组输出机器可读结果（无 ANSI 颜色码），每技能一项，含 `status`（`installed`/`skipped`/`failed`）、`scope`、`agents`、`mode`、`security` 等字段。必须与 `-y` 或 `--all` 同时使用，否则以退出码 1 报错；错误时 stdout 仍保证输出单个 JSON 值（空数组）。

## 使用提醒

#### Agent 环境自动行为

在检测到的 Agent 环境中：自动视为 `-y`；未显式指定 `--agent` 时自动选择检测到的 Agent 与通用 Agent。JSON 模式下不打印 logo，保持 stdout 可解析。

#### 内部技能

标记 `internal: true` 的技能对 `'*'` 通配与列表视图隐藏；仅显式按名请求（`--skill` 非 `'*'` 或 `@skill` 语法）或设置 `INSTALL_INTERNAL_SKILLS` 时可见可装。

#### 私有仓库

对 GitHub 简写与 HTTPS 来源，先尝试常规 Git 凭据，失败后依次尝试 GitHub CLI 的 `gh repo clone` 与 SSH；不会执行 `gh auth token` 或把凭据读入进程。也可显式设置 `GITHUB_TOKEN` 或 `GH_TOKEN`。

## 示例

```sh
npx skills add vercel-labs/agent-skills
npx skills add https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines
npx skills add vercel-labs/agent-skills --skill frontend-design -g -a claude-code -y
npx skills add vercel-labs/agent-skills --list
npx skills add vercel-labs/agent-skills --json -y
```

源码：[S01](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/add.ts#L2429-L2504) [S02](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/add.ts#L1208-L1230) [S03](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/add.ts#L1330-L1341) [S04](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/installer.ts#L33-L49) [S05](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/source-parser.ts#L352-L400)
