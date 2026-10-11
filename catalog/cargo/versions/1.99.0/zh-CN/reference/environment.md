---
title: 环境变量
---

cargo 既读取一组环境变量来改变自身行为，也在编译 crate、运行测试、执行构建脚本和调用外部子命令时向子进程注入环境变量。本页按用途分组整理固定版本快照登记的变量，主要来源是 cargo 书《Environment variables》一章（上游路径 `src/doc/src/reference/environment-variables.md`）与《Configuration》一章（`src/doc/src/reference/config.md`），标注"依据源码"的条目来自 Rust 源码快照；变量名保持原拼写。本页只列固定版本文档中登记的变量。来源与核对范围见 [sources](sources.md)。

## 通用行为

- `CARGO_LOG`：cargo 调试日志（`tracing` 框架）的级别，可设为 `trace`、`debug`、`warn` 等，通常仅在调试时使用。
- `CARGO_HOME`：cargo 主目录，保存注册表索引与 crate 的本地缓存和 git 检出，默认 `$HOME/.cargo`（Windows 为 `%USERPROFILE%\.cargo`）。crate 一旦缓存，`clean` 命令不会将其移除；分层配置的最后一层也从 `$CARGO_HOME/config.toml` 读取。
- `CARGO_TARGET_DIR`：全部生成产物（target 目录）的位置，相对当前工作目录解析；对应配置 `build.target-dir`。
- `CARGO_INCREMENTAL`：设为 `1` 强制本次编译启用增量编译，设为 `0` 强制关闭；未设置时沿用 profile 默认。该变量覆盖配置 `build.incremental`。
- `CARGO_CACHE_RUSTC_INFO`：设为 `0` 时 cargo 不缓存编译器版本信息。
- `TERM`：设为 `dumb` 时禁用进度条。
- `BROWSER`：`cargo doc --open` 打开文档所用浏览器；配置 `doc.browser` 可覆盖它。

## 工具链与包装器

- `CARGO`：设置后，cargo 在构建 crate、执行构建脚本与外部子命令时转发该值，而不是转发自动探测到的自身路径。该值不会被 cargo 直接执行，应始终指向行为与 `cargo` 完全一致的命令。
- `RUSTC`、`RUSTDOC`、`RUSTFMT`：分别替换实际调用的 `rustc`、`rustdoc`、`rustfmt` 实例；`RUSTC`/`RUSTDOC` 对应配置 `build.rustc`/`build.rustdoc`，`RUSTFMT` 供 `cargo fmt` 使用。
- `RUSTC_WRAPPER`：以包装器方式调用 `rustc`，命令行首参数为真实 `rustc` 路径（例如配合 `sccache` 等构建缓存工具）；设为空字符串会覆盖配置并重置为不使用包装器。
- `RUSTC_WORKSPACE_WRAPPER`：仅对工作区成员生效的包装器，会影响文件名哈希使产物分开缓存；与 `RUSTC_WRAPPER` 同时设置时按 `$RUSTC_WRAPPER $RUSTC_WORKSPACE_WRAPPER $RUSTC` 嵌套调用，设为空字符串同样重置。

## 编译器旗标

- `RUSTFLAGS`：以空格分隔的额外旗标，传给 cargo 发起的全部 `rustc` 调用；`CARGO_ENCODED_RUSTFLAGS` 是以 `0x1f`（ASCII Unit Separator）分隔的等价形式，适合包含空白的参数。
- `RUSTDOCFLAGS`、`CARGO_ENCODED_RUSTDOCFLAGS`：传给全部 `rustdoc` 调用的旗标，分隔规则与上一条相同。
- 额外 `rustc` 旗标有四个互斥来源，按序取第一个（依据 `config.md` 的 `build.rustflags`）：`CARGO_ENCODED_RUSTFLAGS` → `RUSTFLAGS` → 匹配的 `target.<triple>.rustflags` 与 `target.<cfg>.rustflags` 配置项（连接合并）→ `build.rustflags` 配置。`rustdoc` 旗标的来源顺序同构。

## 网络

