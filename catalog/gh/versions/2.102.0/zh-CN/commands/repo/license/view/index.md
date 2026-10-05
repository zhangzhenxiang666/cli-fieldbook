---
title: gh repo license view
command:
  - repo
  - license
  - view
---

## 简介

按 license key 或 SPDX ID 查看具体的仓库许可证。

可先运行 [gh repo license list](cli:command:repo/license/list) 查看常用许可证；更多许可证见 <https://choosealicense.com/appendix>。交互式终端下先显示许可证描述、实施指引与详情链接，再输出许可证正文；stdout 被重定向时只输出正文。

## 参数

### `LICENSE-KEY|SPDX-ID`

格式：`{<license-key> | <spdx-id>}`。许可证的 key 或 SPDX ID，例如 MIT 的 key 为 `mit`、SPDX ID 为 `MIT`。

## 选项

### `--web`

短旗标 `-w`。格式：`--web`。在浏览器中打开 https://choosealicense.com/ 上该许可证的页面。

## 使用提醒

- 名称不是有效的许可证 key 或 SPDX ID 时报错，并提示运行 `gh repo license list` 查看可用项。
- 重定向输出可直接生成 LICENSE 文件，见下方示例。

## 示例

```sh
# 按 SPDX ID 查看 MIT 许可证
gh repo license view MIT

# 按 license key 查看 MIT 许可证
gh repo license view mit

# 按 SPDX ID 查看 GNU AGPL-3.0 许可证
gh repo license view AGPL-3.0

# 按 license key 查看 GNU AGPL-3.0 许可证
gh repo license view agpl-3.0

# 用 MIT 许可证创建 LICENSE.md
gh repo license view MIT > LICENSE.md
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 查询、404 提示与渲染逻辑见 [pkg/cmd/repo/license/view/view.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/license/view/view.go)。
