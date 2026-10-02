import fs from 'node:fs/promises';
import path from 'node:path';
import { unzipSync } from 'fflate';
import { visit } from 'unist-util-visit';
import { readData, readMarkdown, write, writeJson } from './files.js';
import { parseMarkdown, printMarkdown, toString } from '../core/markdown.js';
import { stringify } from 'yaml';
import type { Command, Field } from '../core/model.js';

/** Named legacy repair rules are reproducible and recorded in the migration log. */
export async function auditLegacy(root:string,tool:'herdr'|'jj',archivePath:string):Promise<void> {
  const z=unzipSync(await fs.readFile(archivePath));
  const prefix=tool==='jj'?'jj-v0.45.1-zh-revsets/':'herdr-v0.9.3-zh/';
  const json=(name:string):any=>JSON.parse(new TextDecoder().decode(z[prefix+name]));
  const commands=await readData(path.join(root,'upstream/commands.json')) as Command[];
  const migration=await readData(path.join(root,'migration.json')) as Record<string,any>;
  const corrections:{file:string;kind:string;before:unknown;after:unknown}[]=[];
  let functionLines=new Map<string,number>();
  let sharedNames=new Set<string>();
  if(tool==='jj') {
    const source=await fs.readFile(path.join(root,'upstream/source-extracts/lib/src/revset.rs.txt'),'utf8');
    functionLines=new Map([...source.matchAll(/map\.insert\(\s*"([a-z_]+)"/g)].map(match=>[match[1]!,source.slice(0,match.index).split('\n').length]));
    const functions=json('revsets-functions.json').functions as {name:string}[];
    if(functionLines.size!==functions.length||functions.some(f=>!functionLines.has(f.name)))throw new Error('Revset 函数与固定注册表不一致。');
    const defaults=await fs.readFile(path.join(root,'upstream/source-extracts/cli/src/config/revsets.toml.txt'),'utf8');
    const aliases=json('revsets-aliases.json').aliases as {name:string;definition:string}[];
    for(const a of aliases) {
      const escaped=a.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      const match=defaults.match(new RegExp(`^'${escaped}' = ('{3}|')([\\s\\S]*?)\\1`,'m'));
      if(!match||match[2]!.replace(/\s/g,'')!==a.definition.replace(/\s/g,''))throw new Error(`默认别名不一致：${a.name}`);
    }
    const shared=json('shared-options.json') as {diff_options:string[][];global_options:string[][]};
    const name=(s:string)=>s.match(/--[a-zA-Z0-9][a-zA-Z0-9-]*/)?.[0]??s.match(/-[a-zA-Z0-9]/)?.[0]??s;
    sharedNames=new Set(shared.diff_options.map(([s])=>name(s!)));
    const raw=json('commands.json') as Record<string,{diff:boolean}>;
    const globals=new Set(shared.global_options.map(([s])=>name(s!)));
    for(const c of commands) {
      // Flattened argument structs live in the parent module, rather than the
      // individual command file. Bind claims to the declaration actually read.
      for(const field of c.options) {
        const sharedSource=c.path[0]==='config'&&['--user','--repo','--workspace','--file'].includes(field.name)?'cli/src/commands/config/mod.rs':c.path[0]==='bench'&&['--save-baseline','--baseline','--sample-size'].includes(field.name)?'cli/src/commands/bench/mod.rs':undefined;
        if(sharedSource&&!field.evidenceIds.includes('source:'+sharedSource)) {
          corrections.push({file:'upstream/commands.json',kind:'flattened_field_source',before:{command:c.path,field:field.name,evidenceIds:field.evidenceIds},after:['source:'+sharedSource]});
          field.evidenceIds=['source:'+sharedSource];
        }
      }
      if(raw[c.path.join(' ')]?.diff)for(const option of c.options.filter(o=>sharedNames.has(o.name))) {option.inherited=true;option.group='diff-format';option.evidenceIds=['source:cli/src/diff_util.rs'];}
      if(!c.path.length)for(const option of c.options.filter(o=>globals.has(o.name)))option.evidenceIds=['source:cli/src/cli_util.rs'];
      if(c.aliases.length && !c.evidenceIds.includes('source:cli/src/config/misc.toml'))c.evidenceIds.push('source:cli/src/config/misc.toml');
    }
    migration.knowledgeAudit={registeredFunctions:functionLines.size,documentedFunctions:54,deprecatedFunctions:['diff_contains'],defaultAliases:aliases.length,aliasesMatchFixedConfig:true};
  }
  for(const page of migration.pages as {target:string}[]) {
    const file=path.join(root,page.target);
    const original=await fs.readFile(file,'utf8');const {frontmatter,body}=readMarkdown(original);
    let currentBody=body;
    if(page.target==='zh-CN/concepts/global-options.md')currentBody='全局选项在[根命令](cli:command:)中统一解释，子命令页面自动显示继承信息。\n';
    if(page.target==='zh-CN/reference/revset/index.md') {
      const functions=json('revsets-functions.json').functions as {name:string;signature:string}[];
      const aliases=json('revsets-aliases.json').aliases as {name:string}[];
      const chapters=(migration.pages as {target:string;title:string}[]).filter(p=>p.target.startsWith('zh-CN/reference/revset/')&&!p.target.includes('/functions/')&&!p.target.includes('/aliases/')&&p.target!==page.target);
      currentBody=chapters.map(p=>`- [${p.title}](${path.posix.relative('zh-CN/reference/revset',p.target)})`).join('\n')+'\n\n## 函数\n\n'+functions.map(f=>`- [\`${f.signature}\`](functions/${f.name}.md)`).join('\n')+'\n\n## 默认别名\n\n'+aliases.map(a=>`- [\`${a.name}\`](aliases/${a.name.replace('()','')}.md)`).join('\n')+'\n';
    }
    if(page.target==='zh-CN/reference/differences-05.md')currentBody=currentBody.replace('环境的 GitHub 下载访问未成功，因此未把“源码推导”冒充“跑过的结果”。包中的 `audit-help.py` 可在你已安装该版本的机器上采集原始英文帮助；它只执行版本查询与精确命令路径的 `--help`。','原始调研阶段的 GitHub 下载访问未成功。本次迁移已经保存固定来源文件，仍未运行目标二进制。原包的 `audit-help.py` 仅在只读归档中保留，首版不提供自动采集入口。');
    if(page.target==='zh-CN/reference/sources.md') {
      currentBody=currentBody.replace('本环境未成功建立本地源码副本，因此交付包不含官方源代码镜像。','原始翻译包未保存源码副本；这是原始调研阶段的边界。');
      currentBody=currentBody.replace('由于环境中的发布包/原始文件下载未成功，本包没有声称已经构建源码、运行 server、测试 SSH、安装插件或完成 Agent 操作。','原始调研阶段的发布包下载未成功；本手册没有声称已经构建源码、运行 server、测试 SSH、安装插件或完成 Agent 操作。');
      if(!currentBody.includes('## 令册首版迁移复核'))currentBody+='\n\n## 令册首版迁移复核\n\n本次迁移把 tag 解析为完整提交 SHA，并将实际使用的源码与上游仓库文档原文保存到 `upstream/source-extracts/`。每份原文的路径、固定提交 URL、SHA-256 和取得时间记录在 `upstream/source.lock.json`；它是所用文件集合，不是上游仓库的完整镜像。\n\n结构检查覆盖全部迁移节点、参数说明与内部引用；行为复核范围和发现的修正详见[首版审核报告](https://github.com/zhangzhenxiang666/cli-fieldbook/blob/main/docs/AUDIT.md)。历史网页调研及其日期保留为出处背景，不用滚动 latest 证明当前固定版本。没有补写原始帮助、二进制运行日志或历史批准记录。示例和工作流仍未实测。\n';
    }
    let tree=parseMarkdown(currentBody);
    const functionName=page.target.match(/reference\/revset\/functions\/([^/]+)\.md$/)?.[1];
    if(functionName) {
      const line=functionLines.get(functionName)!;
      visit(tree,'link',node=>{
        if(node.url.includes('/lib/src/revset.rs#L')){const previous=node.url;node.url=node.url.replace(/#L\d+(?:-L\d+)?$/,'#L'+line);if(previous!==node.url)corrections.push({file:page.target,kind:'function_source_line',before:previous,after:node.url});}
      });
    }
    const command=frontmatter.command?commands.find(c=>JSON.stringify(c.path)===JSON.stringify(frontmatter.command)):undefined;
    if(command?.options.some(f=>f.group==='diff-format')) {
      let skipping=false;
      tree.children=tree.children.filter(node=>{
        if(node.type==='heading') { if(node.depth===3){skipping=command.options.some(f=>f.group==='diff-format'&&f.name===toString(node));if(skipping)return false;}else if(node.depth<=2)skipping=false; }
        return !skipping;
      });
    }
    if(page.target.startsWith('zh-CN/workflows/')) {
      const uses=new Set<string>();
      const plain=body.replace(/`/g,'');
      for(const c of commands) {
        const phrase=[tool,...c.path].join(' ');
        const escaped=phrase.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
        if(new RegExp(`(?:^|[\\s\\n])${escaped}(?=[\\s\\n]|$)`).test(plain))uses.add('command:'+c.path.join('/'));
      }
      if(tool==='jj')for(const f of functionLines.keys())if(body.includes(`${f}(`))uses.add(`reference:revset/functions/${f}`);
      if(uses.size)frontmatter.uses=[...uses].sort();
    }
    const updated=`---\n${stringify(frontmatter)}---\n\n${printMarkdown(tree)}`;
    await write(file,updated);
  }
  await writeJson(path.join(root,'upstream/commands.json'),commands);
  migration.corrections=[...(migration.corrections??[]),...corrections];
  migration.sharedProse=tool==='jj'?['Global options are authored on the root command only.','Diff format options are authored in concepts/diff-options.md only.']:[];
  await writeJson(path.join(root,'migration.json'),migration);
  console.log(`${tool} 迁移审核：${corrections.length} 项来源修正；共享选项和工作流依赖已归并。`);
}
