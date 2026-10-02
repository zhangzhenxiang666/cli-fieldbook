---
title: 为 Claude Code 安装技能
uses:
  - "command:"
  - command:add
  - command:list
---

以 Claude Code 为例，把一个技能包安装进项目并在会话中使用。其他 Agent 的流程相同，只需调整 `--agent` 取值（见[支持的 Agent](../concepts/agents.md)）。

## 前提

- 项目目录可写；安装项目级技能会在项目下创建 `.claude/skills/`。
- 远程来源需要网络；GitHub 私有仓库需要已配置的 Git 凭据、GitHub CLI 或 SSH（见[来源格式](../concepts/source-formats.md)）。

## 步骤

### 1. 查看技能包内有哪些技能

```sh
npx skills add vercel-labs/agent-skills --list
```

`--list` 只列出可安装技能，不写入任何文件。内部技能默认隐藏。

### 2. 安装到 Claude Code

```sh
npx skills add vercel-labs/agent-skills -a claude-code
```

交互模式下会确认技能与 Agent 选择；追加 `-y` 跳过确认。默认安装为项目级符号链接；要随用户全局可用加 `-g`，要独立副本加 `--copy`。

### 3. 确认安装结果

```sh
npx skills ls -a claude-code
```

检查 `.claude/skills/` 下出现技能目录（符号链接指向规范化副本），且项目根生成了 `skills-lock.json`（见[技能锁文件](../concepts/skills-lock.md)）。

### 4. 在 Claude Code 中使用

重启或新开 Claude Code 会话，技能由 Agent 按 `SKILL.md` 的 `name` 与 `description` 自动识别；也可直接让 Agent 使用该技能名。

## 完成条件

第 3 步列表中出现目标技能即安装完成。安装类命令的输出表示写入完成，不保证 Agent 立即加载——加载时机由 Agent 决定。

## 回退

```sh
npx skills remove <技能名> -a claude-code
```

## 示例说明

以上命令均未实测，行为依据 v1.7.0 源码与官方 README；`-a claude-code` 的目录约定为 `.claude/skills/`（项目）与 `~/.claude/skills/`（全局）。
