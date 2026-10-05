---
title: gh run watch
command:
  - run
  - watch
---

监视一次工作流运行直到完成，并显示进度。

## 简介

`gh run watch` 持续刷新展示一次运行的进度，直到运行完成；刷新间隔由 `--interval` 控制（默认 3 秒），期间可按 Ctrl+C 退出。默认显示全部步骤，`--compact` 只显示相关/失败的步骤。若运行已经完成，直接输出其结论后退出。

本命令不支持细粒度 PAT 认证：目前无法创建带 `checks:read` 权限的细粒度 PAT。

## 参数

### `RUN-ID`

格式：`<run-id>`。必需。要监视的运行 ID。交互终端下可省略，gh 会从当前进行中的运行里选择；非交互环境必须给出。

## 选项

### `--exit-status`

格式：`--exit-status`。运行失败时以非零退出码退出（`1`，见[退出代码](../../../reference/exit-codes.md)）。

### `--compact`

格式：`--compact`。只显示相关/失败的步骤。

### `--interval`

短旗标 `-i`。格式：`--interval <int>`。刷新间隔，单位秒，默认 3。

## 使用提醒

- 监视输出包含运行头部信息、job 列表与注解；注解同样受 `checks:read` 权限限制，见上文简介。
- `--exit-status` 在运行结论不是 `success` 时返回非零退出码。

## 示例

```sh
# 监视一次运行直到结束
gh run watch

# 以紧凑模式监视
gh run watch --compact

# 运行结束后执行其他命令
gh run watch && notify-send 'run is done!'
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、刷新循环与紧凑渲染见 [pkg/cmd/run/watch/watch.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/run/watch/watch.go)。
