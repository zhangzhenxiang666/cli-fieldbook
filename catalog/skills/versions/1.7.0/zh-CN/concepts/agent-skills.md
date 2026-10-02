---
title: 什么是 Agent Skills
---

Agent Skills（技能）是扩展编程 Agent 能力的可复用指令集，由带 YAML frontmatter 的 `SKILL.md` 文件定义。典型用途如从 git 历史生成发布说明、按团队规范创建 PR、对接外部工具等。技能目录与规范参见 [skills.sh](https://skills.sh) 与 [agentskills.io](https://agentskills.io)。

## SKILL.md 格式

技能是一个包含 `SKILL.md` 的目录：

```markdown
---
name: my-skill
description: What this skill does and when to use it
---

# My Skill

Instructions for the agent to follow when this skill is activated.
```

frontmatter 必填字段：

- `name`：唯一标识，小写字母，允许连字符
- `description`：技能用途与适用场景的简短说明

可选字段 `metadata.internal` 设为 `true` 可将技能从常规发现中隐藏：默认不可见不可安装，仅在设置 `INSTALL_INTERNAL_SKILLS=1`（或 `true`）或按名称显式请求时可见。

## 发现与安装

`skills find` 在 skills.sh 目录中搜索；`skills add` 从 GitHub、GitLab、任意 git 仓库或本地路径安装（见[来源格式](source-formats.md)）。安装后技能进入各 Agent 的技能目录（见[支持的 Agent](agents.md)），`skills use` 可不安装直接生成使用提示词。

自建技能用 `skills init` 生成骨架（见[初始化并编写技能](../workflows/author-and-init.md)）。

源码：[S01](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/README.md#L263-L295) [S02](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/README.md#L368-L411) [S03](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/cli.ts#L236-L297)
