# CLI Fieldbook · 令册

有版本、有出处的 CLI 中文参考与实战手册。

本项目按工具与版本整理命令参考、概念、工作流和专题知识。首批收录 **Herdr 0.9.3** 和 **Jujutsu 0.45.1**，包括完整 Revset 专题。非官方翻译；每个版本说明来源、覆盖范围与验证边界。

[在线阅读](https://zhangzhenxiang666.github.io/cli-fieldbook/) · [贡献指南](CONTRIBUTING.md) · [审核报告](docs/AUDIT.md) · [设计](docs/DESIGN.md)

## 本地开发

准备 Node 24.20.0、pnpm 12.6.0、jj；GitHub 操作还需要 gh。版本在 `.node-version` 和 `package.json` 固定。

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:browser
pnpm dev
```

pnpm 12 内置 `docs` 命令，所以项目子命令必须写成 **`pnpm run docs …`**。

```sh
pnpm run docs check --json
pnpm run docs build --preview
pnpm run docs export jj 0.45.1 --lang zh-CN --format markdown --output .generated/jj.md
```

## 维护模型

- `catalog/` 保存工具、独立版本、中文 Markdown、固定来源快照与候选审阅基线。
- `schemas/v1/` 定义交换格式；`pipeline/` 执行校验和生成；`site/` 提供可信展示组件。
- `imports/legacy/` 是只读历史归档。归档中的脚本、HTML、TXT 不参与构建，也不自动执行。
- `.generated/`、站点页面、搜索索引和下载手册都是派生产物，不提交、不手工编辑。

普通纠错只编辑对应 Markdown。新工具通过目录发现，不需要前端注册表。每个工具版本自包含；默认入口由维护者明确设置。

## 发布

PR 提供检查结果与可下载预览。`main` 构建完整站点、审核报告和内容摘要；维护者在 `github-pages` 环境确认后，才部署同一次运行的产物。`review.lock.json` 只记录候选基线，不是批准凭据。

回滚在 Publish 工作流手动填写 `main` 历史中的完整提交 SHA；仍需环境确认。构建和部署不运行上游 CLI、不重新获取上游内容。

初始资料仍未采集目标二进制帮助，示例与工作流仍未实测。源码结构核对、语义复核、二进制行为测试是不同证据。

## 许可

自有代码和原创中文说明采用 Apache-2.0。上游摘录、快照和翻译保留原作者归属与适用许可，见 [NOTICE](NOTICE)、各工具 NOTICE 和固定来源的 LICENSE。第三方站点依赖保留其自身许可。
