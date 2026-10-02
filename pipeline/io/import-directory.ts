import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { safeToken, within } from '../core/identity.js';
import { walk, readData, writeYaml } from './files.js';
import { loadCatalog } from './catalog.js';

/** Import only protocol data, validating a complete staged tree before installation. */
export async function importDirectory(tool:string,version:string,input:string,root=process.cwd()):Promise<void> {
  if(!safeToken(tool)||!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(version))throw new Error('非法工具／版本 ID。');
  const target=path.resolve(root,'catalog',tool,'versions',version);
  const toolFile=path.resolve(root,'catalog',tool,'tool.yml');
  const toolMeta=await readData(toolFile);
  const current=await fs.stat(target).catch(()=>null);
  if(current&&await fs.stat(path.join(target,'upstream')).catch(()=>null))throw new Error('已有来源的版本不可覆盖；创建新版本或提交显式来源更正。');
  const files=await walk(path.resolve(input));
  for(const file of files)if(!/\.(?:md|json|ya?ml|txt)$/.test(file))throw new Error(`协议目录仅允许文本数据：${file}`);
  const stage=await fs.mkdtemp(path.join(os.tmpdir(),'fieldbook-data-'));
  const staged=path.join(stage,'catalog',tool,'versions',version);
  try {
    await fs.cp(path.join(root,'schemas'),path.join(stage,'schemas'),{recursive:true});
    await writeYaml(path.join(stage,'catalog',tool,'tool.yml'),toolMeta);
    if(current){await walk(target);await fs.cp(target,staged,{recursive:true});}
    else await fs.mkdir(staged,{recursive:true});
    for(const file of files){
      const relative=path.relative(path.resolve(input),file);const output=path.resolve(staged,relative);
      if(!within(staged,output))throw new Error('导入路径越界。');
      const original=await fs.readFile(output).catch(()=>null);const incoming=await fs.readFile(file);
      if(original&&!original.equals(incoming))throw new Error(`与现有人工内容冲突：${relative}`);
      await fs.mkdir(path.dirname(output),{recursive:true});await fs.writeFile(output,incoming);
    }
    const declaration=await readData(path.join(staged,'version.yml')) as {publication:string;upstream:{version:string}};
    if(declaration.publication!=='draft')throw new Error('导入版本必须为 draft；发布申请单独审阅。');
    const catalog=await loadCatalog(stage);
    if(catalog.diagnostics.some(d=>d.severity==='error')||catalog.versions.length!==1)throw new Error(JSON.stringify(catalog.diagnostics));
    await fs.mkdir(path.dirname(target),{recursive:true});
    if(current){const backup=target+'.import-backup';if(await fs.stat(backup).catch(()=>null))throw new Error('已有导入备份，请先处理。');await fs.rename(target,backup);try{await fs.rename(staged,target);}catch(e){await fs.rename(backup,target);throw e;}await fs.rm(backup,{recursive:true});}
    else await fs.rename(staged,target);
    console.log(`协议导入完成：${tool}@${version}。`);
  } finally {await fs.rm(stage,{recursive:true,force:true});}
}
