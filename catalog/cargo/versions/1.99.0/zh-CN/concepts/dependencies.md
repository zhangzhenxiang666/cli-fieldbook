---
title: 依赖解析与 Cargo.lock
uses:
  - command:add
  - command:update
  - command:generate-lockfile
---

`Cargo.toml` 声明"想要什么"，解析器（resolver）决定"实际用哪个版本"，结果记录在 `Cargo.lock`。本文说明依赖的来源、版本需求语法、解析规则与锁定语义。本文为 cargo 书《Dependencies》《Specifying Dependencies》《Dependency Resolution》《Cargo.toml vs Cargo.lock》各章的译文整理（上游文档译文）；不稳定旗标部分依据《Unstable Features》章。

## 依赖的三种来源

- 注册表：默认从 crates.io 查找，只需名字与版本串；依赖其他命名注册表时加 `registry = "<注册表名>"` 键（注册表配置见[注册表与发布](registries-publishing.md)）。
- git 仓库：`git = "<URL>"`，可配合 `branch`、`tag` 或 `rev`（提交哈希或远端引用）指定提交，缺省用默认分支最新提交。cargo 克隆仓库并在其中遍历查找所需 crate 的 `Cargo.toml`，子模块递归获取；提交在加入时锁定进 `Cargo.lock`，仅在 `cargo update` 时检查更新。
- 本地路径：`path = "<目录>"`，指向依赖的 `Cargo.toml` 所在目录。与 git 不同，本地路径不做目录遍历，必须指到确切位置；只含 `path` 的依赖不能发布到 crates.io。`version` 与 `path`（或 `git`）可同时给出：本地构建用本地副本（并校验版本），发布后使用方则从注册表取该版本。

依赖按用途分三段：`[dependencies]` 供包本身使用；`[dev-dependencies]` 只用于测试、示例与基准，不传播给下游；`[build-dependencies]` 供构建脚本使用，与包本身的依赖互相隔离。平台特定的依赖写在 `[target.'cfg(...)'.dependencies]` 或 `[target.<三元组>.dependencies]` 下。

## 版本需求语法

版本串是版本需求，表达一个可选区间；cargo 认为左侧第一个非零的 major/minor/patch 位相同的版本互相兼容（比 SemVer 对 1.0.0 之前的宽松）：

```text
1.2.3  :=  >=1.2.3, <2.0.0     # 默认（caret）需求，^1.2.3 与之等价
1.2    :=  >=1.2.0, <2.0.0
0.2.3  :=  >=0.2.3, <0.3.0
~1.2.3 :=  >=1.2.3, <1.3.0     # tilde 需求：锁到次版本
*      :=  >=0.0.0             # 通配需求，crates.io 不接受裸 *
```

比较需求 `>=`、`>`、`<`、`= 1.2.3` 手工指定区间或精确版本，多个需求可用逗号组合（须同时满足）。预发布版本（如 `1.0.0-alpha`）默认不匹配，需求里显式写出才可用；写出的预发布可自动升级到同一版本号下更新的预发布与兼容的正式版。版本元数据（`+21AF26D3`）被忽略。书中的建议：多数场景用默认需求并写全三段；避免上限低于下一个不兼容版本的过窄区间。

## 解析器如何选版本

解析在概念上是对依赖图的回溯搜索，受几条约束与启发式驱动：

- 优先最高版本：每个需求选当前可用的最高版本。
- `Cargo.lock` 优先：lockfile 已锁定的版本优先于注册表里的新版本；清单改动导致旧锁定不再满足需求时才重新选择。
- 版本统一：SemVer 兼容的版本尽量统一为一份，减少重复编译并让公共类型可互通；兼容却无法统一的（如两个 `=` 精确需求冲突）直接报错；只有不兼容的版本才允许共存（如 `0.7` 与 `0.6` 各一份）。
- yank：被 yank 的版本在解析时被忽略，除非已存在于 `Cargo.lock` 或被 `cargo update --precise` 显式请求。
- 特性：为生成 `Cargo.lock`，解析器按"所有特性都启用"建图以保证可选依赖可解析；实际编译时按命令行选择的特性再解析一次。
- `links`：同名原生库（`links` 字段）在图中只允许一份，无法满足即报错。

`resolver` 字段选择行为版本：`"1"` 为默认；`"2"`（edition 2021 起默认）改变特性统一规则（见[特性与 profile](features-profiles.md)）；`"3"`（edition 2024 起默认，需 Rust 1.84+）把 `resolver.incompatible-rust-versions` 的默认值从 `allow` 改为 `fallback`——解析时偏好不高于包 `rust-version` 的依赖版本。resolver 是整个工作区的全局选项，依赖里的设置被忽略，虚拟工作区须在 `[workspace]` 表指定。

## `Cargo.lock` 的语义与提交策略

`Cargo.toml` 由人编写、描述大致意图；`Cargo.lock` 由 cargo 维护、记录每个依赖的精确版本（git 依赖记录到具体提交），不应手改。它存在的意义正是可重复构建：他人拿到同一份 lockfile 就会用完全相同的版本构建，无需在清单里手写提交哈希。拿不准时，建议把 `Cargo.lock` 提交进版本控制（终端产品尤应如此），并在 CI 中定期验证最新依赖。

`--locked` 要求构建中 lockfile 保持不变，否则报错；`--frozen` 等价于 `--locked` 加 `--offline`（两者均为全局选项，见根命令页）。

## 更新与锁定命令

- [cargo add](cli:command:add) 把依赖写入 `Cargo.toml` 并同步更新 lockfile；[cargo remove](cli:command:remove) 移除。
- [cargo update](cli:command:update) 在已发布的新版本中重新选择：不带参数更新全部，`-p` 只更新指定包，`--precise` 固定到精确版本。参数采用 Package ID 规格短形式。
- [cargo generate-lockfile](cli:command:generate-lockfile) 只生成（或重建）lockfile，不做其他工作。
- [cargo tree](cli:command:tree) 可视化解析结果，`-d`/`--duplicates` 查看重复版本及其来源。

## 最小版本校验（不稳定）

默认解析选最高兼容版本；相对地，nightly 的 `-Z minimal-versions`（不推荐：对全部传递依赖强制最小版本，而很多依赖未正确声明下界）与 `-Z direct-minimal-versions`（仅对直接依赖取最小满足版本）让 `Cargo.lock` 锁到满足需求的最低版本，用于在 CI 中校验清单声明的版本下界是否真实——若 `foo = "1.0.0"` 实际依赖了 `1.5.0` 才有的功能，这一校验会暴露问题。
