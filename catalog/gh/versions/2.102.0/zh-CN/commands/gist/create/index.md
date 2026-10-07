---
title: gh gist create
command:
  - gist
  - create
---

用给定内容创建新的 GitHub gist，别名 `gh gist new`。

## 简介

`gh gist create` 可从一个或多个文件创建 gist，文件名支持 glob 模式匹配；也可以把 `-` 作为文件名从标准输入读取。既未给出文件名、标准输入又是终端时，命令直接报错；标准输入接了管道时可以省略文件名。

从标准输入创建时，默认文件名为 `gistfile0.txt`，可用 `--filename` 覆盖。gist 默认为机密（secret）状态，用 `--public` 才会公开列出。文件内容为二进制时不支持上传。创建成功后在标准输出打印 gist 的 URL。

## 参数

### `FILENAME|PATTERN|-`

格式：`[<filename>... | <pattern>... | -]`。要写入 gist 的文件，可给出多个；支持 glob 模式（如 `*.md`）；传 `-` 表示从标准输入读取内容。

## 选项

### `--desc`

短旗标 `-d`。格式：`--desc <string>`。为 gist 指定描述。

### `--web`

短旗标 `-w`。格式：`--web`。创建完成后在浏览器中打开该 gist，而非仅打印 URL。

### `--public`

短旗标 `-p`。格式：`--public`。把 gist 公开列出；默认为机密（secret）。

### `--filename`

短旗标 `-f`。格式：`--filename <string>`。从标准输入读取内容时使用的文件名；未指定时默认 `gistfile0.txt`。

## 使用提醒

- 多个文件会合并进同一个 gist，而不是各建一个。
- 二进制文件内容不受支持，上传会报错。

## 示例

```sh
# 把文件 hello.py 发布为公开 gist
gh gist create --public hello.py

# 创建带描述的 gist
gh gist create hello.py -d "my Hello-World program in Python"

# 创建包含多个文件的 gist
gh gist create hello.py world.py cool.txt

# 用模式匹配创建包含多个文件的 gist
gh gist create *.md *.txt artifact.*

# 从标准输入读取内容创建 gist
gh gist create -

# 从其他命令的管道输出创建 gist
cat cool.txt | gh gist create
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、stdin 与 glob 处理、创建流程见 [pkg/cmd/gist/create/create.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/gist/create/create.go)。
