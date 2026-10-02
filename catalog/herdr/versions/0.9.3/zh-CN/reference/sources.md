---
title: 版本、来源与调研方法
---

## 基准版本

- 官方仓库：<https://github.com/herdrdev/herdr>
- 固定 release：<https://github.com/herdrdev/herdr/releases/tag/v0.9.3>
- 发布日期：2026-09-29；短提交：`7b116c0`。
- 调研日期：2026-10-01。
- 官方在线 CLI 参考：<https://herdr.dev/docs/cli-reference/>。网站用于交叉检查；行为以本手册锁定版本源码为准。
- 上游许可证：[https://github.com/herdrdev/herdr/blob/v0.9.3/LICENSE](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/LICENSE)（Apache-2.0）。

## 主要源码索引

| 编号  | 核对内容                    | 固定版本源码                                                                                                                                     |
| --- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| S01 | 统一命令树、参数与帮助生成           | [src/cli/spec.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966)                 |
| S02 | 根命令、启动选项、默认配置及快捷键       | [src/main.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/main.rs)                                 |
| S03 | 主分发、读取参数、ID 与键名处理       | [src/cli.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli.rs)                                   |
| S04 | Pane 命令及实际参数解析          | [src/cli/pane.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)                         |
| S05 | Agent 命令、等待与启动语义        | [src/cli/agent.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/agent.rs)                       |
| S06 | Workspace 命令及 --group   | [src/cli/workspace.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/workspace.rs)               |
| S07 | Git worktree 命令         | [src/cli/worktree.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/worktree.rs)                 |
| S08 | Tab 命令                  | [src/cli/tab.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/tab.rs)                           |
| S09 | 插件命令、popup 与尺寸参数        | [src/cli/plugin.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/plugin.rs)                     |
| S10 | --machine 路由与白名单        | [src/cli/target.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/target.rs#L174-L301)           |
| S11 | Machine 命令帮助定义          | [src/cli/spec/machine.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec/machine.rs)         |
| S12 | 补全命令帮助定义                | [src/cli/spec/completion.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec/completion.rs)   |
| S13 | Server 命令及 live-handoff | [src/cli/server.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/server.rs)                     |
| S14 | API 输出与 schema          | [src/cli/api.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/api.rs)                           |
| S15 | API 请求输出适配              | [src/cli/runtime.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/runtime.rs)                   |
| S16 | 状态命令                    | [src/cli/status.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/status.rs)                     |
| S17 | 集成安装命令                  | [src/cli/integration.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/integration.rs)           |
| S18 | Agent 类型、名称与别名          | [src/detect/mod.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/detect/mod.rs)                     |
| S19 | 集成注册与规范名称               | [src/integration/registry.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/integration/registry.rs) |
| S20 | 实验性集成目标                 | [src/integration/mod.rs](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/integration/mod.rs)           |

## 方法

先固定 release 与 tag，再从 `spec::command()` 递归梳理公开节点；查看 `main.rs` 的根帮助与实际分发；对 pane、agent、workspace、worktree、plugin、machine 路由、schema 输出等关键路径检查手写解析器；再整理说明、互斥/必需条件、枚举、默认行为、已有测试断言和工作流。

125 是手册所覆盖公开命令树的节点数，而不是通过执行二进制递归导出的实测数量。该计数包含根与分组，并排除别名重复计数和内部入口。自动化生成检查验证了：命令路径唯一、父子节点存在、18 个顶层入口、103 个叶子、24 个工作流，以及参数条目均有中文说明。

原始调研阶段的发布包下载未成功；本手册没有声称已经构建源码、运行 server、测试 SSH、安装插件或完成 Agent 操作。公开帮助树覆盖是全量的；应用内部实现与所有协议方法的核对不是全量代码审计。

## 翻译约定

命令与参数保持原值；占位符保留帮助式英文形式。中文说明包含对无 `.help()` 参数的解释性补充。未在 spec 列出的运行时接受项另列，未确认的默认值不填猜测数。这里的“支持”仅指该版本相应解析/分发路径，不保证外部 Agent、插件、SSH 环境可用。

[S01]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966

[S02]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/main.rs

[S03]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli.rs

[S04]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs

[S05]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/agent.rs

[S06]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/workspace.rs

[S07]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/worktree.rs

[S08]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/tab.rs

[S09]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/plugin.rs

[S10]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/target.rs#L174-L301

[S11]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec/machine.rs

[S12]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec/completion.rs

[S13]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/server.rs

[S14]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/api.rs

[S15]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/runtime.rs

[S16]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/status.rs

[S17]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/integration.rs

[S18]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/detect/mod.rs

[S19]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/integration/registry.rs

[S20]: https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/integration/mod.rs

## 令册首版迁移复核

本次迁移把 tag 解析为完整提交 SHA，并将实际使用的源码与上游仓库文档原文保存到 `upstream/source-extracts/`。每份原文的路径、固定提交 URL、SHA-256 和取得时间记录在 `upstream/source.lock.json`；它是所用文件集合，不是上游仓库的完整镜像。

结构检查覆盖全部迁移节点、参数说明与内部引用；行为复核范围和发现的修正详见[首版审核报告](https://github.com/zhangzhenxiang666/cli-fieldbook/blob/main/docs/AUDIT.md)。历史网页调研及其日期保留为出处背景，不用滚动 latest 证明当前固定版本。没有补写原始帮助、二进制运行日志或历史批准记录。示例和工作流仍未实测。
