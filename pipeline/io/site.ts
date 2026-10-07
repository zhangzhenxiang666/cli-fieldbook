import fs from 'node:fs/promises';
import path from 'node:path';
import { stringify } from 'yaml';
import { spawnSync } from 'node:child_process';
import { route, hash, stable, idOf } from '../core/identity.js';
import { reviewState } from '../core/review.js';
import { write, writeJson } from './files.js';
import { exportMarkdown, webBody } from '../exporters/markdown.js';
import type { Catalog } from '../core/model.js';

export function revision():string {
  if(process.env.GITHUB_SHA)return process.env.GITHUB_SHA;
  const result=spawnSync('jj',['--ignore-working-copy','log','-r','@','--no-graph','-T','commit_id'],{encoding:'utf8'});
  return result.status===0?result.stdout.trim():'local-preview';
}
export async function generateSite(catalog:Catalog,preview=false,root=process.cwd()):Promise<void> {
  if(catalog.diagnostics.some(d=>d.severity==='error'))throw new Error('内容检查失败，不能生成站点。');
  const selected=catalog.versions.filter(v=>preview||v.version.publication==='published');
  const generated=path.join(root,'.generated');
  const content=path.join(root,'site/src/content/docs');
  const publicGenerated=path.join(root,'site/public/generated');
  await fs.rm(content,{recursive:true,force:true});
  await fs.rm(publicGenerated,{recursive:true,force:true});
  await fs.mkdir(generated,{recursive:true});
  const commit=revision();
  const base='/cli-fieldbook/';
  const nav=selected.map(v=>({toolId:v.toolId,name:v.tool.name,summary:v.tool.summary,version:v.versionId,publication:v.version.publication,default:v.tool.defaults?.['zh-CN']===v.versionId,url:`${base}zh-cn/${v.toolId}/${v.versionId}/`,pages:v.pages.map(p=>({id:idOf(p.kind,p.id),kind:p.kind,title:p.title,url:route(v.toolId,v.versionId,p.relative)}))}));
  const search=selected.flatMap(v=>v.pages.flatMap(p=>{
    const terms=[p.title,...(p.frontmatter.identifiers??[]),...(p.command?[...p.command.aliases.map(a=>`${v.tool.binary} ${a.join(' ')}`),...p.command.options.flatMap(f=>[f.name,...f.aliases])]:[])];
    return [...new Set(terms)].map(term=>({term,title:p.title,tool:v.toolId,version:v.versionId,kind:p.kind,url:route(v.toolId,v.versionId,p.relative)}));
  }));
  await writeJson(path.join(generated,'site.json'),{versions:nav,revision:commit,preview});
  await writeJson(path.join(publicGenerated,'identifiers.json'),search);
  const toolCards=nav.filter(v=>v.default || !nav.some(other=>other.toolId===v.toolId && other.default)).map(v=>`### [${v.name}](${v.url})\n\n${v.summary}\n\n版本 ${v.version} · [${v.pages.length} 篇内容](${v.url})\n`);
  const page=(meta:unknown,body:string):string=>`---\n${stringify(meta)}---\n\n${body}`;
  await write(path.join(content,'index.md'),page({title:'CLI Fieldbook · 令册',description:'有版本、有出处的 CLI 中文参考与实战手册。',editUrl:false,fieldbook:{kind:'home'}},`有版本、有出处的 CLI 中文参考与实战手册。\n\n按工具与版本查命令、读概念、学习工作流和专题知识。资料均为非官方中文整理，来源与验证边界随版本保存。\n\n${preview?'> 当前为预览，包括未发布草稿；不代表已批准发布。\n\n':''}## 工具\n\n${toolCards.join('\n')}\n## 参与维护\n\n[仓库与贡献指南](https://github.com/zhangzhenxiang666/cli-fieldbook) · [设计依据](https://github.com/zhangzhenxiang666/cli-fieldbook/blob/main/docs/DESIGN.md)\n`));
  for(const version of selected) {
    const dir=`zh-cn/${version.toolId}/${version.versionId}`;
    const context={tool:version.toolId,version:version.versionId,revision:commit,sourceCommit:version.sources.commit,repository:version.tool.repository,preview};
    const groups=['commands','concepts','workflows','reference'];
    const labels={commands:'命令参考',concepts:'概念',workflows:'工作流',reference:'专题参考与来源'};
    const stats=Object.fromEntries(['public','hidden','feature-gated'].map(category=>[category,version.commands.filter(c=>c.category===category).length]));
    const overview=`${version.tool.summary}\n\n> 非官方中文整理。原始帮助未采集；示例与工作流未实测。固定源码的结构核对与人工行为复核范围详见[来源页](${route(version.toolId,version.versionId,'reference/sources.md')})。\n\n## 覆盖范围\n\n公开节点 ${stats.public}，隐藏节点 ${stats.hidden}，条件编译节点 ${stats['feature-gated']}。这些计数包含根与分组，别名不重复计数。\n\n[下载合订 Markdown](${base}generated/${version.toolId}-${version.versionId}-zh-CN.md)\n\n${groups.map(kind=>`## ${labels[kind as keyof typeof labels]}\n\n${version.pages.filter(p=>p.kind===kind).map(p=>`- [${p.title}](${route(version.toolId,version.versionId,p.relative)})`).join('\n')}`).join('\n\n')}\n`;
    await write(path.join(content,dir,'index.md'),page({title:`${version.tool.name} ${version.versionId}`,editUrl:false,fieldbook:{...context,kind:'overview'}},overview));
    for(const p of version.pages) {
      const output=p.relative.replace(/\.md$/,'.md');
      const metadata={title:p.title,editUrl:`https://github.com/zhangzhenxiang666/cli-fieldbook/edit/main/${path.relative(root,p.file).split(path.sep).join('/')}`,fieldbook:{...context,kind:p.kind,id:idOf(p.kind,p.id),review:reviewState(version,p)}};
      await write(path.join(content,dir,output),page(metadata,webBody(version,p)));
    }
    await write(path.join(publicGenerated,`${version.toolId}-${version.versionId}-zh-CN.md`),exportMarkdown(version,commit));
  }
  const manifest={schema:1,revision:commit,preview,versions:selected.map(v=>({tool:v.toolId,version:v.versionId,pages:v.pages.length,sourceCommit:v.sources.commit,contentDigest:hash(stable(v.pages.map(p=>({id:idOf(p.kind,p.id),body:p.body,frontmatter:p.frontmatter,command:p.command??null}))))})),catalogDigest:hash(stable(selected.map(v=>({tool:v.tool,version:v.version,sources:v.sources,review:v.review,pages:v.pages.map(p=>({relative:p.relative,body:p.body,frontmatter:p.frontmatter}))}))))};
  await writeJson(path.join(generated,'manifest.json'),manifest);
  await writeJson(path.join(publicGenerated,'manifest.json'),manifest);
  console.log(`生成 ${selected.length} 个版本、${selected.reduce((n,v)=>n+v.pages.length,0)} 篇内容，修订 ${commit.slice(0,12)}。`);
}
