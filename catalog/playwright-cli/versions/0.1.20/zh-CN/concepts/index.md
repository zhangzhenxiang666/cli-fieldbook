---
title: 阅读说明
---

本版本固定上游 `@playwright/cli` 0.1.20，行为源码固定到其精确依赖的 `playwright-core@1.64.0-alpha-2026-09-14` 构建提交 `d1ead3ecca23182f2d06d761c28e3d4edafb6595`（npm registry 记录的 gitHead；每日 alpha 不打 tag）。命令树按该提交的源码静态枚举：全部节点共 93 个（根命令 + 92 个根级命令，无嵌套子命令），其中公开 91、隐藏 2（`config-print`、`tray`）。数量口径与验证方法见[来源、覆盖与校对记录](../reference/sources.md)。

阅读提示：

- 命令参考按帮助分组组织，从 [playwright-cli](cli:command:) 进入；全局选项（`--help`、`--json`、`--raw`、`--session`/`-s`、`--version`/`-v`）在根命令页解释一次。
- playwright-cli 的命令围绕**会话**组织：先 [open](cli:command:open) 或 [attach](cli:command:attach) 建立浏览器会话，其余命令作用于该会话。会话模型见[会话与工作区](sessions.md)。
- 与页面元素交互需要指定**目标**：快照引用、CSS 选择器或 Playwright 定位器，见[目标与定位器](targeting.md)；页面结构通过[快照](snapshot.md)呈现。
- 概念文章：[会话与工作区](sessions.md)、[目标与定位器](targeting.md)、[页面快照](snapshot.md)、[输出模式](output.md)、[浏览器与设备仿真](browsers.md)、[存储状态](storage-state.md)、[网络观察与拦截](network.md)、[录制、追踪与视频](recording.md)、[WebMCP 页面工具](webmcp.md)。

内容边界：

- 本版本未采集二进制原始帮助进入证据链；命令事实自固定提交的源码重建，开发期曾与本机 0.1.20 的 `--help` 输出交叉核对拼写与分组。
- 示例与工作流为说明性内容，未实际运行；源码未以字面量声明的默认值不记录，行为性默认（如空闲超时）以源码注释口径转述。
