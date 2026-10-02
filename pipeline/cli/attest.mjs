import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

const hash=data=>createHash('sha256').update(data).digest('hex');
const artifact=JSON.parse(await fs.readFile('.generated/artifact.json','utf8'));
if(artifact.revision!==process.env.TARGET_REVISION || process.env.GITHUB_REPOSITORY!=='zhangzhenxiang666/cli-fieldbook')throw new Error('Artifact revision/repository mismatch');
const root=path.resolve('site/dist');
async function files(dir){const result=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){if(e.isSymbolicLink())throw new Error('Symlink in artifact');const f=path.join(dir,e.name);if(e.isDirectory())result.push(...await files(f));else result.push(path.relative(root,f));}return result.sort();}
const actual=await files(root);
const expected=artifact.files.map(([f])=>f).sort();
if(JSON.stringify(actual)!==JSON.stringify(expected))throw new Error('Artifact file inventory changed');
for(const [relative,digest] of artifact.files){const f=path.resolve(root,relative);if(!f.startsWith(root+path.sep)||hash(await fs.readFile(f))!==digest)throw new Error(`Artifact digest mismatch: ${relative}`);}
await fs.writeFile(path.join(root,'generated/publication.json'),JSON.stringify({schema:1,revision:artifact.revision,artifactDigest:artifact.digest,approvalRecord:`https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,gate:'github-pages required maintainer reviewer'},null,2)+'\n');
