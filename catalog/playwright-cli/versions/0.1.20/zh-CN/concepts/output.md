---
title: 输出模式
---

playwright-cli 的响应有三种输出形态：默认文本、`--raw` 纯值与 `--json` 结构化。本文说明各模式的用途。本文依据官方 skills 文档快照与固定提交 `cli-client/output.ts`、`program.ts`。

## 默认文本输出

面向人读：包含页面状态（URL、标题）、生成代码与快照等段落。交互调试时直接阅读。

## --raw：纯结果值

剥离页面状态与快照等附加段落，只输出命令的结果值，用于管道与变量赋值。不产生输出的命令在 raw 模式下返回空。

```sh
playwright-cli --raw eval "JSON.stringify(performance.timing)" | jq '.loadEventEnd - .navigationStart'
TOKEN=$(playwright-cli --raw cookie-get session_id)
playwright-cli --raw localstorage-get theme
```

## --json：结构化输出

把每条响应包装为 JSON 对象，供程序化消费：

```sh
playwright-cli list --json
```

## 模式选择建议

人工探索用默认输出（自带快照便于下一步交互）；脚本取值用 `--raw`；需要状态元数据（如会话清单）用 `--json`。

以上示例为说明性内容，未实际运行。
