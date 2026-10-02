---
title: 安全边界
---

历史重写前先确认选中范围；发布前检查书签与 push --dry-run；
恢复问题先看 op log，不要急于 op abandon 或 util gc。
任何 jj 撤销机制都不保证撤销网络请求、外部脚本副作用、未跟踪文件删除或泄露的凭据。
调试和基准测试命令不是稳定脚本 API；某些隐藏命令还会重建索引或改变工作副本状态。

工作流、源码差异和验证记录见同目录的 `workflows-zh.md` 与 `sources-and-coverage.md`。

***
