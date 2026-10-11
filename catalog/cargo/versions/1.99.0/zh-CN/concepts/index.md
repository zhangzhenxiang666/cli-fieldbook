---
title: 阅读说明
---

本版本固定上游 cargo 1.99.0（cargo 仓库 tag `0.99.0`，commit `797e8a9bca276c1c9f9f738d2a20f484fa4eea9d`，随 Rust 1.99.0 于 2026-10-01 发布）。命令树按该提交的源码静态枚举：全部静态节点共 46 个，本版全部收录，其中公开命令 37 个、隐藏命令 4 个（`git-checkout`、`read-manifest`、`verify-project`、`clean gc`）、不稳定门控命令 5 个（`config` 与 `config get` 需 nightly `-Z unstable-options`；`report timings`、`report sessions`、`report rebuilds` 需 `-Z build-analysis`）。数量口径与验证方法见[来源、覆盖与校对记录](../reference/sources.md)。

阅读提示：

- 命令参考以命令树组织，从 [cargo](cli:command:) 进入；全局选项（`-v`/`-q`/`--color`/`--locked`/`--offline`/`--frozen`/`--config`/`-Z`）在根命令页解释，编译族命令共享的目标选择与特性旗标在 [cargo build](cli:command:build) 页解释。
- 环境变量、退出代码与输出消息格式另有专题参考：[环境变量](../reference/environment.md)、[退出代码](../reference/exit-codes.md)、[输出与消息格式](../reference/formatting.md)。
- 概念文章讲解背景与边界：[cargo 总览与命令模型](overview.md)介绍 cargo 的定位、版本口径与子命令解析顺序；[包、crate 与编译目标](package-model.md)说明 package/crate/target 的关系与源码布局约定；[清单与工作区](manifest.md)覆盖 `Cargo.toml` 的段落结构和工作区机制；[依赖解析与 Cargo.lock](dependencies.md)讲依赖来源、版本需求与锁定语义；[特性与 profile](features-profiles.md)覆盖条件编译特性与编译配置；[注册表与发布](registries-publishing.md)讲 crates.io、备用注册表、凭据与发布流程；[配置层与 CARGO_HOME](configuration.md)说明 `config.toml` 分层与主目录布局；[目标平台与交叉编译](targets-platforms.md)介绍目标三元组、`--target` 与平台相关配置。

内容边界：

- 本版本未采集二进制原始帮助；命令事实与帮助式视图自固定提交的源码与仓库内 cargo 书快照重建。
- 示例与配置片段为说明性内容，未实际运行；未作结构化记录的默认值不补猜，请以各命令页释义与上游源码为准。
- 版本当前为草稿状态，未经发布审阅。
