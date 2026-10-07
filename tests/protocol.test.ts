import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { loadCatalog } from '../pipeline/io/catalog.js';
import { write, writeJson, writeYaml, parseJson, parseYaml } from '../pipeline/io/files.js';
import { baseline, reviewState } from '../pipeline/core/review.js';
import { hash, idOf, route } from '../pipeline/core/identity.js';
import { sections, safeMarkdown, links } from '../pipeline/core/markdown.js';
import { generateSite } from '../pipeline/io/site.js';
import { importDirectory } from '../pipeline/io/import-directory.js';
import type { Command, SourceLock, ReviewLock } from '../pipeline/core/model.js';

async function fixture() {
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'fieldbook-test-'));
  await fs.cp('schemas',path.join(root,'schemas'),{recursive:true});
  const dir=path.join(root,'catalog/demo/versions/fictional-1');
  const commit='a'.repeat(40);
  const sources:SourceLock={schema:1,repository:'https://example.invalid/demo',upstreamVersion:'fictional-1',ref:'fixture',commit,adapter:'synthetic-fixture',normalization:1,profile:{id:'fixture',scope:'fictional test data'},evidence:[{id:'source',path:'upstream/source-extracts/fixture.txt',sha256:hash('fixture'),url:`https://example.invalid/${commit}/fixture`,method:'source-snapshot',obtainedAt:'2026-01-01T00:00:00Z'}],limitations:['This tool and version are fictional test fixtures.']};
  const common={aliases:[],synopsis:['demo'],arguments:[],options:[],category:'public',evidenceIds:['source'],profileId:'fixture'} as const;
  const commands:Command[]=[{...common,path:[],aliases:[],arguments:[],options:[],evidenceIds:['source'],synopsis:['demo'],children:[['index']]},{...common,path:['index'],aliases:[['ix']],arguments:[],options:[{name:'-q',display:'-q',aliases:[],evidenceIds:['source']}],evidenceIds:['source'],synopsis:['demo index [-q]'],children:[]}];
  await writeYaml(path.join(root,'catalog/demo/tool.yml'),{schema:1,name:'Fictional demo',binary:'demo',repository:'https://example.invalid/demo',summary:'虚构的演示工具，用于协议测试。'});
  await writeYaml(path.join(dir,'version.yml'),{schema:1,upstream:{version:'fictional-1',ref:'fixture'},publication:'draft'});
  await writeJson(path.join(dir,'upstream/commands.json'),commands);await writeJson(path.join(dir,'upstream/source.lock.json'),sources);await write(path.join(dir,'upstream/source-extracts/fixture.txt'),'fixture');
  await write(path.join(dir,'zh-CN/commands/index.md'),'---\ncommand: []\n---\n\n## 简介\n\nFictional root.\n');
  await write(path.join(dir,'zh-CN/commands/index/index.md'),'---\ncommand: [index]\n---\n\n## 简介\n\nFictional index command.\n\n## 选项\n\n### `-q`\n\nQuiet.\n');
  await write(path.join(dir,'zh-CN/workflows/example.md'),'---\ntitle: Example\nuses: ["command:index"]\n---\n\n[Command](cli:command:index)\n');
  return {root,dir,commands,sources,async close(){await fs.rm(root,{recursive:true,force:true});}};
}
test('duplicate JSON/YAML and executable Markdown are rejected',()=>{
  assert.throws(()=>parseJson('{"a":1,"a":2}'),/重复键/);
  assert.throws(()=>parseYaml('a: 1\na: 2'),/unique|same|重复/i);
  assert.equal(safeMarkdown('<script>alert(1)</script>\n\n[x](javascript:alert)','fixture.md').length,2);
  assert.equal(sections('## Real\n\n```sh\n## Fake\n```\n\n## Second',2).length,2);
});
test('root/index nodes, aliases and arbitrary tools work without a registry',async()=>{
  const f=await fixture();try{
    const catalog=await loadCatalog(f.root);assert.deepEqual(catalog.diagnostics,[]);assert.equal(catalog.versions.length,1);
    assert.equal(route('demo','fictional-1','commands/index/index.md'),'/cli-fieldbook/zh-cn/demo/fictional-1/commands/index/');
    await generateSite(catalog,false,f.root);assert.equal((await fs.readFile(path.join(f.root,'site/public/generated/manifest.json'),'utf8')).includes('fictional-1'),false);
    await generateSite(catalog,true,f.root);assert.equal((await fs.readFile(path.join(f.root,'.generated/site.json'),'utf8')).includes('Fictional demo'),true);
    f.commands[1]!.aliases=[[]];await writeJson(path.join(f.dir,'upstream/commands.json'),f.commands);assert((await loadCatalog(f.root)).diagnostics.some(d=>d.code==='alias_conflict'));
  }finally{await f.close();}
});
test('home cards render tool summary and missing summary fails the tool schema',async()=>{
  const f=await fixture();try{
    const catalog=await loadCatalog(f.root);
    await generateSite(catalog,true,f.root);
    const site=JSON.parse(await fs.readFile(path.join(f.root,'.generated/site.json'),'utf8'));
    assert.equal(site.versions[0]!.summary,'虚构的演示工具，用于协议测试。');
    const index=await fs.readFile(path.join(f.root,'site/src/content/docs/index.md'),'utf8');
    const heading=index.indexOf('### [Fictional demo]');const summary=index.indexOf('虚构的演示工具');const meta=index.indexOf('版本 fictional-1 · [3 篇内容]');
    assert.ok(heading>=0&&summary>heading&&meta>summary);
    await writeYaml(path.join(f.root,'catalog/demo/tool.yml'),{schema:1,name:'Fictional demo',binary:'demo',repository:'https://example.invalid/demo'});
    const broken=await loadCatalog(f.root);
    assert(broken.diagnostics.some(d=>d.code==='schema'&&d.severity==='error'&&d.message.includes('summary')));
    assert.equal(broken.versions.length,0);
  }finally{await f.close();}
});
test('body, facts, dependency and source changes invalidate prepared baselines',async()=>{
  const f=await fixture();try{
    const v=(await loadCatalog(f.root)).versions[0]!;
    const lock:ReviewLock={schema:1,status:'prepared',preparedBy:'fixture',method:'fixture',pages:Object.fromEntries(v.pages.map(p=>[idOf(p.kind,p.id),baseline(v,p)]))};v.review=lock;
    const workflow=v.pages.find(p=>p.kind==='workflows')!;const command=v.pages.find(p=>p.command?.path[0]==='index')!;
    assert.equal(reviewState(v,workflow),'prepared');command.body+='Changed prose.';assert.equal(reviewState(v,workflow),'needs-review');
    assert.equal(reviewState(v,command),'needs-review');command.body=command.body.replace('Changed prose.','');
    command.command!.options[0]!.default='false';assert.equal(reviewState(v,command),'needs-review');
    delete command.command!.options[0]!.default;v.sources.limitations.push('Source behavior changed without help changes.');assert.equal(reviewState(v,workflow),'needs-review');
    command.frontmatter.title='Changed title';assert.equal(reviewState(v,command),'needs-review');
    await writeJson(path.join(f.dir,'review.lock.json'),{...lock,status:'reviewed'});assert((await loadCatalog(f.root)).diagnostics.some(d=>d.code==='invalid_version'));
  }finally{await f.close();}
});
test('missing fields prevent publication, symlinks and cross-version links fail',async()=>{
  const f=await fixture();try{
    await write(path.join(f.dir,'zh-CN/commands/index/index.md'),'---\ncommand: [index]\n---\n\n## 简介\n\nIncomplete.\n');
    const draft=await loadCatalog(f.root);assert(draft.diagnostics.some(d=>d.code==='missing_field'&&d.severity==='warning'));
    await writeYaml(path.join(f.dir,'version.yml'),{schema:1,upstream:{version:'fictional-1',ref:'fixture'},publication:'published'});assert((await loadCatalog(f.root)).diagnostics.some(d=>d.code==='missing_field'&&d.severity==='error'));
    await write(path.join(f.dir,'zh-CN/workflows/example.md'),'---\ntitle: Escape\n---\n\n[x](../../../other.md)');assert((await loadCatalog(f.root)).diagnostics.some(d=>d.code==='link_escape'));
    await fs.symlink('/etc/hosts',path.join(f.dir,'upstream/secret.txt'));assert((await loadCatalog(f.root)).diagnostics.some(d=>d.code==='invalid_version'));
  }finally{await f.close();}
});
test('real migration retains all command groups and knowledge inventory',async()=>{
  const catalog=await loadCatalog();assert.deepEqual(catalog.diagnostics,[]);
  const jj=catalog.versions.find(v=>v.toolId==='jj')!;const herdr=catalog.versions.find(v=>v.toolId==='herdr')!;
  assert.equal(jj.commands.filter(c=>c.category==='public').length,122);assert.equal(jj.commands.length,153);assert.equal(herdr.commands.length,125);
  assert.equal(jj.pages.filter(p=>p.relative.startsWith('reference/revset/functions/')).length,55);
  assert.equal(jj.pages.filter(p=>p.relative.startsWith('reference/revset/aliases/')).length,8);
  assert.equal(jj.pages.filter(p=>p.relative.startsWith('workflows/revset-')).length,20);
  assert.equal(herdr.pages.filter(p=>p.kind==='workflows').length,24);
  assert.equal(jj.pages.filter(p=>p.relative==='concepts/languages.md').length,1);
  const index=jj.pages.find(p=>p.relative==='reference/revset/index.md')!;
  assert.equal(links(index.body).filter(l=>l.url.startsWith('functions/')).length,55);
  assert.equal(links(index.body).filter(l=>l.url.includes('legacy')).length,0);
});
test('protocol import is atomic, keeps previous versions and refuses overwrite',async()=>{
  const f=await fixture();const incoming=await fs.mkdtemp(path.join(os.tmpdir(),'fieldbook-incoming-'));
  try {
    await fs.cp(f.dir,incoming,{recursive:true});
    await writeYaml(path.join(incoming,'version.yml'),{schema:1,upstream:{version:'fictional-2',ref:'fixture-2'},publication:'draft'});
    await writeJson(path.join(incoming,'upstream/source.lock.json'),{...f.sources,upstreamVersion:'fictional-2',ref:'fixture-2'});
    const original=await fs.readFile(path.join(f.dir,'upstream/commands.json'),'utf8');
    await importDirectory('demo','fictional-2',incoming,f.root);
    assert.equal((await loadCatalog(f.root)).versions.length,2);
    assert.equal(await fs.readFile(path.join(f.dir,'upstream/commands.json'),'utf8'),original);
    await assert.rejects(importDirectory('demo','fictional-2',incoming,f.root),/不可覆盖/);
    await write(path.join(incoming,'zh-CN/concepts/unsafe.md'),'---\ntitle: Unsafe\n---\n\n<script>alert(1)</script>');
    await assert.rejects(importDirectory('demo','fictional-3',incoming,f.root),/unsafe_html/);
    assert.equal(await fs.stat(path.join(f.root,'catalog/demo/versions/fictional-3')).catch(()=>null),null);
  }finally{await f.close();await fs.rm(incoming,{recursive:true,force:true});}
});
