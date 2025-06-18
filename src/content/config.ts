import { defineCollection, z } from "astro:content";

const talksCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string().datetime(),
    video: z
      .object({
        url: z.string(),
        type: z.enum(["youtube", "vimeo", "custom"]),
        image: z
          .object({
            url: z.string(),
            width: z.number(),
            height: z.number(),
          })
          .optional(),
      })
      .optional(),
    venue: z.object({
      name: z.string(),
      url: z.string().optional(),
    }),
    tags: z.array(z.string()),
    slideDeck: z.string().optional(),
    sourceCode: z.string().optional(),
    additionalLinks: z
      .array(
        z.object({
          title: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
  }),
});

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string().datetime(),
    tags: z.array(z.string()),
    cover_image: z.string().nullable(),
    canonical_url: z.string(),
    reading_time_minutes: z.number(),
    template: z.string(),
  }),
});

export const collections = {
  talks: talksCollection,
  blog: blogCollection,
};