- `HTTPS_PROXY`、`https_proxy`、`http_proxy`：使用的 HTTP 代理，详见配置 `http.proxy`。
- `HTTP_TIMEOUT`：HTTP 超时时间（秒），详见配置 `http.timeout`。

## 配置类环境变量（`CARGO_FOO_BAR` 约定）

每个形如 `foo.bar` 的配置键都可以改用 `CARGO_FOO_BAR` 形式的环境变量定义：键转为大写，点与横线转为下划线（依据 `config.md`）。环境变量优先于 TOML 配置文件，但低于命令行 `--config KEY=VALUE` 覆盖；目前只有整数、布尔、字符串和部分数组值支持这种方式。依据源码 `src/cargo/util/context/environment.rs`，`CARGO_` 前缀的环境键正是按"大写、`-` 转 `_`"归一化后接入配置查询的。《Environment variables》一章登记的配置类变量按组列举：

- 构建：`CARGO_BUILD_JOBS`、`CARGO_BUILD_RUSTC`、`CARGO_BUILD_RUSTC_WRAPPER`、`CARGO_BUILD_RUSTC_WORKSPACE_WRAPPER`、`CARGO_BUILD_RUSTDOC`、`CARGO_BUILD_TARGET`、`CARGO_BUILD_TARGET_DIR`、`CARGO_BUILD_BUILD_DIR`、`CARGO_BUILD_RUSTFLAGS`、`CARGO_BUILD_RUSTDOCFLAGS`、`CARGO_BUILD_INCREMENTAL`、`CARGO_BUILD_DEP_INFO_BASEDIR`
- 终端输出：`CARGO_TERM_QUIET`、`CARGO_TERM_VERBOSE`、`CARGO_TERM_COLOR`、`CARGO_TERM_PROGRESS_WHEN`、`CARGO_TERM_PROGRESS_WIDTH`
- HTTP：`CARGO_HTTP_DEBUG`、`CARGO_HTTP_PROXY`、`CARGO_HTTP_TIMEOUT`、`CARGO_HTTP_CAINFO`、`CARGO_HTTP_PROXY_CAINFO`、`CARGO_HTTP_CHECK_REVOKE`、`CARGO_HTTP_SSL_VERSION`、`CARGO_HTTP_LOW_SPEED_LIMIT`、`CARGO_HTTP_MULTIPLEXING`、`CARGO_HTTP_USER_AGENT`
- 网络：`CARGO_NET_RETRY`、`CARGO_NET_GIT_FETCH_WITH_CLI`、`CARGO_NET_OFFLINE`
- 注册表与凭据：`CARGO_REGISTRIES_<name>_CREDENTIAL_PROVIDER`、`CARGO_REGISTRIES_<name>_INDEX`、`CARGO_REGISTRIES_<name>_TOKEN`、`CARGO_REGISTRY_CREDENTIAL_PROVIDER`、`CARGO_REGISTRY_DEFAULT`、`CARGO_REGISTRY_GLOBAL_CREDENTIAL_PROVIDERS`、`CARGO_REGISTRY_TOKEN`
- profile：`CARGO_PROFILE_<name>_BUILD_OVERRIDE_<key>`、`CARGO_PROFILE_<name>_CODEGEN_UNITS`、`CARGO_PROFILE_<name>_DEBUG`、`CARGO_PROFILE_<name>_DEBUG_ASSERTIONS`、`CARGO_PROFILE_<name>_INCREMENTAL`、`CARGO_PROFILE_<name>_LTO`、`CARGO_PROFILE_<name>_OVERFLOW_CHECKS`、`CARGO_PROFILE_<name>_OPT_LEVEL`、`CARGO_PROFILE_<name>_PANIC`、`CARGO_PROFILE_<name>_RPATH`、`CARGO_PROFILE_<name>_SPLIT_DEBUGINFO`、`CARGO_PROFILE_<name>_STRIP`
- 目标平台：`CARGO_TARGET_<triple>_LINKER`、`CARGO_TARGET_<triple>_RUNNER`、`CARGO_TARGET_<triple>_RUSTFLAGS`；`<triple>` 须转为大写并用下划线连接
- 其他：`CARGO_ALIAS_<name>`（命令别名）、`CARGO_CACHE_AUTO_CLEAN_FREQUENCY`、`CARGO_CARGO_NEW_VCS`、`CARGO_FUTURE_INCOMPAT_REPORT_FREQUENCY`、`CARGO_INSTALL_ROOT`

