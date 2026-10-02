import { hash, stable, idOf } from './identity.js';
import type { Baseline, Page, ToolVersion } from './model.js';

export function baseline(version: ToolVersion, page: Page): Baseline {
  const dependencyIds = page.frontmatter.uses ?? [];
  const dependencies = dependencyIds.map(id => {
    const target = version.pages.find(p => idOf(p.kind, p.id) === id || (id.startsWith('command:') && p.kind === 'commands' && p.id === id.slice(8)));
    return target ? { id, body: hash(target.body), facts: { command: target.command ?? null, frontmatter: target.frontmatter } } : { id, missing: true };
  });
  // The complete locked source set is intentionally conservative in v1: a source
  // change requires review even when a parser cannot yet identify the exact claim.
  return { body: hash(page.body), facts: hash(stable({ command: page.command ?? null, frontmatter: page.frontmatter })), sources: hash(stable(version.sources)), dependencies: hash(stable(dependencies)) };
}
export function reviewState(version: ToolVersion, page: Page): 'translated' | 'needs-review' | 'prepared' {
  const previous = version.review?.pages[idOf(page.kind, page.id)];
  if (!previous) return 'translated';
  return stable(previous) === stable(baseline(version, page)) ? 'prepared' : 'needs-review';
}
