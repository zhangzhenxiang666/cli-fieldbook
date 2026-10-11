---
title: cargo add
command:
  - add
---

向 `Cargo.toml` 清单添加依赖，或修改既有依赖项。

## 简介

`cargo add` 直接修改清单文件：把依赖写入 `dependencies` 表，或按选项写入 `dev-dependencies`、`build-dependencies`、平台特定的 `target.<TARGET>.…` 表；随后重新解析依赖并更新 `Cargo.lock`。要添加的包已存在时，按本次给出的旗标更新既有条目而不是重复添加。成功后，命令输出会列出该依赖启用（`+`）与禁用（`-`）的特性。

依赖来源三选一，至少给出一个：

- 位置参数 `<DEP_ID>`：`<name>`（如 `serde`，使用最新版本）或 `<name>@<version-req>`（如 `serde@1`、`serde@=1.0.38`），从注册表获取；
- `--path <PATH>`：本地路径；
- `--git <URI>`：git 仓库，无其他信息时使用其主分支最新提交。

未指明来源（版本、路径或 git）时，会尽力推断一个来源，包括：其他表中的既有依赖（如 `dev-dependencies` 里的同名项）、工作区成员、注册表中的最新发布版。

特性用 `-F`/`--features` 启用，可重复给出，值以空格或逗号分隔；同时添加多个 crate 时用 `crate/feature` 语法限定归属（不写限定且多于一个 crate 时会报错并给出建议写法）；`dep:` 显式语法不被接受。

在工作区中需要唯一确定要修改的包：有多个候选而未用 `-p` 指定时报错并列出可用包。全局选项（`--offline`、`--locked` 等）见 [cargo](cli:command:)。

## 参数

### `crates`

可选（可多个），写作 `<DEP_ID>`。要添加为依赖的包引用：`<name>` 或 `<name>@<version-req>`。与 `--path`/`--git` 同用时可以省略，此时从所选来源推断 crate 名；三者也同属一个必需选项组，至少要给出其一。

## 选项

### `--no-default-features`

格式：`--no-default-features`。禁用该依赖的默认特性。

### `--default-features`

格式：`--default-features`。重新启用默认特性（覆盖 `--no-default-features` 的效果）。

### `--features`

短旗标 `-F`。格式：`--features <FEATURES>`。要启用的特性列表，空格或逗号分隔，可重复给出；添加多个 crate 时用 `package-name/feature-name` 语法限定归属。

### `--optional`

格式：`--optional`。把依赖标记为可选：包名会作为你的 crate 的一个特性暴露。不能与 `--dev` 同用。

### `--no-optional`

格式：`--no-optional`。把依赖标记为必需：该包会从你的特性中移除。覆盖 `--optional`；不能与 `--dev` 同用。

### `--public`

格式：`--public`。把依赖标记为 public（不稳定）：依赖可以出现在库的公开 API 中。不能与 `--dev`、`--build` 同用。

### `--no-public`

格式：`--no-public`。把依赖标记为私有（不稳定）：可在实现中使用该 crate，但它不能出现在公开 API 中。覆盖 `--public`。

### `--rename`

格式：`--rename <NAME>`。重命名依赖。典型用途：依赖同一 crate 的多个版本、或使用来自不同注册表的同名 crate。同时添加多个 crate 时不能使用。

### `--path`

格式：`--path <PATH>`。要添加的本地 crate 的文件系统路径。与 `--git` 互斥。

### `--base`

格式：`--base <BASE>`。从本地 crate 添加时使用的 path base（不稳定）。必须与 `--path` 同用。

### `--git`

格式：`--git <URI>`。git 仓库地址；无其他信息时使用主分支最新提交。

### `--branch`

格式：`--branch <BRANCH>`。从 git 添加时使用的分支。必须与 `--git` 同用。

### `--tag`

格式：`--tag <TAG>`。从 git 添加时使用的标签。必须与 `--git` 同用。

### `--rev`

格式：`--rev <REV>`。从 git 添加时使用的具体引用：哈希与远程命名引用的兜底形式。必须与 `--git` 同用。

### `--registry`

格式：`--registry <NAME>`。该依赖使用的注册表。

### `--dev`

格式：`--dev`。添加为开发依赖（`dev-dependencies`）：不用于正常构建，用于测试、示例与基准的编译，也不会传播给依赖本包的其他包。

### `--build`

格式：`--build`。添加为构建依赖（`build-dependencies`）：仅供构建脚本（`build.rs`）使用。

### `--target`

格式：`--target <TARGET>`。添加为面向给定目标平台的依赖。为避免 shell 展开，建议给值加引号，如 `--target 'cfg(windows)'`。

## 使用提醒

- 至少给出一个来源：位置参数 `<DEP_ID>`、`--path` 或 `--git`。
- `--branch`、`--tag`、`--rev` 三者互斥，且都需要 `--git`。
- `-n`/`--dry-run` 不实际写入清单。
- `-p`/`--package` 指定要修改的包（共享选项，SPEC 格式见 [cargo build](cli:command:build)）；传入不带值的 `-p` 会列出可用包。
- 依赖名不能以 `+` 开头，否则会提示把工具链写法 `cargo +<toolchain> add` 移到包名之前。

## 示例

```sh
# 添加 regex 作为依赖
cargo add regex

# 添加 trybuild 作为开发依赖
cargo add --dev trybuild

# 添加旧版本的 nom
cargo add nom@5

# 同时添加两个 crate 并启用 serde 的 derive 特性
cargo add serde serde_json -F serde/derive

# 添加 windows 为 cfg(windows) 平台特定依赖
cargo add windows --target 'cfg(windows)'
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、来源互斥关系与特性解析见 [src/bin/cargo/commands/add.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/add.rs)。
- 依赖解析、版本选择与特性列表输出见 [src/cargo/ops/cargo_add/mod.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_add/mod.rs)。
