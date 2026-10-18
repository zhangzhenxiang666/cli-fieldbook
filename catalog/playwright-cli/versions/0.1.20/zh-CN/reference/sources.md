---
title: 来源、覆盖与校对记录
---

本页声明 playwright-cli 0.1.20 中文文档的固定来源、覆盖口径与验证边界。

## 固定基准

| 项 | 值 |
| --- | --- |
| 上游项目 | [microsoft/playwright](https://github.com/microsoft/playwright)（Playwright 官方仓库） |
| 稳定版本 | 0.1.20（npm 包 `@playwright/cli` 0.1.20，`playwright-cli --version` 自称 `0.1.20`） |
| 固定 ref | `d1ead3ecca23182f2d06d761c28e3d4edafb6595`：`@playwright/cli` 0.1.20 精确依赖（无版本范围）的 `playwright-core@1.64.0-alpha-2026-09-14` 的构建提交，取自 npm registry 为该包记录的 gitHead。每日 alpha 不打 tag，故以完整提交哈希为 ref |
| 分发壳 | [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli) tag `v0.1.20`（npm 包 `@playwright/cli` 的发布仓库，仅含入口脚本、更新检查与官方 skills 文档副本） |
| 查证日期 | 2026-10-18 |
| 官方文档 | 仓库内 [packages/playwright-core/src/tools/skills/playwright-cli/SKILL.md](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/skills/playwright-cli/SKILL.md) 及其 references（已随本 commit 固定为快照）；playwright.dev 在线文档为滚动版本，仅作交叉旁证 |

全部源码快照按原路径保存在本版本 `upstream/source-extracts/` 下（统一 `.txt` 后缀），每份带 SHA-256 校验，清单见 `upstream/source.lock.json`。

## 数量怎么计算

命令树按固定 commit 的 [packages/playwright-core/src/tools/cli-daemon/commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts) 的 `declareCommand` 表静态枚举，全部节点均为根级单 token 命令（无嵌套子命令），共 **93** 个，本版全部收录：

| 口径 | 数量 |
| --- | --- |
| 收录节点（根命令 + 顶级命令） | 93 |
| 其中公开命令 | 91（根命令 + 90 个顶级命令） |
| 其中隐藏命令 | 2（`config-print`、`tray`，帮助输出不列出） |
| 位置参数条目 | 70（必填 50） |
| 选项条目（含根命令全局选项 5 项） | 81 |
| 固定源码快照文件 | 28 |

90 个公开命令按帮助分组：Core 25、Navigation 3、Keyboard 3、Mouse 4、Save as 2、Tabs 4、Storage 17（storage state 2、cookie 5、localStorage 5、sessionStorage 5）、Network 10、DevTools 15、WebMCP 2、Install 2、Browser sessions 3。隐藏命令 `config-print` 与 `tray` 在源码中均属 config 分组，该分组因全部隐藏而不出现在帮助输出中。

客户端入口（[packages/playwright-core/src/tools/cli-client/program.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-client/program.ts)）在本地直接处理 11 个命令（`open`、`attach`、`close`、`detach`、`list`、`close-all`、`delete-data`、`kill-all`、`install`、`install-browser`、`show`），其余命令转发给会话守护进程执行；两类命令的 evidenceIds 均已区分标注。`--version`/`-v` 与 `--help`/`-h` 由客户端入口处理。

## 方法与验证限制

- 命令事实（路径、用法行、参数、选项、枚举）自固定 commit 的 TypeScript 源码重建：[cli-daemon/commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts) 的 zod 声明给出全部命令、参数与选项，[cli-daemon/helpGenerator.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/helpGenerator.ts) 给出用法行格式，[cli-client/program.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-client/program.ts) 给出全局选项与客户端行为；**未采集目标二进制的原始帮助输出**（另与本机安装的 `@playwright/cli` 0.1.20 的 `--help` 输出交叉核对过拼写与分组，未进入证据链）。
- 选项显示形式为归一化约定：短旗标前置（`-g, --global`）；占位符统一写 `<VALUE>`（源码帮助不提供语义占位名）；枚举仅在 zod 声明为 `z.enum` 字面列表时记录（`--skills`、`--browser` 等的"possible values"仅出现在 describe 文本中，类型为自由字符串，不枚举）；源码未以字面量声明默认值，故本版不记录任何默认值，describe 文本中的默认行为描述（如 `--idle-timeout` 的"one hour for headless"）在中文页以源码口径转述。
- 全局选项（`--help`、`--json`、`--raw`、`--session`/`-s`、`--version`/`-v`）声明于客户端入口，在[根命令](cli:command:)页释义一次，各命令页以继承选项收录、不重复释义。
- `help.json` 为构建期由 helpGenerator 生成的产物，未签入源码树，不在快照中。
- `install-browser` 由客户端转发至随 playwright-core 分发的经典 `playwright install` 程序执行，选项事实按 commands.ts 声明记录。
- **全部示例为说明性内容，未实际运行**；示例中的输出形态依源码逻辑与官方 skills 文档推断。
- 官方在线文档为滚动版本（D04：不用滚动页面证明历史版本行为），仅用于交叉核对措辞与概念，不进入证据链。

## 分类证据边界

- **已采集帮助**：无。本版未采集二进制 `--help` 原始输出进入证据链（本机 0.1.20 的帮助输出仅用于开发期交叉核对拼写）。
- **已核对源码**：全部 93 个节点的命令定义与参数声明，逐条绑定 `source-extracts/` 快照（`source.lock.json` 的 evidence 清单含 SHA-256）；客户端行为另核对 cli-client 与 cli-daemon 实现快照；官方使用口径核对 skills/playwright-cli 文档快照。
- **已实测示例**：无。全部示例未运行。
