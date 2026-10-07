# 贡献指南

## AI 协作

仓库提供 [cli-fieldbook-docs skill](.agents/skills/cli-fieldbook-docs/SKILL.md)，整理来源调研、内容协议、工作流编写及审阅边界。可直接调用 `$cli-fieldbook-docs`；不支持 skill 发现的 Agent 可从 `AGENTS.md` 读取该入口。它引用现有 schema、设计决策和写作规范，协议更新时同步维护入口及相关引用。

有目标版本源码时，优先结合命令定义、参数解析、配置默认值及实际执行分支生成帮助文档和工作流，同时阅读官方 CLI、概念、专题和教程文档。资料发生差异时注明固定版本、依据和验证限制。

## 修正译文

编辑 `catalog/<tool>/versions/<version>/zh-CN/` 中对应 Markdown，保持命令、选项、函数和操作符的原始拼写。说明依据和未验证事项，然后运行：

```sh
pnpm check
pnpm test
pnpm run docs build --preview
```

正文变化会使已有审阅基线过期。普通贡献者不需要修改工具版本、哈希或生成文件；维护者复核后执行 `pnpm run docs review prepare <tool> <version>`。本命令准备新的候选输入，不批准发布、不移动默认版本。

## 新增工具与版本

```sh
pnpm run docs new-tool democtl --name Demo --repository https://example.com/democtl --summary '演示 CLI 的协议示例。'
pnpm run docs new-version democtl 1.0.0 --ref v1.0.0
# 有历史版本时可添加 --from <version>，只复用译文，不继承来源与审阅批准。
pnpm run docs import democtl 1.0.0 --input ./capture-data
```

`democtl` 是虚构示例，不是已收录工具。首次也可以直接导入包含 `version.yml` 的完整版本数据目录，不必先创建版本。

数据目录遵循 schemas/v1：包含 `upstream/source.lock.json`、`upstream/commands.json`、固定来源文本和可选中文内容。所有文件必须是 Markdown、JSON、YAML 或 TXT；禁止符号链接和越界路径。导入先验证临时目录，失败不改变现有版本；遇到人工内容冲突停止。已有来源的版本不能被整体覆盖。

无法运行时允许源码导入，但证据必须是实际取得的文件，不生成虚构 raw-help。来源锁定到完整提交 SHA；本首版不提供通用 help 采集器、自动下载执行或版本差异自动翻译。

根命令使用 `commands/index.md` 与 `command: []`；实际名为 index 的命令使用 `commands/index/index.md`。命令文档需要简介，有参数或本地选项时使用相应三级标题。全局继承与共享参数只翻译一次。专题内容是普通文章，可用 `identifiers` 为函数和操作符提供检索标识。

```markdown
---
title: 一个工作流
uses:
  - command:status
  - reference:expression/functions/parents
---

参见 [状态命令](cli:command:status)。
```

`uses` 和相对链接解析到同工具、同版本；`cli:` 在构建时变成普通 URL。文章只需标题，依赖和检索标识可选。不能写组件、脚本或原始 HTML；首版文章使用文字、表格和代码块。

## 申请发布

先解决覆盖、来源和语义问题，完成基线准备，再将版本 `publication` 改为 `published` 并明确设置工具的 `defaults.zh-CN`。它们是发布申请，不是审核自证；CI 会检查基线、完整性与引用。未完成草稿可以存储和预览，但不会成为公开导航、搜索或下载内容。

发布检查通过后，维护者在 GitHub 环境确认最终提交与构建摘要。批准后不改写源文件，也不重新构建；产物校验通过后仅加入本次外部审批记录链接。批准前修改内容会产生新的运行，需要重新确认。

## 版本控制与测试

本地用 jj bookmark 管理远端分支并用 `jj git push` 推送；用 gh 创建 PR。提交说明使用英文标签加中文短描述，例如 `feat: 新增工具参考`、`fix: 修复搜索范围`。Python 辅助操作统一用 `uv run`，归档中的脚本不会自动获得执行授权。

退出码：0 表示检查完成且没有错误；1 表示内容检查失败；2 表示来源获取失败；3 表示命令用法或内部错误。草稿警告不是公开发布证明。
