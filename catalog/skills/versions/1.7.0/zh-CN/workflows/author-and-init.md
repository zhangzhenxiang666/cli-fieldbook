---
title: 初始化并编写自己的技能
uses:
  - "command:"
  - command:init
---

从零创建一个可被 `skills add` 安装的技能仓库。

## 前提

- 一个用于发布的 git 仓库（GitHub、GitLab 或任意 git 托管）。
- 技能内容：`SKILL.md` 的 frontmatter 必须包含 `name`（小写、允许连字符）与 `description`。

## 步骤

### 1. 生成骨架

```sh
npx skills init my-skill
```

在当前目录创建 `my-skill/SKILL.md`；不带名称时在当前目录创建 `SKILL.md`，技能名取目录名。目标文件已存在时不覆盖。

### 2. 编写指令

编辑 frontmatter 与正文：`description` 说明技能做什么与何时使用，正文写给 Agent 的执行指令（可含 `When to use`、步骤等章节）。格式细节见[什么是 Agent Skills](../concepts/agent-skills.md)。尚在打磨、不想被发现的技能可加 `metadata.internal: true`。

### 3. 发布到仓库

把技能目录推送到仓库。之后即可安装：

```sh
npx skills add <owner>/<repo>
```

也可仅托管 SKILL.md 文件后用 URL 安装。`init` 完成时的输出会提示这两种发布方式。

## 完成条件

他人（或你在另一台机器）执行 `npx skills add <owner>/<repo> --list` 能看到该技能，即发布生效。

## 示例说明

`init` 的模板内容由 v1.7.0 源码核对（`src/cli.ts` 的 `runInit`）；发布与安装链路未实测。
