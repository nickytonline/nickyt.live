import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(), // Ensures ISO date
    slug: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),
    draft: z.boolean().optional(),
    canonicalUrl: z.string().url().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
