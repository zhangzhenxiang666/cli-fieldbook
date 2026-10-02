---
title: 输出格式与自动化
---

coolify CLI 通过根命令的 `--format` 持久旗标统一控制输出格式，取值 `table`、`json`、`pretty`，默认 `table`。三种格式的定位：

- `table`：等宽表格，适合人工查看列表类结果；
- `json`：紧凑单行 JSON，适合脚本、`jq` 与 CI 消费；
- `pretty`：带缩进的 JSON，适合人工检查结构化字段。

需要注意一个实现细节：部分单对象输出命令在实现里把 `table` 回退为 `pretty`——表格适合列表，单对象直接打印 JSON 更完整。以实际命令输出为准。

## 配合 jq 使用

```sh
coolify app list --format json | jq -r '.[].uuid'
```

先用 `jq` 过滤出需要的字段，再把结果交给后续命令，是 CI 中串联 coolify CLI 的常用模式。

## 敏感信息

默认输出会遮蔽敏感字段；加 `-s`（`--show-sensitive`）后才显示。脚本中解析敏感字段时需显式传入该旗标，并注意不要把输出写入会被共享的日志。

## 调试

`--debug` 输出调试信息（包括使用的配置文件路径等），排查认证与配置问题时可配合 `context verify` 使用。

源码：[S98](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/internal/output/formatter.go) [S99](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/internal/output/json.go)
