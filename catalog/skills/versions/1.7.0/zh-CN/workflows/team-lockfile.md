---
title: 用 skills-lock.json 同步团队技能
uses:
  - "command:"
  - command:add
  - command:experimental_install
  - command:experimental_sync
---

团队成员克隆包含 `skills-lock.json` 的项目后，恢复同一组技能，保持环境一致。node_modules 自带的技能也在此流程中同步。

## 前提

- 项目根已有 `skills-lock.json`（项目级 `skills add` 不带 `-g` 时自动生成并应提交到版本控制）。
- 恢复操作只安装到 `.agents/skills/` 通用目录，不写 Agent 专属目录；读取 `.claude/skills/` 等 Agent 专属目录的成员需自行补装或调整 Agent 配置。

## 步骤

### 1. 克隆项目后恢复远程技能

```sh
npx skills experimental_install
```

按来源分组重装锁文件中的全部远程技能，始终跳过确认。锁文件中的 `node_modules` 来源技能也在此命令内自动完成同步（内部以跳过确认的方式调用同步逻辑，见 `src/install.ts`），无需再手动执行第 2 步。

### 2. 同步 npm 包自带的技能

```sh
npx skills experimental_sync
```

扫描 `node_modules` 中的 SKILL.md，与锁文件哈希比对后安装新出现或内容已变化的技能并写回锁文件；`-y` 跳过确认。第 1 步已覆盖锁文件内的 `node_modules` 技能，此步主要用于其后新增或内容发生变化的 npm 依赖。

### 3. 验证

```sh
npx skills ls
```

列表应与提交 `skills-lock.json` 时的技能集合一致。

## 失败与恢复

- 锁文件为空或缺失：命令提示并无操作；先用 `npx skills add <package>`（不带 `-g`）添加项目技能。
- 条目缺少 `sourceUrl`（通用 Git 来源）：该技能报错跳过，其余继续；需手动 `skills add` 补装。
- 两个命令均为实验性，行为可能随版本变化。

## 完成条件

第 3 步列表覆盖锁文件中的全部技能名即恢复完成。该流程未实测，依据 v1.7.0 源码（`src/install.ts`、`src/sync.ts`、`src/local-lock.ts`）。
