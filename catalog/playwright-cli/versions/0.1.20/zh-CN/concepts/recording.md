---
title: 录制、追踪与视频
uses:
  - command:recording-start
  - command:tracing-start
  - command:video-start
  - command:show
---

调试与取证有三条互补的记录线：操作录制（生成代码）、trace（事后回放分析）与视频（演示与附件）。本文依据官方 skills 文档快照（tracing、video-recording 主题）与固定提交源码。

## 操作录制

[recording-start](cli:command:recording-start) 开始录制会话中的操作，[recording-stop](cli:command:recording-stop) 停止并把操作打印为等价 Playwright 代码——把手工验证过的交互序列沉淀为脚本或测试的起点。

## 追踪（trace）

[tracing-start](cli:command:tracing-start)/[tracing-stop](cli:command:tracing-stop) 记录会话的 trace 文件（操作序列、网络与控制台快照），在 Playwright Trace Viewer 中逐步回放，适合定位"哪一步开始不对"的问题。trace 含完整页面内容与请求/响应明细，可能包括凭据与个人数据；外发或上传前先检查并脱敏。

## 视频

[video-start](cli:command:video-start)/[video-stop](cli:command:video-stop) 录制页面视频，可指定文件名与画面尺寸（缺省适配 800x800）。[video-chapter](cli:command:video-chapter) 在录制中插入章节卡片；[video-show-actions](cli:command:video-show-actions) 开启操作标注：之后的每个操作在画面上以标注框呈现操作名并高亮目标元素（适合演示与讲解），[video-hide-actions](cli:command:video-hide-actions) 关闭。

配合 `gh` 2.99+ 的 `--attach`，截图与短视频可直接作为 PR 附件，帮评审者免去本地复现。

## Dashboard 与标注评审

[show](cli:command:show) 打开 Playwright Dashboard；`show --annotate` 切入标注模式：用户在实时页面上画框写注释，随后返回带标注的截图、区域快照与笔记，用于 UI 评审与设计反馈。

## 测试调试

对正在运行的 Playwright 测试，[pause-at](cli:command:pause-at) 让测试执行到指定位置（`<file>:<line>`）暂停，之后用 [resume](cli:command:resume) 继续或 [step-over](cli:command:step-over) 单步。

以上示例为说明性内容，未实际运行。
