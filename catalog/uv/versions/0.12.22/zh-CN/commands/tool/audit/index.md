---
title: uv tool audit
command:
  - tool
  - audit
---

## 简介

审计已安装的工具及其依赖，检查是否含已知漏洞。

针对工具环境中的包向漏洞查询服务（默认 OSV）发起查询并报告结果。审计需要网络访问，无法在离线模式下执行。查询相关的选项与项目级命令 [uv audit](cli:command:audit) 共用一套定义。

## 参数

### `name`

格式：`<NAME>...`。要审计的已安装工具名；可提供多个，或改用 `--all`。

## 选项

### `--help`

短旗标 `-h`。显示简明帮助；传入 `--help` 时显示长帮助。

### `--all`

审计全部已安装工具；与 `<NAME>` 互斥。

### `--offline`

离线模式。本命令不支持离线审计——该选项仅为屏蔽不适用的全局 offline 选项而保留，帮助中隐藏。

### `--output-format`

格式：`--output-format <OUTPUT_FORMAT>`。选择输出格式，取值 `text`、`json` 或 `sarif`，默认 `text`。

### `--ignore`

格式：`--ignore <IGNORE>`。按漏洞 ID（含别名）忽略匹配的漏洞，使其不出现在审计结果中；可多次传入。

### `--ignore-until-fixed`

格式：`--ignore-until-fixed <IGNORE_UNTIL_FIXED>`。按漏洞 ID 暂时忽略，但仅在没有可用修复版本期间忽略；一旦出现修复版本，该漏洞会重新出现在结果中；可多次传入。

### `--service-format`

格式：`--service-format <SERVICE_FORMAT>`。漏洞查询服务的格式，默认 `osv`；每种格式有默认 URL，可用 `--service-url` 覆盖。

### `--service-url`

格式：`--service-url <SERVICE_URL>`。漏洞服务 API 端点 URL；未提供时使用所选服务的默认 URL。服务需使用 OSV 协议，除非 `--service-format` 另行指定了格式。

## 使用提醒

- 审计需要网络访问；无法在离线模式下执行（`--offline` 在本命令中不可用）。
- 审计对象是已安装工具；查看工具清单用 [uv tool list](cli:command:tool/list)，审计项目依赖用 [uv audit](cli:command:audit)。
- 忽略漏洞时优先考虑 `--ignore-until-fixed`：修复版本发布后漏洞会重新报告，避免长期遮蔽。

## 示例

审计指定工具，或审计全部工具并以 JSON 输出：

```console
$ uv tool audit ruff
$ uv tool audit --all --output-format json
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令定义于 `ToolCommand::Audit`/`ToolAuditArgs`，查询选项来自 `AuditCommonArgs` 共享组（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
