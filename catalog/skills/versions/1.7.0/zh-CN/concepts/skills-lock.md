---
title: 技能锁文件
---

`skills` 维护两个独立的锁文件：项目级 `skills-lock.json` 与用户级 `.skill-lock.json`，分别服务团队共享与更新追踪。

## 项目级 skills-lock.json

位于项目根，**设计为提交到版本控制**。条目刻意精简、不含时间戳，技能名按字母排序，使两个分支各自新增技能时产生不重叠的 JSON 键，git 可自动合并。

结构（`src/local-lock.ts`，schema 版本 1）：

```json
{
  "version": 1,
  "skills": {
    "skill-name": {
      "source": "owner/repo",
      "sourceUrl": "https://…",
      "ref": "main",
      "sourceType": "github",
      "skillPath": "skills/pdf/SKILL.md",
      "computedHash": "…"
    }
  }
}
```

`computedHash` 由磁盘上技能文件夹的全部文件内容计算（与全局锁的 GitHub tree SHA 不同）。`skillPath` 记录 SKILL.md 在来源仓库中的位置，使更新时只重新获取该技能而不是整个仓库。

`skills experimental_install` 读取该文件恢复项目技能（只装到 `.agents/skills/`）；`skills update` 判定"当前目录是否为项目"也以其存在为信号之一。

## 用户级 .skill-lock.json

记录本机全部已安装技能，位于 `$XDG_STATE_HOME/skills/.skill-lock.json`，未设置时为 `~/.agents/.skill-lock.json`。schema 版本 3；读到旧版本（v1/v2）时直接清空重建，不做迁移。

每个条目记录来源（`source`/`sourceType`/`sourceUrl`/`ref`）、`skillFolderHash`（GitHub Trees API 的文件夹 tree SHA，文件夹内任何文件变化都会改变它）、安装与更新时间等。`skills update` 与 `skills remove` 依据它工作。该文件还保存已 dismissed 的提示与上次选择的 Agent 列表。

源码：[S01](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/local-lock.ts#L9-L69) [S02](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/skill-lock.ts#L9-L73) [S03](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/install.ts#L18-L98)
