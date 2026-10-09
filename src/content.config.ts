import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORY_VALUES } from './lib/categories';

const discipline = z.enum(CATEGORY_VALUES);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    client: z.string().default('Personal'),
    // Accepts a single value (older entries) or a list (new entries).
    category: z.union([discipline, z.array(discipline).min(1)])
      .transform(v => (Array.isArray(v) ? v : [v])),
    summary: z.string(),
    cover: z.string(),
    gallery: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
    link: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(100)
  })
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    heading: z.string(),
    lede: z.string(),
    panel_title: z.string().default(''),
    panel_items: z.array(z.string()).default([]),
    email: z.string().default(''),
    instagram: z.string().default(''),
    behance: z.string().default(''),
    linktree: z.string().default('')
  })
});

export const collections = { projects, pages };
