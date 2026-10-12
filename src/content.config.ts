import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    roomType: z.enum(['living-room', 'bedroom', 'kids', 'office', 'full-home']),
    locationArea: z.string(),
    wallpaperType: z.string(),
    roomSize: z.string().optional(),
    budgetRange: z.string().optional(), // TODO-CONFIRM before publishing
    timeline: z.string().optional(),
    materials: z.array(z.string()).optional(),
    clientQuote: z.string().optional(),
    featured: z.boolean().default(false),
    bentoSize: z.enum(['sm', 'md', 'lg']).default('md'),
    beforeImage: z.string(),
    afterImage: z.string(),
    gallery: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
    publishedAt: z.coerce.date(),
  }),
});

const wallpapers = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/wallpapers' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'customised-printed',
      '3d',
      'waterproof',
      'kids-room',
      'textured',
      'murals',
      'living-room',
      'bedroom',
      'office',
    ]),
    startingPrice: z.string().nullable().default(null), // TODO-CONFIRM
    heroImage: z.string(),
    gallery: z.array(z.string()).default([]),
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .default([]),
    primaryKeyword: z.string(),
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string(),
    ogImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    primaryKeyword: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.{md,json,yaml,yml}', base: './src/content/testimonials' }),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    locationArea: z.string().optional(),
    source: z.enum(['google', 'placeholder']).default('placeholder'),
    sourceUrl: z.string().url().optional(),
    /** Only show real Google reviews with permission */
    verified: z.boolean().default(false),
    rating: z.number().min(1).max(5).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, wallpapers, blog, testimonials };
