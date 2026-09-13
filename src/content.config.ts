import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    client: z.string().default('Personal'),
    category: z.enum(['branding', 'logo', 'creative-direction', 'packaging']),
    summary: z.string(),
    cover: z.string(),
    gallery: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
    link: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(100)
  })
});

export const collections = { projects };
