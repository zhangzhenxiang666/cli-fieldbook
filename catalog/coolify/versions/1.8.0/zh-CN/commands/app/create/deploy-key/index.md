---
title: coolify app create deploy-key
command:
  - app
  - create
  - deploy-key
---
## 简介

使用 SSH deploy key 认证，从私有 Git 仓库创建应用。

## 选项

### `--base-directory`

应用的基础目录。

### `--build-command`

自定义构建命令。

### `--build-pack`

构建方式：`nixpacks`、`static`、`dockerfile`、`dockercompose`（必需）。

### `--compose-domain`

Docker Compose 服务域名，格式 `<service>=<url>[,<url>]`，可重复传入。

### `--custom-internal-name`

自定义内部主机名。

### `--description`

应用描述。

### `--destination-uuid`

服务器存在多个网络目标时指定目标 UUID。

### `--disable-build-cache`

禁用构建缓存。

### `--docker-images-to-keep`

保留的 Docker 镜像数量。

### `--dockerfile-target-build`

Dockerfile 的目标构建阶段。

### `--domains`

应用的域名，可传入多个。

### `--environment-name`

环境名称。

### `--environment-uuid`

环境 UUID。

### `--git-branch`

Git 分支（必需）。

### `--git-commit-sha`

部署指定的提交 SHA。

### `--git-repository`

Git 仓库 SSH 地址，例如 `git@github.com:owner/repo.git`（必需）。

### `--gpu-count`

GPU 数量。

### `--gpu-device-ids`

GPU 设备 ID。

### `--gpu-driver`

GPU 驱动。

### `--gpu-options`

GPU 选项。

### `--health-check-enabled`

启用健康检查。

### `--health-check-path`

健康检查路径。

### `--help`

打印该命令的帮助。

### `--include-source-commit-in-build`

构建中包含源码提交信息。

### `--inject-build-args-to-dockerfile`

向 Dockerfile 注入构建参数。

### `--install-command`

自定义安装命令。

### `--instant-deploy`

创建后立即部署。

### `--is-consistent-container-name-enabled`

使用固定的容器名。

### `--is-env-sorting-enabled`

对环境变量排序。

### `--is-git-lfs-enabled`

启用 Git LFS。

### `--is-git-shallow-clone-enabled`

使用浅克隆（shallow clone）。

### `--is-git-submodules-enabled`

克隆 Git 子模块。

### `--is-gpu-enabled`

启用 GPU。

### `--is-gzip-enabled`

启用 gzip 压缩。

### `--is-log-drain-enabled`

启用应用日志外发。

### `--is-pr-deployments-public-enabled`

使 Pull Request 部署可公开访问。

### `--is-preview-deployments-enabled`

启用预览部署。

### `--is-raw-compose-deployment-enabled`

按原始 Docker Compose 定义部署。

### `--is-stripprefix-enabled`

启用路径前缀剥离（StripPrefix）。

### `--limits-cpus`

CPU 限制。

### `--limits-memory`

内存限制。

### `--max-restart-count`

容器最大重启次数。

### `--name`

应用名称。

### `--ports-exposes`

暴露的端口，例如 `'3000'` 或 `'3000,8080'`（必需）。

### `--ports-mappings`

端口映射（`主机:容器`）。

### `--preview-url-template`

预览 URL 模板。

### `--private-key-uuid`

私钥 UUID（必需）。

### `--project-uuid`

项目 UUID（必需）。

### `--publish-directory`

静态构建的发布目录。

### `--server-uuid`

服务器 UUID（必需）。

### `--start-command`

自定义启动命令。

### `--stop-grace-period`

容器停止宽限期（秒）。

### `--tag`

要添加到应用的标签，可重复传入。

### `--tags`

要添加到应用的标签。

### `--use-build-secrets`

构建期变量使用 Docker Build Secrets 传递。

## 使用提醒

#### 行为与限制

仓库地址使用 SSH 形式；`--git-branch`、`--build-pack`、`--ports-exposes` 等基础创建参数为必需，高级设置旗标与应用设置共享同一套定义。

源码：[S07](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/create/deploy_key.go)
