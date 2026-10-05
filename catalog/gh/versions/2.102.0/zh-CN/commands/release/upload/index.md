---
title: gh release upload
command:
  - release
  - upload
---

向 release 上传资产文件。

## 简介

上传按固定并发 5 进行，目标 release 按给出的 tag 查找（含按待定 tag 查找草稿 release）。要为资产定义显示 label，在文件名后追加以 `#` 起始的文本（如 `asset.zip#My display label`）。

目标 release 已存在同名资产而未使用 `--clobber` 时，命令报错并列出冲突的资产名。使用 `--clobber` 时会先删除既有同名资产再上传新资产；若上传失败，原资产已经丢失、无法找回。终端下全部上传成功后输出成功信息。

## 参数

### `TAG`

格式：`<tag>`，必填。目标 release 的 tag 名。

### `FILES`

格式：`<files>...`，必填。要上传的一个或多个资产文件，支持 glob 模式；文件名后可追加 `#` 起始的显示 label。

## 选项

### `--clobber`

格式：`--clobber`。删除并重新上传同名既有资产。

## 使用提醒

- 命令至少需要两个参数（tag 与至少一个文件），否则报错。
- `--clobber` 先删后传，上传中途失败时原资产不会恢复；对不可变 release 的已发布资产，删除本身也会被拒绝。
- 目标仓库用继承选项 `-R`/`--repo` 切换。

## 示例

```sh
# 向指定 release 上传文件
gh release upload v1.2.3 ./dist/*.tgz

# 覆盖同名既有资产
gh release upload v1.2.3 app.zip --clobber

# 上传并设置显示 label
gh release upload v1.2.3 './app.zip#My display label'
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、同名冲突检查与成功输出见 [pkg/cmd/release/upload/upload.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/upload/upload.go)；该文件还包含模仿 GitHub 平台侧的文件名净化逻辑，`--clobber` 的同名判断依赖它。
- 资产参数解析与并发上传（固定并发 5）见 [pkg/cmd/release/shared/upload.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/shared/upload.go)。
