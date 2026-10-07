---
title: gh release delete-asset
command:
  - release
  - delete-asset
---

删除 release 中的某个资产。

## 简介

交互终端下删除前会请求确认，`--yes` 可跳过。目标 release 按给出的 tag 查找（含按待定 tag 查找草稿 release），在其中按名称精确匹配资产；资产不存在于该 release 时报错。

## 参数

### `TAG`

格式：`<tag>`，必填。目标 release 的 tag 名。

### `ASSET-NAME`

格式：`<asset-name>`，必填。要删除的资产名称。

## 选项

### `--yes`

短旗标 `-y`。格式：`--yes`。跳过确认提示。

## 使用提醒

- 恰好接受两个参数（tag 与资产名），多给或少给都会报错。
- 不可变 release 的已发布资产无法删除，删除请求会被拒绝。
- 目标仓库用继承选项 `-R`/`--repo` 切换。

## 示例

```sh
# 删除指定 release 中的资产（交互确认）
gh release delete-asset v1.2.3 asset.zip

# 跳过确认
gh release delete-asset v1.2.3 asset.zip --yes
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、确认流程与资产匹配见 [pkg/cmd/release/delete-asset/delete_asset.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/delete-asset/delete_asset.go)。
