---
title: gh gist rename
command:
  - gist
  - rename
---

重命名 gist 中的一个文件。

## 简介

`gh gist rename` 修改指定 gist 中一个文件的文件名，内容保持不变。只能重命名自己拥有的 gist；旧文件名不在 gist 中、或新文件名与 gist 中现有文件冲突时，命令报错且不做任何修改。三个参数都必须给出，本命令无交互模式。

## 参数

### `ID|URL`

格式：`{<id> | <url>}`。目标 gist，接受 gist ID 或 URL 两种形式。

### `OLD-FILENAME`

格式：`<old-filename>`。要重命名的现有文件名；gist 中不存在该文件时报错。

### `NEW-FILENAME`

格式：`<new-filename>`。文件的新名字；gist 中已有同名文件时报错。

## 使用提醒

- 重命名只能作用于自己拥有的 gist，操作他人 gist 会报错。

## 示例

```sh
# 重命名 gist 中的文件
gh gist rename 5b0e0062eb8e9654adad7bb1d81cc75f hello.py intro.py

# 以 URL 指定 gist
gh gist rename https://gist.github.com/OWNER/5b0e0062eb8e9654adad7bb1d81cc75f old.txt new.txt
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与重命名前后的校验见 [pkg/cmd/gist/rename/rename.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/gist/rename/rename.go)。
