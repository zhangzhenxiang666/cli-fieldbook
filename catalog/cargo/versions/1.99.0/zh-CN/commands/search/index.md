---
title: cargo search
command:
  - search
---

在注册表（默认 crates.io）中按关键词搜索 crate，并以可复制进 `Cargo.toml` 的 TOML 依赖行形式显示结果。

## 简介

本命令在注册表中执行文本搜索。默认注册表为 crates.io；也可用共享选项 `--registry <REGISTRY>`（按名称选择注册表）或 `--index <INDEX>`（按索引 URL 选择注册表，两者互斥）指定其他注册表。

每个匹配的 crate 输出一行，形如 `serde = "1.0.219"`（包名与最新版本组成的 TOML 依赖行），有描述时在同一行以 `# <描述>` 注释附上。结果超过 `--limit` 限制时，末尾会提示还有多少个未显示的 crate，并建议用 `--limit` 调大数量；达到上限时对 crates.io 会给出网站搜索链接。有结果时还会提示可用 `cargo info <name>` 查看某个包的详情。

## 参数

### `query`

可选，可重复，写作 `<query>`。搜索关键词；多个关键词位置参数会以 `+` 连接成一个查询（依据源码）。

## 选项

### `--limit`

格式：`--limit <LIMIT>`。限制显示的结果数量；默认 10，最大 100（man 手册与源码帮助文本一致）。

## 使用提醒

- `--registry` 与 `--index` 为共享选项（本命令中非内联定义），二者互斥，不指定时使用默认注册表。
- 全局选项（`-v`、`-q`、`--color` 等）见 [cargo](cli:command:)。

## 示例

```sh
# 在 crates.io 搜索 serde
cargo search serde

# 显示更多结果
cargo search serde --limit 30

# 在指定注册表中搜索
cargo search serde --registry my-registry
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [src/bin/cargo/commands/search.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/search.rs)。
- 查询拼接与结果渲染见 [src/cargo/ops/registry/search.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/registry/search.rs)。
