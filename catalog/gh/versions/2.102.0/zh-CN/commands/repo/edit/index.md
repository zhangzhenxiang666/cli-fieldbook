---
title: gh repo edit
command:
  - repo
  - edit
---

编辑仓库设置。

## 简介

`gh repo edit` 修改仓库的描述、主页、默认分支、可见性、功能开关、合并策略与主题等设置。不带任何旗标运行时进入交互模式，按提示选择要编辑的项目。

要关闭某个开关，使用 `--<flag>=false` 语法。

修改仓库可见性可能带来预期之外的后果，包括但不限于：

- 失去 star 与关注者，影响仓库排名
- 使公开复刻脱离仓库网络
- 停用推送规则集
- 允许访问 GitHub Actions 历史与日志

使用 `--visibility` 时必须同时给出 `--accept-visibility-change-consequences`。全部后果说明见 [设置仓库可见性](https://gh.io/setting-repository-visibility)。

使用 `--enable-squash-merge` 时，可用 `--squash-merge-commit-message` 改变默认的 squash 合并提交信息行为：

- `default`：单个提交用提交标题与信息；两个及以上用拉取请求标题与提交列表
- `pr-title`：用拉取请求标题
- `pr-title-commits`：用拉取请求标题与提交列表
- `pr-title-description`：用拉取请求标题与描述

## 参数

### `REPOSITORY`

可选，写作 `[<repository>]`。目标仓库，形式为 `OWNER/REPO` 或 URL；省略时使用当前目录对应的仓库。

## 选项

### `--description`

短旗标 `-d`。格式：`--description <string>`。仓库描述。

### `--homepage`

短旗标 `-h`。格式：`--homepage <URL>`。仓库主页 `URL`。

### `--default-branch`

格式：`--default-branch <name>`。设置仓库的默认分支 `name`。

### `--visibility`

格式：`--visibility <string>`。把仓库可见性改为 `{public,private,internal}` 之一。必须与 `--accept-visibility-change-consequences` 同用。

### `--template`

格式：`--template`。把仓库设为模板仓库。

### `--enable-issues`

格式：`--enable-issues`。在仓库中启用议题。

### `--enable-projects`

格式：`--enable-projects`。在仓库中启用项目。

### `--enable-wiki`

格式：`--enable-wiki`。在仓库中启用 wiki。

### `--enable-discussions`

格式：`--enable-discussions`。在仓库中启用讨论。

### `--enable-merge-commit`

格式：`--enable-merge-commit`。允许通过合并提交合并拉取请求。

### `--enable-squash-merge`

格式：`--enable-squash-merge`。允许通过压缩提交合并拉取请求。

### `--enable-rebase-merge`

格式：`--enable-rebase-merge`。允许通过变基合并拉取请求。

### `--enable-auto-merge`

格式：`--enable-auto-merge`。启用自动合并功能。

### `--enable-advanced-security`

格式：`--enable-advanced-security`。在仓库中启用高级安全。

### `--enable-secret-scanning`

格式：`--enable-secret-scanning`。在仓库中启用机密扫描。

### `--enable-secret-scanning-push-protection`

格式：`--enable-secret-scanning-push-protection`。在仓库中启用机密扫描推送保护，需先启动机密扫描。

### `--delete-branch-on-merge`

格式：`--delete-branch-on-merge`。拉取请求合并后删除头部分支。

### `--allow-forking`

格式：`--allow-forking`。允许复刻组织仓库。

### `--allow-update-branch`

格式：`--allow-update-branch`。允许更新落后于基分支的拉取请求头部分支。

### `--squash-merge-commit-message`

格式：`--squash-merge-commit-message <string>`。squash 合并提交信息的默认取值：`{default|pr-title|pr-title-commits|pr-title-description}`。需要与 `--enable-squash-merge` 同用。

### `--add-topic`

格式：`--add-topic <strings>`。添加仓库主题，可给出多个值。

### `--remove-topic`

格式：`--remove-topic <strings>`。移除仓库主题，可给出多个值。

### `--accept-visibility-change-consequences`

格式：`--accept-visibility-change-consequences`。接受修改仓库可见性的后果。使用 `--visibility` 时必填。

## 环境变量

- `GH_REPO`：省略位置参数时，可用 `[HOST/]OWNER/REPO` 形式指定目标仓库，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 不带旗标进入交互模式；非交互模式未指定任何要修改的属性时报错。
- `--squash-merge-commit-message` 必须在启用 squash 合并时使用，给出 `--enable-squash-merge=false` 时也不能使用；取值不在枚举内时报错。
- 高级安全、机密扫描与推送保护选项要求对仓库有管理员权限，否则报错。
- `--add-topic` 与 `--remove-topic` 基于仓库现有主题做增删，最终主题集合与现状相同时不发起请求。

## 示例

```sh
# 启用议题与 wiki
gh repo edit --enable-issues --enable-wiki

# 关闭项目
gh repo edit --enable-projects=false
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 全部旗标注册、交互编辑流程与主题合并见 [pkg/cmd/repo/edit/edit.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/edit/edit.go)。
- `--squash-merge-commit-message` 的四个取值在提交前映射为 GitHub API 的 `squash_merge_commit_title` 与 `squash_merge_commit_message` 两个字段。