《Configuration》一章还在各键条目下登记了上述清单未收录的变量，例如 `CARGO_TERM_HYPERLINKS`、`CARGO_TERM_UNICODE`、`CARGO_TERM_PROGRESS_TERM_INTEGRATION` 与 `CARGO_CREDENTIAL_ALIAS_<name>`；两处快照合起来才是完整口径。

## cargo 注入给 crate 的变量

编译时（含 `cargo run`、`cargo test` 运行的二进制）以下变量对 crate 可见；清单中未提供的字段注入为空字符串：`CARGO`、`CARGO_MANIFEST_DIR`、`CARGO_MANIFEST_PATH`、`CARGO_PKG_VERSION`（及 `_MAJOR`、`_MINOR`、`_PATCH`、`_PRE`）、`CARGO_PKG_AUTHORS`、`CARGO_PKG_NAME`、`CARGO_PKG_DESCRIPTION`、`CARGO_PKG_HOMEPAGE`、`CARGO_PKG_REPOSITORY`、`CARGO_PKG_LICENSE`、`CARGO_PKG_LICENSE_FILE`、`CARGO_PKG_RUST_VERSION`（包支持的最低 Rust 版本）、`CARGO_PKG_README`、`CARGO_CRATE_NAME`、`CARGO_BIN_NAME`、`CARGO_BIN_EXE_<name>`（仅构建集成测试或基准时设置）、`CARGO_PRIMARY_PACKAGE`（仅编译命令行选中的主包时设置）、`CARGO_TARGET_TMPDIR`（仅集成测试与基准代码可见）、`OUT_DIR`（仅编译期设置，cargo 不保证该目录为空）。运行二进制与测试时 cargo 还会扩展动态库搜索路径：Windows 为 `PATH`，macOS 为 `DYLD_FALLBACK_LIBRARY_PATH`，Unix 为 `LD_LIBRARY_PATH`，AIX 为 `LIBPATH`。

## cargo 注入给构建脚本的变量

构建脚本运行时可见：`CARGO`、`CARGO_MANIFEST_DIR`、`CARGO_MANIFEST_PATH`、`CARGO_MANIFEST_LINKS`、`CARGO_MAKEFLAGS`（jobserver 参数）、`CARGO_FEATURE_<name>`（每个启用的特性一个，特性名转大写、`-` 转 `_`）、`CARGO_CFG_<cfg>`（目标平台的 cfg 值，如 `CARGO_CFG_TARGET_OS`；布尔 cfg 仅在启用时出现，多值以 `,` 连接）、`OUT_DIR`、`TARGET`、`HOST`、`NUM_JOBS`、`DEBUG`、`OPT_LEVEL`、`PROFILE`、`DEP_<links>_<key>`、`RUSTC`、`RUSTDOC`、`RUSTC_WRAPPER`、`RUSTC_WORKSPACE_WRAPPER`、`RUSTC_LINKER`、`CARGO_ENCODED_RUSTFLAGS`、`CARGO_PKG_<var>`。自 Rust 1.55 起 `RUSTFLAGS` 不再出现在构建脚本环境中，应改用 `CARGO_ENCODED_RUSTFLAGS`。

## 注入给测试与第三方子命令的变量

- `cargo test`：集成测试与基准中可见 `CARGO_BIN_EXE_<name>`，即二进制目标可执行文件的绝对路径。
- 第三方子命令（`cargo-<name>`，位于 `$PATH`）：可见 `CARGO` 与 `CARGO_MAKEFLAGS`，后者仅当 cargo 检测到 jobserver 时设置。

## 使用提醒

- 环境变量优先于配置文件、低于 `--config` 命令行覆盖；路径类环境变量相对当前工作目录解析（依据 `config.md`）。
- 书建议运行 `cargo metadata` 查看当前环境的扩展信息。
