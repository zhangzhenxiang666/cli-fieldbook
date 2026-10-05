---
title: gh pr diff
command:
  - pr
  - diff
---

查看拉取请求中的变更。

## 简介

显示拉取请求的差异。不带参数时选择当前分支所属的拉取请求。

用 `--web` 改为在网页浏览器中打开拉取请求的差异页。

用 `--exclude` 按 glob 模式从差异中排除文件；模式在所有平台上都以正斜杠作为路径分隔符，可重复给出以排除多个模式。

默认会中和差异中的终端转义序列，防止其操控终端；传入 `--allow-escape-sequences` 可原样输出差异，例如把补丁管道给其他程序时。

## 参数

### `NUMBER|URL|BRANCH`

可选，命令形态为 `[<number> | <url> | <branch>]`。定位目标拉取请求，三种形式：

- 数字：拉取请求编号，如 `123`；
- URL：拉取请求地址，如 `https://github.com/OWNER/REPO/pull/123`；
- 分支名：头部分支名，如 `patch-1`，跨仓库时可用 `OWNER:patch-1`。

省略时默认选择当前分支所属的拉取请求。

## 选项

### `--color`

格式：`--color <string>`。在差异输出中使用颜色。取值 `always`、`never`、`auto`，默认 `auto`。

### `--patch`

格式：`--patch`。以补丁格式显示差异。

### `--name-only`

格式：`--name-only`。只显示变更文件的名称。

### `--web`

短旗标 `-w`。格式：`--web`。在浏览器中打开拉取请求的差异。

### `--exclude`

短旗标 `-e`。格式：`--exclude <patterns>`。从差异中排除匹配 glob `patterns` 的文件。

### `--allow-escape-sequences`

格式：`--allow-escape-sequences`。允许打印终端转义序列。

## 使用提醒

- 使用 `-R` 指定仓库时必须显式给出参数，否则报错。
- `--web` 打开的是拉取请求的 Files changed 页（`…/files`）。
- `--name-only` 优先于 `--patch`：两者同时给出时只输出文件名。
- 输出未被终端接收且未给 `--allow-escape-sequences` 时，携带转义序列的差异会被拒绝而非静默改写。

## 示例

```sh
# 查看当前分支的差异
$ gh pr diff

# 查看指定拉取请求的差异
$ gh pr diff 123

# 从差异输出中排除文件
$ gh pr diff --exclude '*.yml' --exclude 'generated/*'

# 按名称排除匹配的文件
$ gh pr diff --name-only --exclude '*.generated.*'
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、颜色处理、转义序列中和与排除模式见 [pkg/cmd/pr/diff/diff.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/diff/diff.go)。
