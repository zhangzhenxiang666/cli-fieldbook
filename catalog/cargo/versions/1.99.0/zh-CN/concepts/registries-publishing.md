---
title: 注册表与发布
uses:
  - command:publish
  - command:owner
  - command:yank
---

cargo 从注册表（registry）获取依赖：注册表提供一个可检索的注册表索引（index），可选提供支持发布等操作的 web API。默认注册表是 crates.io。本文说明备用注册表、凭据管理与发布、yank、所有者等操作。本文为 cargo 书《Registries》《Registry Authentication》《Publishing on crates.io》《Index Format》各章的译文整理（上游文档译文）。

## 备用注册表与协议

使用 crates.io 之外的注册表，需先在 `.cargo/config.toml` 的 `[registries]` 表里命名它并给出 `index` URL（git 索引仓库的 URL，或以 `sparse+` 前缀的 sparse 注册表 URL）：

```toml
[registries]
my-registry = { index = "https://my-intranet:8080/git/index" }
```

之后依赖声明用 `registry = "my-registry"` 指向它。注册表有两种协议：git 协议把索引存为 git 仓库、需要整仓克隆；sparse 协议用普通 HTTP 逐个取元数据文件，只下载相关 crate 的索引，通常更快。crates.io 两者都支持，由 `registries.crates-io.protocol` 配置选择。crates.io 不接受依赖了其他注册表代码的包（`dev-dependencies` 除外）。`registry.default` 配置可把发布命令的默认注册表改为命名注册表，命令行 `--registry` 优先；清单 `[package]` 的 `publish` 字段可限定包只允许发布到哪些注册表。索引根的 `config.json` 声明下载端点（`dl`）与 API 端点（`api`）；未声明 `api` 的注册表不支持发布。

## 凭据与 credential provider

cargo 通过 credential provider 存取注册表令牌：provider 是外部可执行文件或内建实现。需认证的备用注册表**必须**配置 credential provider，以免凭据被无意识地明文落盘；公开注册表因历史原因不强制，未配置时使用 `cargo:token`。内建 provider 有 `cargo:token`（明文存 `$CARGO_HOME/credentials.toml`，读取时也检查 `CARGO_REGISTRIES_<NAME>_TOKEN` 等环境变量）、`cargo:wincred`、`cargo:macos-keychain`、`cargo:libsecret`（操作系统安全存储）与 `cargo:token-from-stdout <命令>`（子进程标准输出返回令牌）。推荐在全局配置里列出 provider 链，后者优先：

```toml
[registry]
global-credential-providers = ["cargo:token", "cargo:libsecret", "cargo:macos-keychain", "cargo:wincred"]
```

[cargo login](cli:command:login) 把令牌存入 `credentials.toml`（或改由所配 provider 保管），[cargo logout](cli:command:logout) 移除；令牌也可经 `--token` 旗标或环境变量直接传入。第三方 provider 遵循 credential provider 协议，可用 `cargo install` 安装后列入 provider 链，路径或参数含空格时用 `[credential-alias]` 表定义。

## 发布流程

发布前需要 crates.io 账号（经 GitHub 登录并验证邮箱）与其 API 令牌，令牌经 `cargo login` 存入本机，是应严格保密的机密。crate 名在 crates.io 先到先得，且注册表对名字有附加限制：仅 ASCII 字母数字与 `-`/`_`、首字符须为字母、大小写不敏感查重、不允许仅以 `-` 与 `_` 之差区分的名字、不超过 64 字符、拒绝 `nul` 等保留名。[cargo publish](cli:command:publish) 依次执行五步：

1. 对包做若干校验检查。
2. 把源码压缩为 `.crate` 文件。
3. 把 `.crate` 解包到临时目录，验证它能编译。
4. 上传 `.crate` 文件到注册表。
5. 注册方对上传的包再做附加检查后才收录。

发布基本不可逆：版本不可覆盖、代码不可删除。清单须备齐 `license`/`license-file`、`description`（crates.io 要求），建议补全 `homepage`、`repository`、`readme` 与 `keywords`/`categories`。

```sh
# 先干跑走完前三步（等价 cargo package），产物在 target/package 下
cargo publish --dry-run
# 检查将打包的文件清单与体积
cargo package --list
# 正式发布
cargo publish
```

crates.io 目前限制 `.crate` 文件不超过 10MB；打包默认忽略版本控制所忽略的文件，也可用 `[package]` 的 `exclude`/`include` 控制。发布新版本时改 `[package]` 的 `version`（遵循 SemVer 兼容规则）再执行 `publish`。发布到命名注册表的流程相同，只是 `cargo login --registry=<名>` 与 `cargo publish --registry=<名>` 都要带 `--registry`，令牌也可用 `--token` 旗标或 `CARGO_REGISTRIES_<名>_TOKEN` 环境变量传入。

## yank 语义

发布了一个有问题的版本时，[cargo yank](cli:command:yank) 把该版本标记为不可用（`--version` 指定版本，`--undo` 撤销）。yank **不删除任何代码**，也不能用来清除误传的机密——那种情况应立即重置机密。其语义是：该版本不能再被新的依赖解析选中，但已写入 `Cargo.lock` 的既有依赖继续可用。因此已有 lockfile 的构建不会因 yank 而中断，新生成的 lockfile 则不会再列入被 yank 的版本（解析器行为见[依赖解析与 Cargo.lock](dependencies.md)）。

## 所有者管理

crate 名在 crates.io 先到先得。crate 的所有者（owner）是唯一能发布新版本的人，可再指定其他所有者：[cargo owner](cli:command:owner) 的 `--add`/`--remove` 接受 GitHub 用户名或团队名（团队语法 `github:org:team`）。用户名添加为具名所有者，拥有全部权利——发布、yank、增删所有者（包括提拔自己的人）；团队添加为团队所有者，可发布与 yank，但不能增删所有者，管理成组的所有者时也更安全。被邀请为具名所有者的用户须曾登录过 crates.io；邀请团队时操作者本人须是该团队成员，移除团队则无此要求。团队相关操作可能要求在 crates.io 重新认证以授予读取 GitHub 组织成员关系的 `read:org` 权限，组织也需要允许 crates.io 这个第三方应用访问。

```sh
cargo owner --add github-handle
cargo owner --remove github-handle
cargo owner --add github:rust-lang:owners
```
