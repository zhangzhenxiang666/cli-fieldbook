---
title: gh issue reopen
command:
  - issue
  - reopen
---

## 简介

重新打开已关闭的议题，可同时附评论。议题已处于开启状态时不做更改并提示。编号对应拉取请求时改为重新打开该拉取请求。

## 参数

### `NUMBER|URL`

必需。议题选择器，两种形式任选其一：议题编号（如 `123`，可带 `#` 前缀）或议题 URL（如 `https://github.com/OWNER/REPO/issues/123`）。URL 自带仓库信息时以该仓库为准。

## 选项

### `--comment`

短旗标 `-c`。格式：`--comment <string>`。添加一条重新打开的评论。

## 使用提醒

- `--comment` 在重新打开前先行提交。
- 议题已处于开启状态时输出提示，不做更改并正常结束。

## 示例

```sh
# 重新打开 123 号议题
gh issue reopen 123

# 重新打开并附评论
gh issue reopen 123 --comment "已在新版本修复"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [pkg/cmd/issue/reopen/reopen.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/reopen/reopen.go)。
