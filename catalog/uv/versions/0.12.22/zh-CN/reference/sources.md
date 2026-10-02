---
title: 来源、覆盖与校对记录
---

## 固定基准

- 项目：[astral-sh/uv](https://github.com/astral-sh/uv)。
- 稳定版：[0.12.22](https://github.com/astral-sh/uv/releases/tag/0.12.22)，2026-10-02 发布；tag 指向 commit `70fe1196a546e49148a73b1c592b2f74c33af80e`。
- 查证日期：2026-10-02。手册的源码链接均固定到该 commit，不链接未发布 main 代码。
- 官方文档：[docs.astral.sh/uv](https://docs.astral.sh/uv/)。
  该 URL 是滚动的 latest，不是永久版本快照；本次以其对应时期的 `docs/` 目录快照（随源码固定）为准，未将 main 文档行为写入本版本。
- 原项目著作权属于 Astral Software Inc.，源码适用 MIT OR Apache-2.0；
  中文说明、结构化组织、场景示例为本次整理。并非 uv 官方中文发布物。

## 数量怎么计算

| 分类 | 节点数 | 非根叶子命令数 | 说明 |
| --- | --: | ------: | --- |
| 公开 | 62 | 54 | 含 uv 根入口与 auth、tool、python、pip、workspace、cache、self 命令组 |
| 隐藏 | 16 | 14 | 含 upgrade、uvx、pip debug、auth helper 组、build-backend 组（8 个 PEP 517/660 钩子）、clean、generate-shell-completion |
| 合计 | 78 | 68 | 别名不重复计数 |

"78 个节点"不能写成"78 个独立公开子命令"。命令树自 `crates/uv-cli/src/lib.rs` 的 clap 枚举（`Commands` 与各子命令 enum）逐项核对，未运行二进制验证。

## 方法与验证限制

- 帮助式视图与命令事实自固定提交源码重建；本版本未采集二进制原始帮助，未创建 `raw-help/`。
- 全局选项定义于 `TopLevelArgs`/`GlobalArgs`（lib.rs）与 `CacheArgs`（crates/uv-cache/src/cli.rs）；共享参数组（索引、解析器、安装器等）按声明处展开登记到各命令。
- 默认值仅结构化记录 clap 显式声明（`default_value`/`default_value_t`）；来自 uv-settings 合并链的默认未逐项抽取，释义中不写"上游未说明"，请以各选项释义与上游源码为准。
- 值枚举（如 `--resolution`、`--prerelease`、`--index-strategy`、`--link-mode`、`--keyring-provider`）定义于其他 crate，不在本版本快照内，未填 `values` 字段。
- 协议要求别名在版本内唯一：`ls` 别名仅登记于 `uv pip list`，`ensurepath` 仅登记于 `uv tool update-shell`；`uv python list`、`uv tool list`、`uv python update-shell` 的别名在各自页面正文说明。
- 示例与工作流未实际运行；"请求被接受"与"任务已完成"的区分依据源码注释与官方文档，未经运行验证。
- 版本当前为草稿状态；未准备审阅基线，未经发布批准。
