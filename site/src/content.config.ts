import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';

export const collections = {
  docs: defineCollection({
    // Preserve version dots and the filename's index token. Starlight removes one
    // final index itself, so an actual `index` command keeps its own path segment.
    loader: docsLoader({ generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
    schema: docsSchema({ extend: z.object({ fieldbook: z.object({
      kind: z.string(), tool: z.string().optional(), version: z.string().optional(),
      revision: z.string().optional(), sourceCommit: z.string().optional(),
      repository: z.string().optional(), id: z.string().optional(),
      review: z.string().optional(), preview: z.boolean().optional()
    }) }) })
  }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() })
};
