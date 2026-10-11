---
title: cargo owner
command:
  - owner
---

管理某个 crate 在注册表上的所有者：邀请、移除或列出。

## 简介

`cargo owner` 修改 crate 在注册表上的所有者集合。所有者可以上传新版本并 yank 旧版本；非团队所有者还能修改所有者集合本身，因此添加所有者时须谨慎。

本命令要求认证：用 `--token` 选项提供 API 令牌，或先运行 [cargo login](cli:command:login) 登录。

未给出 `crate` 参数时，使用当前目录清单中的包名。

在默认注册表 crates.io 上，所有者 ID 必须是 GitHub 用户名或 GitHub 团队，团队写作 `github:org:team`：

- 以用户名 `--add` 邀请的是"具名所有者"，对 crate 拥有完整权限：除发布与 yank 外，还能增删所有者（包括邀请自己的那个所有者）；要成为具名所有者，该用户须此前登录过 crates.io。
- 以团队名 `--add` 邀请的是"团队所有者"，权限受限：可以发布与 yank，但不能增删所有者；邀请团队为所有者须自己是该团队成员，移除团队则没有这一限制。

`-a/--add` 与 `-r/--remove` 都可重复给出，一次操作多个登录名；源码按先处理 `--add`、再处理 `--remove`、最后处理 `--list` 的顺序执行，三者可在同一次调用中并用。

`--index <INDEX>` 直接给出注册表索引 URL，`--registry <REGISTRY>` 给出 Cargo 配置文件中定义的注册表名，二者互斥；未指定时使用 `registry.default` 配置的默认注册表。这两个选项是共享参数声明，本页选项表内不单列条目。

## 参数

### `crate`

可选，写作 `<crate>`。目标 crate 的名称；省略时使用当前目录清单中的包名。

## 选项

以下仅列出 `cargo owner` 自有的选项；全局选项（`-v`、`-q`、`--color`、`--locked`、`--offline`、`--frozen`、`--config`、`-Z`）见 [cargo](cli:command:)。

### `--add`

短旗标 `-a`。格式：`--add <LOGIN>`。邀请给定用户或团队作为所有者；可重复给出。

### `--remove`

短旗标 `-r`。格式：`--remove <LOGIN>`。移除给定用户或团队的所有者身份；可重复给出。

### `--list`

短旗标 `-l`。格式：`--list`。列出 crate 的所有者，每行一个登录名，后附注册表提供的姓名与电子邮件（若有）。

### `--token`

格式：`--token <TOKEN>`。认证所用的 API 令牌。

## 环境变量

- `CARGO_REGISTRY_TOKEN`：默认注册表使用的令牌（对应配置 `registry.token`）。
- `CARGO_REGISTRIES_<name>_TOKEN`：名为 `<name>` 的注册表使用的令牌（对应配置 `registries.<name>.token`）。

完整清单见[环境变量](../../reference/environment.md)。

## 使用提醒

- `--index` 与 `--registry` 互斥，同时给出会触发参数冲突错误。
- 添加团队所有者依赖查询 GitHub 组织成员关系，可能需要在 crates.io 重新授权（授予 `read:org` 权限）；官方参考对 GitHub 各级访问控制的限制有详细说明。
- 具名所有者可增删其他所有者，只应邀请完全信任的用户。

## 示例

```sh
# 列出包 foo 的所有者
cargo owner --list foo

# 邀请用户 username 为包 foo 的所有者
cargo owner --add username foo

# 移除包 foo 的所有者 username
cargo owner --remove username foo

# 邀请 GitHub 团队为所有者
cargo owner --add github:rust-lang:owners foo
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [src/bin/cargo/commands/owner.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/owner.rs)；所有者 API 的调用与输出见 [src/cargo/ops/registry/owner.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/registry/owner.rs)。
- 具名所有者与团队所有者的权限差异依据官方书《Publishing》一章（上游路径 `src/doc/src/reference/publishing.md`）。
