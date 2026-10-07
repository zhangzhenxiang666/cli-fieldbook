import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { loadCatalog } from '../io/catalog.js';
import { importLegacy } from '../io/legacy.js';
import { generateSite, revision } from '../io/site.js';
import { write, writeJson, writeYaml, readData, walk } from '../io/files.js';
import { baseline } from '../core/review.js';
import { safeToken, idOf, hash, stable } from '../core/identity.js';
import { exportMarkdown } from '../exporters/markdown.js';
import { importDirectory } from '../io/import-directory.js';

const args=process.argv.slice(2);
const option=(name:string):string|undefined=>{const index=args.indexOf(name);return index>=0?args[index+1]:undefined;};
const run=(command:string,argv:string[]):void=>{const result=spawnSync(command,argv,{stdio:'inherit'});if(result.status!==0)throw new Error(`${command} 失败：${result.status}`);};

async function main():Promise<void> {
  const [action,tool,version]=args;
  if(action==='import') {
    const input=option('--input');if(!input)throw new Error('用法：docs import <herdr|jj> <version> --input <legacy.zip>');
    if((await fs.stat(input)).isDirectory()) {
      if(!tool||!version)throw new Error('必须指定工具与版本。');await importDirectory(tool,version,input);return;
    }
    if(!['herdr','jj'].includes(tool??'') || (tool==='herdr'?version!=='0.9.3':version!=='0.45.1'))throw new Error('ZIP 仅支持两个命名旧资料适配器；其他工具使用协议数据目录。');
    await importLegacy(tool as 'herdr'|'jj',input);return;
  }
  if(action==='new-tool') {
    if(!tool||!safeToken(tool))throw new Error('使用安全工具 ID。');
    const file=path.resolve('catalog',tool,'tool.yml');if(await fs.stat(file).catch(()=>null))throw new Error('工具已存在。');
    const repository=option('--repository');if(!repository?.startsWith('https://'))throw new Error('必须指定 --repository https://...，不推测上游。');
    const summary=option('--summary');if(!summary?.trim())throw new Error('必须指定 --summary <一句话中文简介>，不推测工具用途。');
    await writeYaml(file,{schema:1,name:option('--name')??tool,binary:option('--binary')??tool,repository,summary:summary.trim()});return;
  }
  if(action==='new-version') {
    if(!tool||!safeToken(tool)||!version||!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(version))throw new Error('无效工具或版本。');
    const dir=path.resolve('catalog',tool,'versions',version);if(await fs.stat(dir).catch(()=>null))throw new Error('版本已存在。');
    await readData(path.resolve('catalog',tool,'tool.yml'));
    const from=option('--from');
    const source=from?path.resolve('catalog',tool,'versions',from,'zh-CN'):undefined;
    if(from&&!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(from))throw new Error('无效参考版本。');
    if(source)await walk(source);
    await fs.mkdir(path.dirname(dir),{recursive:true});
    const stage=await fs.mkdtemp(path.join(path.dirname(dir),'.new-version-'));
    try {
      await writeYaml(path.join(stage,'version.yml'),{schema:1,upstream:{version,ref:option('--ref')??version},publication:'draft'});
      if(source)await fs.cp(source,path.join(stage,'zh-CN'),{recursive:true,dereference:false});
      else await write(path.join(stage,'zh-CN/concepts/index.md'),'---\ntitle: 阅读说明\n---\n\n此版本尚未导入来源，不能发布。\n');
      await fs.rename(stage,dir);
    } finally {await fs.rm(stage,{recursive:true,force:true});}
    console.log('草稿已创建；请导入固定来源与 commands.json 后复核，不复制旧审核批准。');return;
  }
  const catalog=await loadCatalog();
  if(action==='check') {
    if(args.includes('--json'))console.log(JSON.stringify(catalog.diagnostics,null,2));
    else {for(const d of catalog.diagnostics)console.log(`${d.file}:${d.line} [${d.severity}] ${d.code}: ${d.message}\n  ${d.fix}`);console.log(`${catalog.versions.length} 个版本；${catalog.diagnostics.filter(d=>d.severity==='error').length} 个错误，${catalog.diagnostics.filter(d=>d.severity==='warning').length} 个警告。`);}
    process.exitCode=catalog.diagnostics.some(d=>d.severity==='error')?1:0;return;
  }
  const preparing=action==='review'&&tool==='prepare';
  if(catalog.diagnostics.some(d=>d.severity==='error'&&!(preparing&&d.code==='review_required'))) { console.error(JSON.stringify(catalog.diagnostics,null,2));process.exitCode=1;return; }
  if(action==='review' && tool==='prepare') {
    const targetTool=version;const targetVersion=args[3];const selected=catalog.versions.filter(v=>(!targetTool||v.toolId===targetTool)&&(!targetVersion||v.versionId===targetVersion));
    if(!selected.length)throw new Error('未找到版本。');
    if(catalog.diagnostics.some(d=>['missing_field','missing_command'].includes(d.code)))throw new Error('内容不完整，不能准备发布审阅基线。');
    for(const v of selected)await writeJson(path.join(v.root,'review.lock.json'),{schema:1,status:'prepared',preparedBy:'Codex · source and migration audit',method:'Fixed-source structural checks and documented semantic review; no runtime certification. Publication requires the maintainer GitHub environment approval.',pages:Object.fromEntries(v.pages.map(p=>[idOf(p.kind,p.id),baseline(v,p)]))});
    console.log('候选基线已准备；没有创建维护者批准，也没有移动默认版本。');return;
  }
  if(action==='generate'||action==='build') {
    await generateSite(catalog,args.includes('--preview'));
    if(action==='build'){run('pnpm',['exec','astro','build','--root','site']);run('node',['pipeline/cli/check-site.mjs']);}
    return;
  }
  if(action==='export') {
    const v=catalog.versions.find(v=>v.toolId===tool&&v.versionId===version);if(!v)throw new Error('未找到工具版本。');
    if(option('--format')&&option('--format')!=='markdown')throw new Error('首版仅支持 markdown。');
    if(option('--lang')&&option('--lang')!=='zh-CN')throw new Error('首版仅支持 zh-CN。');
    if(v.version.publication!=='published'&&!args.includes('--preview'))throw new Error('草稿只能使用 --preview 导出。');
    const output=option('--output');if(output)await write(path.resolve(output),exportMarkdown(v,revision()));else process.stdout.write(exportMarkdown(v,revision()));return;
  }
  if(action==='seal') {
    const dist=path.resolve('site/dist');const entries=await walk(dist);
    const digests=await Promise.all(entries.filter(f=>!f.endsWith('publication.json')).map(async f=>[path.relative(dist,f),hash(await fs.readFile(f))]));
    await writeJson('.generated/artifact.json',{schema:1,revision:revision(),digest:hash(stable(digests)),files:digests});return;
  }
  if(action==='attest') {
    if(process.env.GITHUB_ACTIONS!=='true'||!process.env.GITHUB_RUN_ID||process.env.GITHUB_REPOSITORY!=='zhangzhenxiang666/cli-fieldbook')throw new Error('发布证明只由受保护的官方部署任务生成。');
    const artifact=await readData('.generated/artifact.json') as {revision:string;files:[string,string][];digest:string};
    if(artifact.revision!==process.env.GITHUB_SHA)throw new Error('发布提交与构建提交不匹配。');
    for(const [file,digest] of artifact.files)if(hash(await fs.readFile(path.resolve('site/dist',file)))!==digest)throw new Error(`发布产物变化：${file}`);
    await writeJson('site/dist/generated/publication.json',{schema:1,revision:artifact.revision,artifactDigest:artifact.digest,approvalRecord:`https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,gate:'github-pages required maintainer reviewer'});return;
  }
  console.log('docs new-tool | new-version | import | check [--json] | review prepare [tool version] | build [--preview] | export tool version --format markdown');
}
main().catch(e=>{console.error(String(e));process.exitCode=/fetch|网络|timeout|HTTP/i.test(String(e))?2:3;});
