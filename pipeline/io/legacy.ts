import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { unzipSync } from 'fflate';
import { stringify } from 'yaml';
import { hash, commandFile, safeToken } from '../core/identity.js';
import { sections, parseMarkdown, printMarkdown, rewriteLinks, toString, migrateHtml } from '../core/markdown.js';
import { write, writeJson, writeYaml, parseJson } from './files.js';
import type { Command, Field, Evidence, Frontmatter } from '../core/model.js';
import type { RootContent } from 'mdast';
import { auditLegacy } from './migration-audit.js';

type LegacyCommand = { path?: string; name?: string; description: string; usage: string; arguments: string[][]; options: string[][]; notes: string | string[]; aliases: string[]; sources?: string[]; source?: string; source_url?: string; children?: string[]; status?: string; hidden_options?: string[][]; runtime_additions?: string[]; diff?: boolean; anchor?: string };
type LegacyPage = { relative: string; title: string; body: string; meta: Frontmatter; origin: string; line: number; anchors: string[] };
const upstream = {
  herdr: { repository:'herdrdev/herdr',version:'0.9.3',commit:'7b116c05bfda646af39d2524c54e70c751f57ee8',prefix:'herdr-v0.9.3-zh/',archive:'herdr-v0.9.3-zh.zip' },
  jj: { repository:'jj-vcs/jj',version:'0.45.1',commit:'7c41cdeb16b6b321c64e789a966b6adf723816a5',prefix:'jj-v0.45.1-zh-revsets/',archive:'jj-v0.45.1-zh-revsets.zip' },
} as const;
const treeBody = (nodes: RootContent[]): string => printMarkdown({ type:'root',children:nodes });
const canonical = (display: string, option: boolean): string => option ? (display.match(/--[a-zA-Z0-9][a-zA-Z0-9-]*/)?.[0] ?? display.match(/-[a-zA-Z0-9]/)?.[0] ?? display) : display.replace(/[\[\]<>]/g,'').replace(/\.\.\.$/,'');
function field(display: string, evidenceIds: string[], option: boolean, inherited = false): Field {
  const name = canonical(display,option);
  return { name,display,aliases:option?(display.match(/--?[a-zA-Z0-9][a-zA-Z0-9-]*/g)??[]).filter(x=>x!==name):[],evidenceIds,...(inherited?{inherited:true}:{}) };
}
function fieldBody(rows: string[][], options: boolean): string {
  return rows.map(([display,prose])=>`### \`${canonical(display!,options)}\`\n\n${prose}\n`).join('\n');
}

