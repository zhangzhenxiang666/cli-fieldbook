---
title: 5. 验证边界
---

已完成：固定 release/tag、检查公开命令树、逐项解释该树的参数、核对关键运行时解析器、阅读源码测试/帮助中的行为约束、记录差异、核对清单与生成物结构。

未完成：在本环境下载并执行 v0.9.3 二进制；实际启动 TUI/server；验证本地/SSH/Windows/macOS 的运行行为；真实执行插件安装、Agent 登录及任务；对不同终端尺寸截图比对原始帮助。

原始调研阶段的 GitHub 下载访问未成功。本次迁移已经保存固定来源文件，仍未运行目标二进制。原包的 `audit-help.py` 仅在只读归档中保留，首版不提供自动采集入口。

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
