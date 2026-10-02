---
title: 2. 已确认差异
---

| 项目                                       | 帮助/spec                       | 运行时或实际约束                   | 写脚本的建议                      |
| ---------------------------------------- | ----------------------------- | -------------------------- | --------------------------- |
| 根命令目录                                    | 手写根帮助没有列全 `terminal`、`plugin` | 统一 spec 和分发器支持             | 使用完整命令索引                    |
| `workspace close --group`                | spec 未列                       | workspace 解析器接受            | 放在 workspace ID 后，确认关闭范围    |
| `plugin pane open --placement popup`     | spec 枚举未列 popup               | 插件解析器支持                    | 版本固定后使用，见工作流                |
| `plugin pane open --width/--height`      | spec 未列                       | 解析器接受尺寸/百分比                | 与适用的 popup 布局配合             |
| `--placement fullscreen`                 | 不是 spec 规范值                   | 运行时作 `zoomed` 兼容别名         | 新脚本用 zoomed                 |
| `plugin pane open --plugin/--entrypoint` | 未标记 required                  | 运行时要求提供                    | 两项总是显式传入                    |
| `pane split --direction`                 | 未标记 required                  | 运行时要求提供                    | 显式 right 或 down             |
| `worktree ... --json`                    | spec 未列                       | 四个子命令接受，无效果                | 默认已经 JSON，无需添加              |
| `pane report-metadata --state-label`     | spec 使用单值设置                   | 运行时可重复                     | 每个状态独立一次选项                  |
| `api schema --json --output`             | spec 没声明互斥                    | 解析器拒绝同时使用                  | 二选一                         |
| `pane input` 的目标                         | spec 选择项看似全可选                 | 运行时需要有效目标选择                | 用 ID 或 --current            |
| `worktree remove --workspace`            | spec 未标记 required             | 运行时要求 workspace            | 总是传 ID                      |
| `worktree open` 选择条件                     | 单项看似可选                        | 实际需 path 或 branch          | 明确二选一                       |
| `recent_unwrapped`                       | 帮助只列带连字符的值                    | 读取解析器保留下划线别名               | 新脚本用 recent-unwrapped       |
| `--flag=value`                           | clap 风格容易使人以为均支持              | 并非所有手写解析器统一展开              | 优先 `--flag VALUE`           |
| `herdr help ...`                         | 自动 help 子命令被关闭                | 某些组有手写 `help` 处理，但不是通用入口   | 用完整路径紧接 `--help`            |
| 子命令帮助定位                                  | 按命令路径寻找帮助节点                   | 中间夹入业务位置参数/`--` 可能走别的解析路径  | 使用 `herdr pane read --help` |
| `done`                                   | wait 状态枚举包括                   | report-agent 的 state 枚举不包括 | 不要跨命令复用状态枚举                 |

来源：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966)[S03](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli.rs)[S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)[S06](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/workspace.rs)[S07](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/worktree.rs)[S09](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/plugin.rs)[S14](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/api.rs)。这些补充项独立标注在命令章节中，未伪装成原帮助已有内容。
