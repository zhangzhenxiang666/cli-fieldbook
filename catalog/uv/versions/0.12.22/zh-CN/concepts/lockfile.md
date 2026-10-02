---
title: lockfile 与解析
uses:
  - command:lock
  - command:sync
  - command:run
  - command:add
  - command:export
  - command:tree
---

解析（resolution）是把一组需求转换为满足这些需求的一组包版本的过程：解析器递归搜索兼容版本，保证直接需求与传递依赖相互一致。锁定则是把解析结果固化到文件。uv 的项目接口把两者合在 `uv.lock` 上：一份跨平台的 lockfile，配合 [uv lock](cli:command:lock) 与 [uv sync](cli:command:sync) 使用。本文说明这份文件如何产生、如何被复用，以及控制解析范围的手段。

## universal 解析

`uv.lock` 采用 universal（跨平台）解析：不按当前机器求值环境标记，而是为所有可能的操作系统、架构与 Python 版本锁定依赖。因此同一份 lockfile 对所有协作者与部署环境都有效。文件是可读的 TOML，但由 uv 管理而不应手工编辑；其格式是 uv 专有的，其他工具不能直接使用。lockfile 应提交到版本控制。

universal 解析的直接后果是"多版本共存"：同一个包可能因平台或 Python 版本不同，在 lockfile 中出现多个带标记的版本或 URL。解析时所有包必须与 `pyproject.toml` 声明的整个 `requires-python` 范围兼容——项目的范围必须是所有依赖范围的子集。评估依赖的 `requires-python` 时，uv 只考虑下界、忽略上界（`>=3.8, <4` 视作 `>=3.8`），以避免形式正确但实际错误的回退。默认策略（`--fork-strategy requires-python`）为每个支持的 Python 版本选择尽量新的版本，同时尽量减少版本总数。

作为对照，`uv pip compile` 默认产出平台特定的解析结果；项目接口没有平台特定模式。uv 也支持把 [uv lock](cli:command:lock) 的结果导出为 `requirements.txt`、`pylock.toml`（PEP 751）或 CycloneDX SBOM（[uv export](cli:command:export)）。

## 锁定与更新

lockfile 由项目命令创建与更新：[uv lock](cli:command:lock) 显式更新；[uv sync](cli:command:sync)、[uv run](cli:command:run) 以及读 lockfile 的命令（如 [uv tree](cli:command:tree)）会在需要时自动先锁定再执行。"是否过期"只看项目元数据是否匹配：新增依赖、或改动约束导致已锁版本被排除，都会使 lockfile 过期；仅收紧约束但仍包含已锁版本则不算过期。发布新版本本身不会让 lockfile 过期。

uv 倾向沿用已有结果：存在 `uv.lock` 时优先使用其中版本，环境里已安装的版本同样被优先保留；只有约束不再兼容或显式请求升级时版本才变化。升级用 `uv lock --upgrade`（全部）或 `uv lock --upgrade-package <package>`（单个，可加 `==<version>` 指定版本），且始终受项目约束限制；Git 依赖同理偏向已锁定的 commit，除非显式升级。这些升级开关也可以传给 `uv sync` 与 `uv run`，同时更新 lockfile 和环境。

## --locked 与 --frozen

自动锁定很方便，但有时需要确定性而不是便利。两个开关提供了约束：

- `--locked`：断言 lockfile 是最新的。若已过期，uv 报错而不是更新它。`uv lock --check` 与其他命令的 `--locked` 等价。
- `--frozen`：直接使用 lockfile 而不检查是否过期，也不重新锁定。配合 [uv run](cli:command:run) 的 `--no-sync`（不检查环境是否最新）可以在纯只读条件下运行。

两者都有对应的 `UV_LOCKED` 与 `UV_FROZEN` 环境变量绑定，并有 `--no-locked` / `--no-frozen` 反向开关用于覆盖低优先级来源。

## 可复现解析：exclude-newer

`--exclude-newer` 把解析限制在某个日期之前上传的分发，用于不受新版本发布影响的可复现安装。要点：

- 日期比较的是每个分发工件上传到索引的时间（PEP 700 的 `upload-time` 字段），不是版本的发布日期；格式为 RFC 3339 时间戳或本地日期。索引不提供 `upload-time` 的分发会被视为不可用，除非用 `--exclude-newer-package <package>=false` 为包豁免、为索引单独配置、或在 `[[tool.uv.index]]` 中设 `exclude-newer = false`。
- 只作用于从索引读取的包，不影响 Git 等来源。
- 不可满足时的报错不会提及"因 exclude-newer 被排除"，新分发被当作不存在。
- 持久配置中不允许本地日期时间；包级、索引级的值优先于全局值。

该选项也可写入 `pyproject.toml`（`tool.uv.exclude-newer`）。写成时长（如 `1 week`、`PT24H`，日历单位不允许）即"依赖冷却"：解析时按当前时间换算时间戳并写入 lockfile；之后时间流逝不会触发更新，只有在 `--upgrade`、`--refresh` 等触发新解析时才重新换算。

## 限定与扩展解析范围

两个设置从相反方向调整 universal 解析的覆盖面：

- `environments` 收窄求解范围：接受 PEP 508 环境标记列表，各条目必须互斥。例如只求解 macOS 与 Linux、跳过 Windows。这可以避免为不支持的平台求解失败。
- `required-environments` 扩大必须覆盖的平台：对没有 sdist、只有 wheel 的包（如 PyTorch），要求解析结果包含指定平台的 wheel，否则失败。常用于声明对旧平台的支持。

## 版本化的 lockfile

`uv.lock` 使用带版本的 schema，`version` 字段记录模式版本：同一版本可读写同 schema 的 lockfile，遇到更大 schema 版本会拒绝；schema 只在次要版本中作为破坏性变更提升，因此同一次 uv 次要发布内的补丁版本完全兼容。`revision` 字段跟踪向后兼容的增量变化（如给分发表加新字段），不会让旧版 uv 报错。
