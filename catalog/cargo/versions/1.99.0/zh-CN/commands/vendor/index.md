---
title: cargo vendor
command:
  - vendor
---

把一个项目的全部远程依赖（crates.io 与 git 来源）下载到本地 vendor 目录，供来源替换后离线构建使用。

## 简介

`cargo vendor` 会把工作区（以及 `-s`/`--sync` 额外指定的清单所对应的工作区）解析出的全部远程依赖复制到 `<path>` 目录（默认 `vendor`），并为每个包写入校验文件 `.cargo-checksum.json`。path 依赖不会被复制，它们本来就在仓库里。

vendoring 完成后，本命令会向标准输出打印启用 vendored 源所需的 `[source]` 配置，形如：

```toml
[source.crates-io]
replace-with = "vendored-sources"

[source.vendored-sources]
directory = "vendor"
```

需要把这段配置加入或重定向到 Cargo 配置文件（通常是项目本地的 `.cargo/config.toml`），也就是所谓的来源替换（source replacement）：此后 cargo 解析依赖时会改读 vendor 目录而不是访问网络。git 依赖与其他注册表的来源也会生成对应的替换条目。

默认情况下本命令忽略 `[source]` 配置，直接从原始来源（如 crates.io）下载；`--respect-source-config` 会改为读取并尊重 `.cargo/config.toml` 中的 `[source]` 配置。

cargo 像对待注册表与 git 来源一样把 vendored 源视为只读。若要修改某个远程来源的 crate，应使用 `[patch]` 或指向本地副本的 `path` 依赖，这样 cargo 才能在增量重建时正确处理它。

目录命名默认只在同名包存在多个版本时才追加版本后缀（如 `futures-0.1.13`），单一版本使用裸包名（如 `futures`）。

## 参数

### `path`

可选，写作 `<path>`。vendor 输出目录，默认为 `vendor`。

## 选项

### `--no-delete`

不删除 vendor 目录中已有的旧 crate，保留其全部现有内容。默认情况下 vendoring 前会清掉目录中不再需要的旧条目（以 `.` 开头的条目除外，依据源码）。

### `--sync`

短旗标 `-s`。格式：`--sync <TOML>`。额外指定一个也要同步 vendor 的 `Cargo.toml` 清单，可重复给出。用于把多个工作区的依赖收进同一个 vendor 目录。

### `--respect-source-config`

默认忽略 `.cargo/config.toml` 中的 `[source]` 配置、直接从原始来源下载；给出本旗标后改为读取并使用该配置（例如经由镜像下载 crates.io 的 crate）。

### `--versioned-dirs`

vendor 目录中的所有子目录一律带版本后缀（如 `serde-1.0.100`），而不是只对多版本的包加后缀。便于追踪 vendored 包的历史，也利于只变更部分包时的重新 vendor 性能。

## 使用提醒

- 常见用法是把打印出的 `[source]` 配置重定向进配置文件，例如 `cargo vendor > .cargo/config.toml`（注意这会整体替换该文件内容；已有其他配置时应改为手工合并）。
- 同名同版本的包如果来自两个不同来源，vendoring 会报错（依据源码）。
- 旧 crates.io 版 `cargo vendor` 的 `--no-merge-sources`、`--relative-path`、`--only-git-deps`、`--disallow-duplicates` 旗标在并入 Cargo 后不受支持，给出时会得到专门的错误提示（依据源码中的隐藏旗标定义）。
- `-m`/`--manifest-path` 为共享选项，释义见 [cargo build](cli:command:build)；全局选项见 [cargo](cli:command:)。

## 示例

```sh
# 把全部依赖 vendor 到 ./vendor
cargo vendor

# vendor 到指定目录
cargo vendor third-party/vendor

# 同时 vendor 另一个工作区的依赖
cargo vendor -s ../path/to/Cargo.toml

# 把生成的来源替换配置写入配置文件
cargo vendor > path/to/my/cargo/config.toml
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [src/bin/cargo/commands/vendor.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/vendor.rs)。
- 复制、目录命名、`.cargo-checksum.json` 与 `[source]` 配置生成见 [src/cargo/ops/vendor.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/vendor.rs)。