/** Legacy adapters only read data. Embedded Python/HTML files are never executed. */
export async function importLegacy(toolId: 'herdr' | 'jj', input: string, root = process.cwd()): Promise<void> {
  const config = upstream[toolId];
  const target = path.join(root,'catalog',toolId,'versions',config.version);
  if (await fs.stat(target).catch(()=>null)) throw new Error(`目标版本已经存在：${target}`);
  const bytes = await fs.readFile(input);
  const archive = unzipSync(bytes);
  const text = (name: string): string => {
    const data=archive[config.prefix+name];
    if (!data) throw new Error(`归档缺少 ${name}`);
    return new TextDecoder('utf-8',{fatal:true}).decode(data);
  };
  for (const name of Object.keys(archive)) if (name.startsWith('/') || name.split('/').includes('..') || !name.startsWith(config.prefix)) throw new Error(`非法归档路径：${name}`);
  const sums = text(toolId==='herdr'?'SHA256SUMS':'SHA256SUMS.txt');
  for (const line of sums.trim().split('\n')) {
    const [digest,...rest] = line.trim().split(/\s+/);
    const file = rest.join(' ').replace(/^\*/, '');
    const data = archive[config.prefix+file];
    if (!data || hash(data)!==digest) throw new Error(`归档校验失败：${file}`);
  }
  const old = parseJson(text('commands.json')) as Record<string, unknown>;
  const raw: LegacyCommand[] = toolId==='herdr' ? old.commands as LegacyCommand[] : Object.entries(old).map(([key,value])=>({...(value as LegacyCommand),path:key}));
  const sourceTable = toolId==='herdr' ? old.sources as Record<string,{path:string;url:string}> : {};
  const sourcePaths = new Set<string>(['LICENSE']);
  for (const source of Object.values(sourceTable)) sourcePaths.add(source.path);
  for (const command of raw) if (command.source) sourcePaths.add(command.source);
  for (const name of Object.keys(archive).filter(n=>/\.(md|json)$/.test(n))) {
    const content=new TextDecoder().decode(archive[name]);
    const pattern=new RegExp(`https://github\\.com/${config.repository}/blob/v${config.version.replaceAll('.','\\.')}/([A-Za-z0-9_./-]+)`,'g');
    for (const match of content.matchAll(pattern)) sourcePaths.add(match[1]!.replace(/[.,]+$/,''));
  }
  if (toolId==='jj') for (const name of ['docs/revsets.md','docs/filesets.md','docs/templates.md','cli/src/config/revsets.toml','cli/src/config/misc.toml','lib/src/revset.rs','lib/src/revset_parser.rs','lib/src/default_index/revset_engine.rs','CHANGELOG.md']) sourcePaths.add(name);
  const stage = await fs.mkdtemp(path.join(os.tmpdir(),'cli-fieldbook-import-'));
  const evidence: Evidence[] = [];
  const evidenceFor = (source: string): string => `source:${source}`;
  try {
    const paths=[...sourcePaths].sort();let cursor=0;
    await Promise.all(Array.from({length:6},async()=>{
      while (cursor<paths.length) {
        const source=paths[cursor++]!;
        const url=`https://raw.githubusercontent.com/${config.repository}/${config.commit}/${source}`;
        const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
        if (!response.ok) throw new Error(`${response.status}: ${url}`);
        const data=new Uint8Array(await response.arrayBuffer());
        const relative=`upstream/source-extracts/${source}.txt`;
        await write(path.join(stage,relative),data);
        evidence.push({id:evidenceFor(source),path:relative,sha256:hash(data),url,method:'source-snapshot',obtainedAt:new Date().toISOString()});
      }
    }));
    await writeJson(path.join(stage,'upstream/legacy-commands.json'),old);
    evidence.push({id:'legacy:commands',path:'upstream/legacy-commands.json',sha256:hash(await fs.readFile(path.join(stage,'upstream/legacy-commands.json'))),url:`https://github.com/zhangzhenxiang666/cli-fieldbook/blob/main/imports/legacy/${config.archive}`,method:'legacy-import',obtainedAt:new Date().toISOString()});
    const shared = toolId==='jj' ? parseJson(text('shared-options.json')) as {global_options:string[][];diff_options:string[][]} : {global_options:[],diff_options:[]};
    const pages: LegacyPage[]=[];
    const add=(relative:string,title:string,body:string,origin:string,line=1,anchors:string[]=[],meta:Frontmatter={}):void=>{pages.push({relative,title,body,origin,line,anchors,meta:{title,...meta}});};
    const documents = toolId==='herdr'?sections(text('commands-zh.md'),2):sections(text('jj-v0.45.1-zh.md'),3);
    const commands:Command[] = [];
    for (const oldCommand of raw) {
      const commandPath=(oldCommand.path??'').split(' ').filter(Boolean);
      const sources=toolId==='herdr'?(oldCommand.sources??[]).map(id=>sourceTable[id]?.path).filter((s):s is string=>!!s):[oldCommand.source!];
      const ids=sources.map(evidenceFor);
      const optionRows=[...oldCommand.options];
      if (!optionRows.some(([s])=>s?.includes('--help'))) optionRows.push(['-h, --help','显示帮助。']);
      const diffRows=oldCommand.diff?shared.diff_options:[];
      const ownRows=[...optionRows,...diffRows,...(!commandPath.length?shared.global_options:[])];
      const sourceIds=diffRows.length?[...ids,evidenceFor('cli/src/diff_util.rs')]:ids;
      const command:Command={path:commandPath,aliases:(oldCommand.aliases??[]).map(alias=>[...commandPath.slice(0,-1),alias]),synopsis:oldCommand.usage.split('\n'),arguments:oldCommand.arguments.map(([s])=>field(s!,ids,false)),options:ownRows.map(([s])=>field(s!,sourceIds,true)),children:raw.filter(c=>(c.path??'').split(' ').filter(Boolean).length===commandPath.length+1 && (c.path??'').split(' ').slice(0,commandPath.length).join(' ')===commandPath.join(' ')).map(c=>c.path!.split(' ')),category:oldCommand.status==='hidden'?'hidden':oldCommand.status==='feature-gated'?'feature-gated':'public',evidenceIds:sourceIds,profileId:'source-default'};
      if (commandPath.length && shared.global_options.length) command.options.push(...shared.global_options.map(([s])=>field(s!,[evidenceFor('cli/src/cli_util.rs')],true,true)));
      commands.push(command);
      const original=documents.find(s=>s.title===`${toolId}${commandPath.length?' '+commandPath.join(' '):''}`);
      if (!original) throw new Error(`原 Markdown 缺少命令：${commandPath.join(' ')}`);
      // Keep authored notes and source annotations, while replacing generated help
      // blocks with editable entity sections. This is migration, not retranslation.
      const extra=original.nodes.filter(n=>!(n.type==='code' && n.lang==='text' && n.value.includes('Usage:')) && !(n.type==='paragraph' && /^类别：/.test(toString(n))));
      const notes=treeBody(extra).replace(/^### /gm,'#### ');
      const body=`## 简介\n\n${oldCommand.description}\n\n${oldCommand.arguments.length?'## 参数\n\n'+fieldBody(oldCommand.arguments,false):''}\n${ownRows.length?'## 选项\n\n'+fieldBody(ownRows,true):''}\n## 使用提醒\n\n${notes || '上游未提供额外说明。'}\n`;
      add(commandFile(command),`${toolId}${commandPath.length?' '+commandPath.join(' '):''}`,body,toolId==='herdr'?'commands-zh.md':'jj-v0.45.1-zh.md',original.line,[...original.anchors,toolId==='jj'?`cmd-${commandPath.join('-')||'jj'}`:oldCommand.anchor!].filter(Boolean),{command:commandPath});
    }
    if (toolId==='herdr') {
      for (const [file,kind] of [['concepts-zh.md','concepts'],['help-differences-zh.md','reference']] as const) sections(text(file),2).forEach((s,i)=>add(`${kind}/${kind==='reference'?'differences-':''}${String(i+1).padStart(2,'0')}.md`,s.title,treeBody(s.nodes),file,s.line,s.anchors));
      sections(text('workflows-zh.md'),2).forEach((s,i)=>add(`workflows/${String(i+1).padStart(2,'0')}.md`,s.title,treeBody(s.nodes),'workflows-zh.md',s.line,s.anchors));
      add('reference/sources.md','版本、来源与调研方法',text('sources.md').replace(/^# .+\n/,''),'sources.md');
    } else {
      const reference=sections(text('revsets-zh.md'),2);
      const structuredSections=parseJson(text('revsets-sections.json')) as {id:string;title:string;body:string}[];
      const functions=(parseJson(text('revsets-functions.json')) as {functions:{name:string;signature:string}[]}).functions;
      const aliases=(parseJson(text('revsets-aliases.json')) as {aliases:{name:string}[]}).aliases;
      for (const s of structuredSections) {
        const original=reference.find(r=>r.title===s.title);
        if (!original) throw new Error(`缺少 Revset 章节：${s.id}`);
        add(`reference/revset/${s.id.replace('revset-','')}.md`,s.title,treeBody(original.nodes),'revsets-zh.md',original.line,[...original.anchors,s.id]);
      }
      for (const f of functions) {
        const original=reference.find(s=>s.title===f.signature);
        if (!original) throw new Error(`缺少函数：${f.name}`);
        add(`reference/revset/functions/${f.name}.md`,f.signature,treeBody(original.nodes),'revsets-zh.md',original.line,[...original.anchors,`revset-fn-${f.name}`],{identifiers:[f.name,`${f.name}()`]});
      }
      for (const alias of aliases) {
        const original=reference.find(s=>s.title===alias.name)!;
        add(`reference/revset/aliases/${alias.name.replace('()','')}.md`,alias.name,treeBody(original.nodes),'revsets-zh.md',original.line,original.anchors,{identifiers:[alias.name]});
      }
      const main=sections(text('jj-v0.45.1-zh.md'),2);
      const articles:Record<string,string>={'阅读范围与可信边界':'reading','怎么读命令语法':'syntax','核心对象与常见误解':'objects','Revset、Fileset 和 Template 速查':'languages','全局选项':'global-options','共享差异格式选项':'diff-options','内置默认值不等于你的有效配置':'defaults','别名的三个层级':'aliases','安全边界':'safety'};
      for (const s of main) if (articles[s.title]) {
        const body=s.title==='全局选项'?'全局选项在[根命令](cli:command:)中统一解释，子命令页面自动显示继承信息。\n':treeBody(s.nodes);
        add(`concepts/${articles[s.title]}.md`,s.title,body,'jj-v0.45.1-zh.md',s.line,s.anchors);
      }
      sections(text('workflows-zh.md'),2).filter(s=>s.title!=='场景索引').forEach((s,i)=>add(`workflows/${s.title.startsWith('R')?'revset-'+s.title.slice(1,3):/^\d\d\./.test(s.title)?s.title.slice(0,2):'guide-'+i}.md`,s.title,treeBody(s.nodes),'workflows-zh.md',s.line,s.anchors));
      add('reference/sources.md','来源、覆盖与校对记录',text('sources-and-coverage.md').replace(/^# .+\n/,''),'sources-and-coverage.md');
      const overview=pages.filter(p=>p.relative.startsWith('reference/revset/') && !p.relative.includes('/functions/') && !p.relative.includes('/aliases/')).map(p=>`- [${p.title}](${path.posix.relative('reference/revset',p.relative)})`).join('\n');
      add('reference/revset/index.md','Revset 完整参考',`${overview}\n\n## 函数\n\n${functions.map(f=>`- [\`${f.signature}\`](functions/${f.name}.md)`).join('\n')}\n\n## 默认别名\n\n${aliases.map(a=>`- [\`${a.name}\`](aliases/${a.name.replace('()','')}.md)`).join('\n')}\n`,'revsets-zh.md');
    }
    add('reference/legacy.md','历史资料与迁移说明','原始资料包归档在仓库的 imports/legacy。活动译文已拆分为命令、概念、工作流和专题参考；旧 HTML、TXT 和采集脚本只保留在归档中。\n\n本次迁移保留源码核对与未实测边界，不构成目标二进制运行验证。\n','README.md');
    const anchorMap=new Map<string,string>();
    for (const page of pages) for (const anchor of page.anchors) if (anchor) anchorMap.set(anchor,page.relative);
    for (const page of pages) {
      const bodyTree=parseMarkdown(page.body);
      bodyTree.children=bodyTree.children.filter(n=>n.type!=='html');
      page.body=migrateHtml(treeBody(bodyTree.children));
      page.body=rewriteLinks(page.body,url=>{
        if (/^https?:/.test(url)) return url.replace(`/blob/v${config.version}/`,`/blob/${config.commit}/`);
        const [file,fragment]=url.split('#');
        if(file&&pages.some(p=>p.relative===path.posix.normalize(path.posix.join(path.posix.dirname(page.relative),file))))return url;
        const match=fragment?anchorMap.get(fragment):undefined;
        const target=match ?? (file?.includes('revsets')?'reference/revset/index.md':file?.includes('sources')?'reference/sources.md':file?.endsWith('.html')||file?.endsWith('.txt')||file?.endsWith('.json')||file?.endsWith('.py')||file==='README.md'?'reference/legacy.md':undefined);
        if (target) return path.posix.relative(path.posix.dirname(page.relative),target) || path.posix.basename(target);
        if (!file && fragment) return url;
        if (file?.endsWith('.md')) return path.posix.relative(path.posix.dirname(page.relative),'reference/legacy.md');
        return url;
      });
      // Herdr uses shared source definitions in the old combined manual.
      if (toolId==='herdr') page.body=page.body.replace(/\\?\[S(\d+)\](?![(:])/g,(_,n:string)=>{
        const source=sourceTable[`S${n}`];return source?`[S${n}](${source.url.replace(`/blob/v${config.version}/`,`/blob/${config.commit}/`)})`:`S${n}`;
      });
      const identifiers=page.meta.identifiers??[];
      if (page.relative.endsWith('/operators.md')) identifiers.push('::','..','&','|','~');
      if (identifiers.length) page.meta.identifiers=[...new Set(identifiers)];
      await write(path.join(stage,'zh-CN',page.relative),`---\n${stringify(page.meta)}---\n\n${page.body}`);
    }
    await writeJson(path.join(stage,'upstream/commands.json'),commands);
    await writeJson(path.join(stage,'upstream/source.lock.json'),{schema:1,repository:`https://github.com/${config.repository}`,upstreamVersion:config.version,ref:`v${config.version}`,commit:config.commit,adapter:`legacy-${toolId}-v1`,normalization:1,profile:{id:'source-default',scope:toolId==='herdr'?'125 public help nodes; internal entries documented separately':'122 public nodes, 26 hidden debug nodes, 5 feature-gated bench nodes'},evidence:evidence.sort((a,b)=>a.id.localeCompare(b.id,'en')),limitations:['未采集目标二进制原始帮助。','示例和工作流未实测。','初始来源为旧中文资料与固定提交源码；结构审核不等于全量实现审计。',...(toolId==='jj'?['旧公开命令清单曾参考滚动 latest；已将相关源码固定为版本快照，行为审阅范围另见审核报告。']:[])]});
    await writeYaml(path.join(stage,'version.yml'),{schema:1,upstream:{version:config.version,ref:`v${config.version}`},publication:'draft'});
    await writeJson(path.join(stage,'migration.json'),{schema:1,archive:config.archive,sha256:hash(bytes),checksumEntries:sums.trim().split('\n').length,commandNodes:commands.length,pages:pages.map(p=>({source:p.origin,line:p.line,target:`zh-CN/${p.relative}`,title:p.title,legacyAnchors:p.anchors})),deduplicated:toolId==='jj'?['integrated Revset copies → reference/revset','20 query recipes → workflows/revset-*']:['combined manual → component Markdown'],notEditorialInputs:['HTML','TXT','Python helpers']});
    await auditLegacy(stage,toolId,input);
    await fs.mkdir(path.dirname(target),{recursive:true});
    await fs.rename(stage,target);
    if (!await fs.stat(path.join(root,'catalog',toolId,'tool.yml')).catch(()=>null)) await writeYaml(path.join(root,'catalog',toolId,'tool.yml'),{schema:1,name:toolId==='jj'?'Jujutsu':'Herdr',binary:toolId,repository:`https://github.com/${config.repository}`,summary:toolId==='jj'?'与 Git 兼容的版本控制工具，含完整 Revset 专题。':'面向 AI 编程 Agent 的终端工作区管理器。'});
    console.log(`已导入 ${toolId}@${config.version}: ${commands.length} 个命令节点，${pages.length} 篇内容，${evidence.length} 项证据。`);
  } finally { await fs.rm(stage,{recursive:true,force:true}); }
}
