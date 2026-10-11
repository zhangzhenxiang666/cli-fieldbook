---
title: cargo publish
command:
  - publish
---

把当前包（或工作区中选中的包）打包成 `.crate` 压缩文件并上传到注册表，默认注册表为 crates.io。

## 简介

`cargo publish` 为包创建可分发的压缩 `.crate` 文件并上传到注册表，默认注册表是 crates.io。整个流程依次为：

1. 执行少量检查，包括读取清单中的 `package.publish` 键，确认允许发布到目标注册表。
2. 按 [cargo package](cli:command:package) 的流程创建 `.crate` 文件，其中包含构建验证。
3. 把 crate 上传到注册表；服务端还会对 crate 做额外检查。
4. 客户端轮询注册表索引，等待包出现；轮询可能超时，超时后需要自行确认发布是否完成，上传本身不受影响。

在工作区中一次发布多个包时，按依赖顺序上传，并等待先上传的包出现在索引中后再继续；若 dev-dependency 与其他依赖之间形成循环，命令报错并提示去掉 dev-dependency 的 `version` 字段（发布时会隐式剥离该字段）。

本命令要求先完成认证：运行 [cargo login](cli:command:login) 登录，或通过 `registry.token`、`registries.<name>.token` 配置字段提供令牌（对应环境变量见下文）；cargo 通过凭据提供程序存取令牌。

目标注册表用 `--registry <REGISTRY>` 指定（注册表名定义在 Cargo 配置文件中）。未指定时，若清单的 `package.publish` 字段恰好只允许一个注册表，则发布到该注册表；否则使用 `registry.default` 配置键定义的默认注册表（默认为 `crates-io`）。也可以用 `--index <INDEX>` 直接给出注册表索引 URL，它与 `--registry` 互斥。这两个选项在本页选项表内不单列（见下文说明）。若待发布的版本已存在于注册表，命令报错中止。

## 选项

以下仅列出 `cargo publish` 自有的选项。包选择（`-p/--package`、`--workspace`、`--exclude`）、特性（`-F/--features`、`--all-features`、`--no-default-features`）、编译（`--target`、`-j/--jobs`、`--keep-going`、`--target-dir`）与清单（`-m/--manifest-path`）等共享选项见 [cargo build](cli:command:build)；全局选项（`-v`、`-q`、`--color`、`--locked`、`--offline`、`--frozen`、`--config`、`-Z`）见 [cargo](cli:command:)。

### `--token`

格式：`--token <TOKEN>`。上传时使用的令牌。这是隐藏选项，且已弃用：源码在给出该选项时会警告改用 `cargo login` 与环境变量。推荐的认证方式见上文简介。

### `--no-verify`

格式：`--no-verify`。跳过验证步骤，不通过构建来检验包内容。

### `--allow-dirty`

格式：`--allow-dirty`。允许在有未提交 VCS 改动的工作目录中打包。

## 环境变量

- `CARGO_REGISTRY_TOKEN`：默认注册表使用的令牌（对应配置 `registry.token`）。
- `CARGO_REGISTRIES_<name>_TOKEN`：名为 `<name>` 的注册表使用的令牌（对应配置 `registries.<name>.token`）。

完整清单见[环境变量](../../reference/environment.md)。

## 使用提醒

- `--index` 与 `--registry` 互斥，同时给出会触发参数冲突错误。
- `-n`/`--dry-run`（共享参数声明，本页不单列条目）：执行除上传外的全部步骤——各项检查、`package.publish` 校验、打包与构建验证都会进行，到达上传一步时打印警告并中止，不会真正上传。干跑时与注册表交互才能发现的错误（如"该版本已存在"）会降级为警告。
- `--token` 已隐藏并弃用；建议用 `cargo login` 或环境变量提供凭据。
- 已发布的版本无法删除；需要阻止新项目选用某版本时用 [cargo yank](cli:command:yank)。
- 等待索引确认有超时限制（源码默认 60 秒；`publish.timeout` 配置需 nightly 的 `-Zpublish-timeout` 才生效），超时后需手动到注册表确认。

## 示例

```sh
# 发布当前包（默认注册表 crates.io）
cargo publish

# 干跑：完成全部检查、打包与构建验证，但不上传
cargo publish --dry-run

# 发布到 Cargo 配置中定义的备用注册表
cargo publish --registry my-registry

# 发布工作区中的全部包
cargo publish --workspace
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [src/bin/cargo/commands/publish.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/publish.rs)；发布流程（上传、等待索引确认、循环依赖检查、干跑降级行为）见 [src/cargo/ops/registry/publish.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/registry/publish.rs)。
