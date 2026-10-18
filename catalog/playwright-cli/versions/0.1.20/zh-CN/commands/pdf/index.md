---
title: playwright-cli pdf
command:
  - pdf
---

把页面保存为 PDF。

## 简介

`pdf` 把当前页面排版输出为 PDF 文件。缺省文件名按 `page-{时间戳}.pdf` 生成。

## 选项

### `--filename`

格式：`--filename <VALUE>`。保存 PDF 的文件名；缺省 `page-{时间戳}.pdf`。

## 示例

```sh
playwright-cli pdf
playwright-cli pdf --filename=page.pdf
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
